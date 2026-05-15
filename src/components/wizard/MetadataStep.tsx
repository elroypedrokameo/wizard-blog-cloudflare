import { WizardStepProps } from '@/types/blog';
import { FormField, Button } from '@/components/ui';

export function MetadataStep({ 
  formData, 
  onUpdate, 
  onNext, 
  errors, 
  isFirstStep, 
  isLastStep 
}: WizardStepProps) {
  const handleTitleChange = (title: string) => {
    onUpdate({ title });
  };

  const handleAuthorChange = (author: string) => {
    onUpdate({ author });
  };

  const canProceed = formData.title.trim() && formData.author.trim();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Blog Metadata
        </h2>
        <p className="text-gray-600">
          Let&apos;s start with the basic information about your blog post.
        </p>
      </div>

      <FormField
        label="Blog Title"
        name="title"
        value={formData.title}
        onChange={handleTitleChange}
        error={errors.title}
        placeholder="Enter a compelling title for your blog post"
        required
      />

      <FormField
        label="Author Name"
        name="author"
        value={formData.author}
        onChange={handleAuthorChange}
        error={errors.author}
        placeholder="Enter the author's name"
        required
      />

      <div className="flex justify-end pt-4">
        <Button 
          onClick={onNext} 
          disabled={!canProceed}
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}