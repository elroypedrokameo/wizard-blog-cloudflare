export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

export interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'textarea' | 'select';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  required?: boolean;
  rows?: number;
}

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: Array<{ title: string }>;
}