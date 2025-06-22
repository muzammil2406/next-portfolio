'use client';

import { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  level: number; // 0-100
  color: string;
  icon?: string;
}

interface AnimatedSkillsProps {
  skills: Skill[]; // Accept an array of Skill objects as a prop
}

const AnimatedSkills = ({ skills }: AnimatedSkillsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-4">
      

        <div className="mt-16">
          <h3 className="text-xl font-semibold mb-6 text-center">Areas of Expertise</h3>

          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {[
              'Frontend Development',
              'Responsive Design',
              'UI/UX Design',
              'API Integration',
              'Database Design',
              'Performance Optimization',
              'State Management',
              'Deployment & CI/CD',
            ].map((area, index) => (
              <div
                key={area}
                className="px-4 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-700"
                style={{
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.8)',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: `${index * 100 + 300}ms`,
                }}
              >
                <span>{area}</span>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
};

export default AnimatedSkills;
