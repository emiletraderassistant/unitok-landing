export type ProjectStatus = 'sold-out' | 'available' | 'early-access';

export interface ProjectMetric {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface ProjectCta {
  type: 'telegram' | 'link';
  label: string;
  href: string;
}

export interface Project {
  id: string;
  /** ID del proyecto en api.unitok.io, si existe. */
  apiId?: number;
  name: string;
  category: string;
  image: string;
  status: ProjectStatus;
  statusLabel: string;
  metrics?: ProjectMetric[];
  perks?: string[];
  cta: ProjectCta;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface LandingData {
  distributedAmount: string;
  projects: Project[];
  faqs: FaqItem[];
}
