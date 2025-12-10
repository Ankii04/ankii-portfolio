import React from 'react';
import {
    SiReact,
    SiNextdotjs,
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiTailwindcss,
    SiRedux,
    SiReactrouter,
    SiC,
    SiCplusplus,
    SiPython,
    SiPhp,
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiMysql,
    SiGit,
    SiGithub,
    SiPostman,
    SiFigma
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import { VscCode } from 'react-icons/vsc';

export const TechIcons = {
    // Frontend Frameworks
    "React.js": ({ className, style }) => (
        <SiReact className={className} style={{ color: "#61DAFB", ...style }} />
    ),
    "Next.js": ({ className, style }) => (
        <SiNextdotjs className={className} style={{ color: "currentColor", ...style }} />
    ),

    // Frontend Languages
    "HTML5": ({ className, style }) => (
        <SiHtml5 className={className} style={{ color: "#E34F26", ...style }} />
    ),
    "CSS3": ({ className, style }) => (
        <SiCss3 className={className} style={{ color: "#1572B6", ...style }} />
    ),
    "JavaScript": ({ className, style }) => (
        <SiJavascript className={className} style={{ color: "#F7DF1E", ...style }} />
    ),
    "Tailwind CSS": ({ className, style }) => (
        <SiTailwindcss className={className} style={{ color: "#06B6D4", ...style }} />
    ),
    "Redux": ({ className, style }) => (
        <SiRedux className={className} style={{ color: "#764ABC", ...style }} />
    ),
    "React Router": ({ className, style }) => (
        <SiReactrouter className={className} style={{ color: "#CA4245", ...style }} />
    ),

    // Programming Languages
    "C": ({ className, style }) => (
        <SiC className={className} style={{ color: "#A8B9CC", ...style }} />
    ),
    "C++": ({ className, style }) => (
        <SiCplusplus className={className} style={{ color: "#00599C", ...style }} />
    ),
    "Java": ({ className, style }) => (
        <DiJava className={className} style={{ color: "#007396", ...style }} />
    ),
    "Python": ({ className, style }) => (
        <SiPython className={className} style={{ color: "#3776AB", ...style }} />
    ),
    "PHP": ({ className, style }) => (
        <SiPhp className={className} style={{ color: "#777BB4", ...style }} />
    ),

    // Backend & Frameworks
    "Node.js": ({ className, style }) => (
        <SiNodedotjs className={className} style={{ color: "#339933", ...style }} />
    ),
    "Express.js": ({ className, style }) => (
        <SiExpress className={className} style={{ color: "currentColor", ...style }} />
    ),

    // Database
    "MongoDB": ({ className, style }) => (
        <SiMongodb className={className} style={{ color: "#47A248", ...style }} />
    ),
    "MySQL": ({ className, style }) => (
        <SiMysql className={className} style={{ color: "#4479A1", ...style }} />
    ),

    // Tools
    "Git": ({ className, style }) => (
        <SiGit className={className} style={{ color: "#F05032", ...style }} />
    ),
    "GitHub": ({ className, style }) => (
        <SiGithub className={className} style={{ color: "currentColor", ...style }} />
    ),
    "VS Code": ({ className, style }) => (
        <VscCode className={className} style={{ color: "#007ACC", ...style }} />
    ),
    "Postman": ({ className, style }) => (
        <SiPostman className={className} style={{ color: "#FF6C37", ...style }} />
    ),
    "Figma": ({ className, style }) => (
        <SiFigma className={className} style={{ color: "#F24E1E", ...style }} />
    )
};
