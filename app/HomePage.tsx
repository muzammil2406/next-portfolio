"use client";

import React, { useState, useEffect } from 'react';
import Header from '../app/Header';
import Hero from '@/components/Hero';
import Socials from '@/components/Socials';
import About from '@/components/About';
import Skills from '../components/skills/Skills';
import Projects from '../components/projects/Projects';
import Experiences from '../components/experiences/Experiences';
import Contact from '@/components/Contact';
import Footer from '../app/Footer';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../firebase';
import type { data as DataType } from '../types/main'; // Update path if types are in another file

const HomePage = () => {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase(app);
        const dataRef = ref(db, '/');
        const snapshot = await get(dataRef);
        if (snapshot.exists()) {
          setData(snapshot.val());
        } else {
          console.warn("No data found in Firebase.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  if (!data?.main) {  // Safe access with optional chaining
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-4">
          <h2 className="text-xl font-semibold mb-2">Data Error</h2>
          <p>Could not load portfolio data. Please check your Firebase configuration.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header logo={data.main.name} />
      <Hero mainData={data.main} />
      <Socials socials={data.socials || []} />
      <About aboutData={data.about} name={data.main.name} />
      <Skills skillData={data.skills} /> {/* Ensure the prop matches the updated SkillProps */}
      <Projects projectsData={data.projects} />
      <Experiences
        experienceData={data.experiences}
        educationData={data.educations}
      />
      <Contact />
      <Footer socials={data.socials || []} name={data.main.name} />
    </>
  );
};

export default HomePage;
