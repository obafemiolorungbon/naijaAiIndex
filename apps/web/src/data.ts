import type { Project } from "./types";
import rawProjects from "./generated/projects.json";

export const projects: Project[] = rawProjects as Project[];
