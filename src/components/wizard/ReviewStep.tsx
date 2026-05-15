import { WizardStepProps } from '@/types/blog';
import { Button } from '@/components/ui';

export function ReviewStep({ 
  formData, 
  onUpdate, 
  onNext, 
  onPrevious,
  errors, 
  isFirstStep, 
  isLastStep 
}: WizardStepProps) {
  const formatPreview = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Review & Submit
        </h2>
        <p className="text-gray-600">
          Please review your blog post details before submitting.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {formData.title}
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-medium">Author:</span> {formData.author}</p>
            <p><span className="font-medium">Category:</span> {formData.category || 'Not selected'}</p>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
          <p className="text-gray-700 text-sm leading-relaxed">
            {formData.summary}
          </p>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Content Preview</h4>
          <div className="text-gray-700 text-sm leading-relaxed bg-white p-4 rounded border">
            {formatPreview(formData.content)}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Full content: {formData.content.length} characters
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-800">
              Ready to publish? Once you submit, your blog post will be saved and added to the blog list.
              You can always go back to make changes if needed.
            </p>
          </div>
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
        >
          Submit Blog Post
        </Button>
      </div>
    </div>
  );
}