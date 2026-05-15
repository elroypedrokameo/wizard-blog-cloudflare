export interface BlogPost {
  id: string;
  title: string;
  author: string;
  summary: string;
  category: BlogCategory;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BlogCategory = 'Tech' | 'Lifestyle' | 'Business' | string;

export const PREDEFINED_CATEGORIES: string[] = ['Tech', 'Lifestyle', 'Business'];

export interface BlogFormData {
  title: string;
  author: string;
  summary: string;
  category: BlogCategory;
  content: string;
}

export interface WizardStep {
  id: number;
  title: string;
  component: React.ComponentType<WizardStepProps>;
}

export interface WizardStepProps {
  formData: BlogFormData;
  onUpdate: (data: Partial<BlogFormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  errors: FormErrors;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export interface FormErrors {
  title?: string;
  author?: string;
  summary?: string;
  category?: string;
  content?: string;
}