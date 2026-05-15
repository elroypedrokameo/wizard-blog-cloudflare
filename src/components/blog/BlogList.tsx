'use client';

import { useBlogStorage } from '@/hooks/useBlogStorage';
import { BlogPost, PREDEFINED_CATEGORIES } from '@/types/blog';
import { Card, Button } from '@/components/ui';
import { formatDate } from '@/utils/helpers';

interface BlogCardProps {
  post: BlogPost;
  onViewDetails: (postId: string) => void;
}

function BlogCard({ post, onViewDetails }: BlogCardProps) {
  const isCustomCategory = !PREDEFINED_CATEGORIES.includes(post.category);
  const categoryStyle = isCustomCategory 
    ? 'bg-purple-100 text-purple-800' 
    : 'bg-blue-100 text-blue-800';

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
      <div className="space-y-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
              {post.title}
            </h3>
            <div className="flex items-center text-sm text-gray-600 space-x-4 mb-4">
              <span>By {post.author}</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryStyle}`}>
                {post.category}
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 flex-1">
          {post.summary}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <span className="text-xs text-gray-500">
            {formatDate(post.createdAt)}
          </span>
          <Button
            onClick={() => onViewDetails(post.id)}
            variant="outline"
            size="small"
            className="whitespace-nowrap"
          >
            Read More
          </Button>
        </div>
      </div>
    </Card>
  );
}

interface EmptyStateProps {
  onCreatePost: () => void;
}

function EmptyState({ onCreatePost }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No blog posts yet
        </h3>
        <p className="text-gray-600 mb-6">
          Get started by creating your first blog post. Share your thoughts and ideas with the world!
        </p>
        <Button onClick={onCreatePost}>
          Create Your First Post
        </Button>
      </div>
    </div>
  );
}

interface BlogListProps {
  onViewPost: (postId: string) => void;
  onCreatePost: () => void;
}

export function BlogList({ onViewPost, onCreatePost }: BlogListProps) {
  const { blogPosts, isLoading } = useBlogStorage();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-6 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Blog Posts
            </h1>
            <p className="text-gray-600">
              Discover and read amazing articles from our community of writers.
            </p>
          </div>
          {blogPosts.length > 0 && (
            <div className="flex-shrink-0">
              <Button onClick={onCreatePost}>
                Create New Post
              </Button>
            </div>
          )}
        </div>

        {blogPosts.length === 0 ? (
          <EmptyState onCreatePost={onCreatePost} />
        ) : (
          <>
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Showing {blogPosts.length} post{blogPosts.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {blogPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onViewDetails={onViewPost}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}