import { BlogFormData, FormErrors } from '@/types/blog';

export function validateBlogForm(data: BlogFormData, step: number): FormErrors {
  const errors: FormErrors = {};

  switch (step) {
    case 1: // Metadata step
      if (!data.title.trim()) {
        errors.title = 'Blog title is required';
      } else if (data.title.trim().length < 3) {
        errors.title = 'Blog title must be at least 3 characters long';
      }
      
      if (!data.author.trim()) {
        errors.author = 'Author name is required';
      } else if (data.author.trim().length < 2) {
        errors.author = 'Author name must be at least 2 characters long';
      }
      break;

    case 2: // Summary & Category step
      if (!data.summary.trim()) {
        errors.summary = 'Blog summary is required';
      } else if (data.summary.trim().length < 10) {
        errors.summary = 'Blog summary must be at least 10 characters long';
      }
      
      if (!data.category) {
        errors.category = 'Please select or enter a category';
      } else if (data.category.trim().length < 2) {
        errors.category = 'Category must be at least 2 characters long';
      }
      break;

    case 3: // Content step
      if (!data.content.trim()) {
        errors.content = 'Blog content is required';
      } else if (data.content.trim().length < 50) {
        errors.content = 'Blog content must be at least 50 characters long';
      }
      break;
  }

  return errors;
}

export function hasValidationErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}