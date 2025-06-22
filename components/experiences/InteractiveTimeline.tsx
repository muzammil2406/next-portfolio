'use client';

import { useState, useEffect, useRef } from 'react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  tech?: string[];
  icon?: string;
  type?: string;
}

interface InteractiveTimelineProps {
  timelineItems: TimelineItem[];
}

const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({ timelineItems }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = timelineRef.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, []);

  // Function to render description with line breaks
  const renderDescription = (description: string) =>
    description.split('\n').map((line, index) => (
      <p key={index} className="text-gray-600 dark:text-gray-300 mb-3">
        {line}
      </p>
    ));

  return (
    <div
      ref={timelineRef}
      className={`py-12 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex flex-col md:flex-row gap-8 mx-auto max-w-6xl px-4">
        {/* Sidebar with Years */}
        <div className="md:w-1/4">
          <div className="sticky top-20 flex flex-row md:flex-col">
            {timelineItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`group flex items-center p-3 mb-2 rounded-lg transition-all ${
                  activeIndex === index
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span
                  className={`text-2xl mr-3 ${activeIndex === index ? 'scale-125' : 'group-hover:scale-110'} transition-transform`}
                >
                  {item.icon || '📌'}
                </span>
                <div className="text-left">
                  <p className="font-semibold">{item.year}</p>
                  <p className="text-sm opacity-70">{item.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="md:w-3/4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="relative overflow-hidden" style={{ minHeight: '250px' }}>
            {timelineItems.map((item, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full transition-all duration-500 ${
                  activeIndex === index
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-24 pointer-events-none'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                    {item.year}
                  </span>
                </div>

                <div className="mb-6">{renderDescription(item.description)}</div>

                {item.type === 'Experience' && item.tech && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Technologies:</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTimeline;

