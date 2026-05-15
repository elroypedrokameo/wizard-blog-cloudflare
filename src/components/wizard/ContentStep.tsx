import { WizardStepProps } from '@/types/blog';
import { FormField, Button } from '@/components/ui';

export function ContentStep({ 
  formData, 
  onUpdate, 
  onNext, 
  onPrevious,
  errors, 
  isFirstStep, 
  isLastStep 
}: WizardStepProps) {
  const handleContentChange = (content: string) => {
    onUpdate({ content });
  };

  const canProceed = formData.content.trim().length >= 50;
  const wordCount = formData.content.trim() 
    ? formData.content.trim().split(/\s+/).filter(word => word.length > 0).length 
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Blog Content
        </h2>
        <p className="text-gray-600">
          Write the main content of your blog post. Make it engaging and informative!
        </p>
      </div>

      <FormField
        label="Blog Content"
        name="content"
        type="textarea"
        value={formData.content}
        onChange={handleContentChange}
        error={errors.content}
        placeholder="Write your blog post content here..."
        rows={12}
        required
      />

      <div className="text-sm text-gray-500">
        <div className="flex justify-between items-center">
          <span>Word count: {wordCount}</span>
          <span>Characters: {formData.content.length} (minimum 50)</span>
        </div>
      </div>

      <div className="flex justify-between pt-4 gap-3">
        <Button 
          onClick={onPrevious}
          variant="outline"
        >
          Previous Step
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!canProceed}
        >
          Review & Submit
        </Button>
      </div>
    </div>
  );
}