'use client';

import React from 'react';
import Header from '../app/Header';
import Hero from '@/components/Hero';
import Socials from '@/components/Socials';
import About from '@/components/About';
import Skills from '../components/skills/Skills';
import Projects from '../components/projects/Projects';
import Experiences from '../components/experiences/Experiences';
import Contact from '@/components/Contact';
import Footer from '../app/Footer';
import type { data as DataType } from '../types/main';

interface HomePageProps {
  data: DataType;
}

const HomePage = ({ data }: HomePageProps) => {
  return (
    <>
      <Header logo={data.main.name} />
      <Hero mainData={data.main} />
      <Socials socials={data.socials || []} />
      <About aboutData={data.about} name={data.main.name} />
      <Skills skillData={data.skills} />
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
