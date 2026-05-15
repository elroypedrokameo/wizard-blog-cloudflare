'use client';

import { useState } from 'react';
import { BlogList, BlogDetail } from '@/components/blog';
import { WizardContainer } from '@/components/wizard/WizardContainer';

type AppView = 'blog-list' | 'blog-detail' | 'create-post';

export default function Home() {
  const [currentView, setCurrentView] = useState<AppView>('blog-list');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const handleViewPost = (postId: string) => {
    setSelectedPostId(postId);
    setCurrentView('blog-detail');
  };

  const handleCreatePost = () => {
    setCurrentView('create-post');
  };

  const handleBackToBlog = () => {
    setSelectedPostId(null);
    setCurrentView('blog-list');
  };

  switch (currentView) {
    case 'blog-detail':
      return (
        <BlogDetail
          postId={selectedPostId!}
          onBackToBlog={handleBackToBlog}
        />
      );

    case 'create-post':
      return <WizardContainer onSuccess={handleBackToBlog} />;

    default:
      return (
        <BlogList
          onViewPost={handleViewPost}
          onCreatePost={handleCreatePost}
        />
      );
  }
}
