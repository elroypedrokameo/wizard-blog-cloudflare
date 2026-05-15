import { CardProps } from '@/types/ui';

export function Card({ children, title, className = '' }: CardProps) {
  const baseClasses = 'bg-white shadow-md rounded-lg border border-gray-200';
  const cardClasses = `${baseClasses} ${className}`.trim();

  return (
    <div className={cardClasses}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
      )}
      <div className="p-8">
        {children}
      </div>
    </div>
  );
}