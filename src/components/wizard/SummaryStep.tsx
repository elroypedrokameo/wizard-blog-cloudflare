import { useState, useRef, useEffect } from 'react';
import { WizardStepProps, PREDEFINED_CATEGORIES } from '@/types/blog';
import { FormField, Button } from '@/components/ui';

export function SummaryStep({ 
  formData, 
  onUpdate, 
  onNext, 
  onPrevious,
  errors, 
  isFirstStep, 
  isLastStep 
}: WizardStepProps) {
  const [categoryInput, setCategoryInput] = useState(formData.category);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSummaryChange = (summary: string) => {
    onUpdate({ summary });
  };

  const handleCategoryInputChange = (value: string) => {
    setCategoryInput(value);
    onUpdate({ category: value });

    // Filter categories based on input
    if (value.trim()) {
      const filtered = PREDEFINED_CATEGORIES.filter(category =>
        category.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCategories(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredCategories([]);
      setShowSuggestions(false);
    }
  };

  const handleCategorySelect = (category: string) => {
    setCategoryInput(category);
    onUpdate({ category });
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    if (categoryInput.trim()) {
      const filtered = PREDEFINED_CATEGORIES.filter(category =>
        category.toLowerCase().includes(categoryInput.toLowerCase())
      );
      setFilteredCategories(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      // Show all predefined categories when input is empty
      setFilteredCategories(PREDEFINED_CATEGORIES);
      setShowSuggestions(true);
    }
  };

  const canProceed = formData.summary.trim() && formData.category.trim();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Summary & Category
        </h2>
        <p className="text-gray-600">
          Provide a brief summary and categorize your blog post.
        </p>
      </div>

      <FormField
        label="Blog Summary"
        name="summary"
        type="textarea"
        value={formData.summary}
        onChange={handleSummaryChange}
        error={errors.summary}
        placeholder="Write a brief introduction or excerpt for your blog post"
        rows={3}
        required
      />

      <div className="relative">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Blog Category <span className="text-red-500">*</span>
        </label>
        <input
          ref={inputRef}
          type="text"
          id="category"
          name="category"
          value={categoryInput}
          onChange={(e) => handleCategoryInputChange(e.target.value)}
          onFocus={handleInputFocus}
          placeholder="Type a category or select from suggestions"
          className={`w-full px-3 py-2 border rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.category ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        
        {showSuggestions && filteredCategories.length > 0 && (
          <div 
            ref={suggestionsRef}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto"
          >
            {filteredCategories.map((category, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleCategorySelect(category)}
                className="w-full px-3 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none border-b border-gray-100 last:border-b-0 cursor-pointer"
              >
                <span className="text-gray-900">{category}</span>
                <span className="text-xs text-blue-600 ml-2">(suggested)</span>
              </button>
            ))}
          </div>
        )}
        
        {errors.category && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.category}
          </p>
        )}
        
        <p className="mt-1 text-xs text-gray-500">
          {PREDEFINED_CATEGORIES.includes(categoryInput.trim()) 
            ? `Using existing category: "${categoryInput.trim()}"` 
            : categoryInput.trim() 
              ? `Creating new category: "${categoryInput.trim()}"` 
              : 'Start typing to see suggestions or create a new category'
          }
        </p>
      </div>

      <div className="flex justify-between pt-4">
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
          Next Step
        </Button>
      </div>
    </div>
  );
}