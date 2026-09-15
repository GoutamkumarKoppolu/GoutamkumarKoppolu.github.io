import type { IconType } from "react-icons";
import {
  SiExpress,
  SiGraphql,
  SiJavascript,
  SiKibana,
  SiNodedotjs,
  SiNodered,
  SiPython,
  SiTypescript,
} from "react-icons/si";
import { TbApi, TbBrandAzure } from "react-icons/tb";

export type SkillItem = {
  name: string;
  icon: IconType;
  color: string;
  primary?: boolean;
};

export type SkillCategory = {
  id: string;
  label: string;
  items: SkillItem[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    items: [
      { name: "Python", icon: SiPython, color: "#3776AB", primary: true },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#000000" },
      { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
      { name: "REST", icon: TbApi, color: "#4f46e5" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & Tools",
    items: [
      { name: "Azure", icon: TbBrandAzure, color: "#0078D4" },
      { name: "Kibana", icon: SiKibana, color: "#005571" },
      { name: "Node-RED", icon: SiNodered, color: "#8F0000" },
    ],
  },
];
