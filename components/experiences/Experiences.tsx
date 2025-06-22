'use client';
import { education, experience } from "@/types/main";
import { useState } from "react";
import { ViewAll } from "../projects/Projects";
import SectionWrapper from "../SectionWrapper";
import InteractiveTimeline from "./InteractiveTimeline";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa"; // ✅ Import icons
// import ExperienceCard from "./ExperienceCard"; // Keep this if you still use it

interface Props {
  experienceData: experience[];
  educationData: education[];
}

const Experiences = ({ experienceData, educationData }: Props) => {
  const [show, setShow] = useState<"Work Experience" | "Education">("Work Experience");
  const [viewAll, setViewAll] = useState(false);

  const [experiences] = useState([...experienceData].reverse() as experience[]);
  const [educations] = useState([...educationData].reverse() as education[]);

  const timelineItems = show === "Work Experience"
    ? experiences.map(exp => ({
        id: exp.id || Math.random().toString(),
        year: exp.duration.split("-")[0]?.trim(),
        title: exp.position,
        description: Array.isArray(exp.desc) ? exp.desc.join("\n\n") : exp.desc,
        tech: exp.tech || [],
        icon: exp.icon || "",
      }))
    : educations.map(edu => ({
        year: edu.duration.split("-")[0]?.trim(),
        title: edu.degree,
        description: Array.isArray(edu.desc) ? edu.desc.join("\n\n") : edu.desc,
        tech: edu.tech || [],
        icon: edu.icon || "",
      }));

  return (
    <SectionWrapper id="experience" className="min-h-screen">
      <h2 className="text-4xl text-center">Experience</h2>

      <div className="w-fit mx-auto mt-6 p-2 bg-white dark:bg-grey-800 rounded-md flex gap-2 items-center">
        <button
          onClick={() => setShow("Work Experience")}
          className={`flex items-center gap-2 py-2 px-4 rounded-md transition-colors ${show === "Work Experience"
            ? "bg-violet-600 text-white"
            : "hover:bg-gray-100 hover:dark:bg-grey-900 text-black dark:text-white"
            }`}
        >
          Work Experience
        </button>
        <button
          onClick={() => setShow("Education")}
          className={`flex items-center gap-2 py-2 px-4 rounded-md transition-colors ${show === "Education"
            ? "bg-violet-600 text-white"
            : "hover:bg-gray-100 hover:dark:bg-grey-900 text-black dark:text-white"
            }`}
        >
          Education
        </button>
      </div>
      
        <InteractiveTimeline timelineItems={timelineItems} />

      <div className="lg:container sm:mx-4 lg:mx-auto lg:w-5/6 2xl:w-3/4">
        <div className="relative wrap overflow-hidden p-4 md:py-10 md:px-0">
          <div className="left-6 md:left-1/2 absolute border-opacity-20 border-gray-400 dark:border-grey-800 h-full border"></div>

          {viewAll
            ? (show === "Work Experience" ? experiences : educations).map((e, i) => (
                // @ts-ignore
                <ExperienceCard key={i} {...e} index={i} />
              ))
            : null}
        </div>
      </div>

      {(show === "Work Experience" ? experiences : educations).length > 2 && (
        <ViewAll
          scrollTo="experience"
          title={viewAll ? "Okay, I got it" : "View All"}
          handleClick={() => setViewAll(!viewAll)}
        />
      )}
    </SectionWrapper>
  );
};

export default Experiences;

