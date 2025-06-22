import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import { skill } from "@/types/main";
import { useTheme } from "next-themes";

interface SkillProps extends skill {
  level?: number;
}

const Skill = ({ name, image, level = 80 }: SkillProps) => {
  const { theme } = useTheme();
  const [bgColor, setBgColor] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    new FastAverageColor()
      .getColorAsync(image)
      .then((color) => {
        const rgba = color.rgb.split(")");
        setBgColor(rgba[0] + ",0.07)");
      })
      .catch((e) => console.log(e));
  }, [image]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col justify-center items-center gap-2 w-28 md:w-32 group relative"
    >
      {/* Tooltip on hover */}
      {/* <div className="absolute -top-5 px-2 py-1 text-xs rounded bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity">
        {level}%
      </div> */}

      {/* Logo with dynamic bg color */}
      <div
        title={name}
        style={{ backgroundColor: bgColor }}
        className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-gray-100 dark:bg-grey-800 flex items-center justify-center"
      >
        <Image
          alt="skill"
          width={100}
          height={100}
          className={`h-12 w-12 md:h-14 md:w-14 object-contain ${
            theme === "dark" &&
            (name === "GitHub" || name === "Vercel" || name === "NextJS" || name === "ExpressJS"
              ? "invert"
              : "invert-0")
          }`}
          src={image}
        />
      </div>

      <p className="text-sm md:text-base text-center">{name}</p>

      {/* Progress bar */}
      <div className="w-full mt-1">
  <div className="relative h-2 bg-gray-300 dark:bg-gray-700 rounded-full">
    <div
      className="h-full bg-blue-500 rounded-full transition-all duration-1000"
      style={{ width: isVisible ? `${level}%` : "0%" }}
    ></div>
    <div
      className="absolute top-full mt-1 text-xs text-gray-700 dark:text-gray-300 transition-all duration-1000"
      style={{ left: isVisible ? `calc(${level}% - 12px)` : "0" }}
    >
      {level}%
    </div>
  </div>
</div>



    </div>
  );
};

export default Skill;
