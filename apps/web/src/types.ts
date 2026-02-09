export interface TeamMember {
  name: string;
  role?: string;
  links?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export interface ProjectOrigin {
  nigerian: boolean;
  based_in?: string;
}

export interface ProjectDeployment {
  railway?: {
    template_url?: string;
    project_url?: string;
  };
}

export type Category =
  | "llm-apps"
  | "agents"
  | "developer-tools"
  | "infra"
  | "datasets"
  | "research"
  | "health"
  | "fintech"
  | "education"
  | "agriculture"
  | "climate"
  | "govtech"
  | "security"
  | "media";

export type ProjectStatus = "active" | "paused" | "archived";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  website?: string;
  demo?: string;
  repo?: string;
  docs?: string;
  logo?: string;
  categories: Category[];
  tags?: string[];
  team?: TeamMember[];
  origin: ProjectOrigin;
  status: ProjectStatus;
  year_started?: number;
  last_updated: string;
  deployment?: ProjectDeployment;
}

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "llm-apps", label: "LLM Apps" },
  { value: "agents", label: "Agents" },
  { value: "developer-tools", label: "Dev Tools" },
  { value: "infra", label: "Infra" },
  { value: "datasets", label: "Datasets" },
  { value: "research", label: "Research" },
  { value: "health", label: "Health" },
  { value: "fintech", label: "Fintech" },
  { value: "education", label: "Education" },
  { value: "agriculture", label: "Agriculture" },
  { value: "climate", label: "Climate" },
  { value: "govtech", label: "GovTech" },
  { value: "security", label: "Security" },
  { value: "media", label: "Media" },
];
