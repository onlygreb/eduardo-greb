export type Experience = {
  title: string;
  startMonth: import("@/utils/Date").MonthName;
  startYear: number;
  endMonth?: import("@/utils/Date").MonthName;
  endYear?: number;
  company: string;
  location: string;
  activities: string[];
  tech: string[];
  relatedProject?: { name: string; url: string };
};

export type Project = { title: string; desc: string; url: string };
