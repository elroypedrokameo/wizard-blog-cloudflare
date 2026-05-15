'use client';

import { useState } from 'react';
import { BlogFormData, WizardStep, FormErrors, BlogCategory } from '@/types/blog';
import { Card, StepIndicator } from '@/components/ui';
import { MetadataStep, SummaryStep, ContentStep, ReviewStep } from '@/components/wizard';
import { useBlogStorage } from '@/hooks/useBlogStorage';
import { validateBlogForm, hasValidationErrors } from '@/utils/validation';

const WIZARD_STEPS: WizardStep[] = [
  { id: 1, title: 'Metadata', component: MetadataStep },
  { id: 2, title: 'Summary', component: SummaryStep },
  { id: 3, title: 'Content', component: ContentStep },
  { id: 4, title: 'Review', component: ReviewStep }
];

const INITIAL_FORM_DATA: BlogFormData = {
  title: '',
  author: '',
  summary: '',
  category: '' as BlogCategory,
  content: ''
};

export function WizardContainer({ onSuccess }: { onSuccess?: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BlogFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { createBlogPost } = useBlogStorage();

  const updateFormData = (updates: Partial<BlogFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    // Clear errors for updated fields
    const updatedErrorKeys = Object.keys(updates);
    if (updatedErrorKeys.length > 0) {
      setErrors(prev => {
        const newErrors = { ...prev };
        updatedErrorKeys.forEach(key => {
          delete newErrors[key as keyof FormErrors];
        });
        return newErrors;
      });
    }
  };

  const validateCurrentStep = (): boolean => {
    const stepErrors = validateBlogForm(formData, currentStep);
    setErrors(stepErrors);
    return !hasValidationErrors(stepErrors);
  };

  const handleNextStep = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < WIZARD_STEPS.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Final step - submit the form
      await handleSubmit();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setErrors({}); // Clear errors when going back
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Validate all steps before final submission
      let allErrors: FormErrors = {};
      for (let step = 1; step <= 3; step++) {
        const stepErrors = validateBlogForm(formData, step);
        allErrors = { ...allErrors, ...stepErrors };
      }

      if (hasValidationErrors(allErrors)) {
        setErrors(allErrors);
        setIsSubmitting(false);
        return;
      }

      // Create the blog post
      const newPost = createBlogPost(formData);
      
      // Show success message and redirect
      alert('Blog post created successfully!');
      
      // Call the success callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Failed to create blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepConfig = WIZARD_STEPS.find(step => step.id === currentStep);
  const CurrentStepComponent = currentStepConfig?.component;

  if (!CurrentStepComponent) {
    return <div>Invalid step</div>;
  }

  const stepIndicatorSteps = WIZARD_STEPS.map(step => ({ title: step.title }));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Blog Post
          </h1>
          <p className="text-gray-600">
            Follow the steps below to create and publish your blog post.
          </p>
        </div>

        <Card className="mb-6">
          <StepIndicator 
            currentStep={currentStep}
            totalSteps={WIZARD_STEPS.length}
            steps={stepIndicatorSteps}
          />
        </Card>

        <Card>
          {isSubmitting ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Creating your blog post...</p>
            </div>
          ) : (
            <CurrentStepComponent
              formData={formData}
              onUpdate={updateFormData}
              onNext={handleNextStep}
              onPrevious={handlePreviousStep}
              errors={errors}
              isFirstStep={currentStep === 1}
              isLastStep={currentStep === WIZARD_STEPS.length}
            />
          )}
        </Card>
      </div>
    </div>
  );
}