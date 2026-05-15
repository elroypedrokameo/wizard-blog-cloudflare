'use client';

import { useBlogStorage } from '@/hooks/useBlogStorage';
import { BlogPost, PREDEFINED_CATEGORIES } from '@/types/blog';
import { Card, Button } from '@/components/ui';
import { formatDate } from '@/utils/helpers';

interface BlogDetailProps {
  postId: string;
  onBackToBlog: () => void;
}

interface PostNotFoundProps {
  onBackToBlog: () => void;
}

function PostNotFound({ onBackToBlog }: PostNotFoundProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Blog Post Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The blog post you&apos;re looking for doesn&apos;t exist or may have been removed.
            </p>
            <Button onClick={onBackToBlog}>
              Back to Blog List
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

interface PostContentProps {
  post: BlogPost;
  onBackToBlog: () => void;
}

function PostContent({ post, onBackToBlog }: PostContentProps) {
  const isCustomCategory = !PREDEFINED_CATEGORIES.includes(post.category);
  const categoryStyle = isCustomCategory 
    ? 'bg-purple-100 text-purple-800' 
    : 'bg-blue-100 text-blue-800';

  const formatContentWithParagraphs = (content: string) => {
    return content.split('\n').filter(paragraph => paragraph.trim()).map((paragraph, index) => (
      <p key={index} className="mb-4 leading-relaxed">
        {paragraph.trim()}
      </p>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button 
            onClick={onBackToBlog}
            variant="outline"
            size="small"
          >
            ← Back to Blog List
          </Button>
        </div>

        <article>
          <Card className="mb-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="border-b border-gray-200 pb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    By {post.author}
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(post.createdAt)}
                  </div>
                  
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryStyle}`}>
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <h2 className="text-lg font-medium text-blue-900 mb-2">Summary</h2>
                <p className="text-blue-800 leading-relaxed">
                  {post.summary}
                </p>
              </div>

              {/* Content */}
              <div className="prose prose-gray max-w-none">
                <div className="text-gray-800 leading-relaxed">
                  {formatContentWithParagraphs(post.content)}
                </div>
              </div>
            </div>
          </Card>

          {/* Metadata Footer */}
          <Card>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex flex-col items-start md:flex-row md:items-center gap-2 md:gap-0 justify-between text-sm text-gray-600">
                <div>
                  <span className="font-medium text-black">Published:</span> {formatDate(post.createdAt)}
                </div>
                {post.updatedAt.getTime() !== post.createdAt.getTime() && (
                  <div>
                    <span className="font-medium">Updated:</span> {formatDate(post.updatedAt)}
                  </div>
                )}
                <div>
                  <span className="font-medium text-black">Words:</span> {post.content.trim().split(/\s+/).length}
                </div>
              </div>
            </div>
          </Card>
        </article>
      </div>
    </div>
  );
}

export function BlogDetail({ postId, onBackToBlog }: BlogDetailProps) {
  const { getBlogPostById, isLoading } = useBlogStorage();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  const post = getBlogPostById(postId);
  
  if (!post) {
    return <PostNotFound onBackToBlog={onBackToBlog} />;
  }

  return <PostContent post={post} onBackToBlog={onBackToBlog} />;
}