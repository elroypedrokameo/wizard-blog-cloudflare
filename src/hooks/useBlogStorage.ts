import { useState, useEffect } from "react";
import { BlogPost, BlogFormData } from "@/types/blog";
import { generateId } from "@/utils/helpers";

// Type for blog post as stored in localStorage (with string dates)
type StoredBlogPost = Omit<BlogPost, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = "blog-posts";

export function useBlogStorage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = () => {
    try {
      const storedPosts = localStorage.getItem(STORAGE_KEY);

      if (storedPosts) {
        const parsedPosts = JSON.parse(storedPosts).map((post: StoredBlogPost) => ({
          ...post,
          createdAt: new Date(post.createdAt),
          updatedAt: new Date(post.updatedAt),
        }));
        setBlogPosts(parsedPosts);
      }
    } catch (error) {
      console.error("Error loading blog posts:", error);
      setBlogPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveBlogPosts = (posts: BlogPost[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      setBlogPosts(posts);
    } catch (error) {
      console.error("Error saving blog posts:", error);
      throw new Error("Failed to save blog posts");
    }
  };

  const createBlogPost = (formData: BlogFormData): BlogPost => {
    const now = new Date();
    const newPost: BlogPost = {
      id: generateId(),
      title: formData.title.trim(),
      author: formData.author.trim(),
      summary: formData.summary.trim(),
      category: formData.category.trim(),
      content: formData.content.trim(),
      createdAt: now,
      updatedAt: now,
    };

    const updatedPosts = [newPost, ...blogPosts];
    saveBlogPosts(updatedPosts);
    return newPost;
  };

  const getBlogPostById = (id: string): BlogPost | undefined => {
    return blogPosts.find((post) => post.id === id);
  };

  const updateBlogPost = (
    id: string,
    updates: Partial<BlogFormData>
  ): BlogPost | null => {
    const postIndex = blogPosts.findIndex((post) => post.id === id);
    if (postIndex === -1) return null;

    const updatedPost: BlogPost = {
      ...blogPosts[postIndex],
      ...updates,
      updatedAt: new Date(),
    };

    const updatedPosts = [...blogPosts];
    updatedPosts[postIndex] = updatedPost;
    saveBlogPosts(updatedPosts);
    return updatedPost;
  };

  const deleteBlogPost = (id: string): boolean => {
    const updatedPosts = blogPosts.filter((post) => post.id !== id);
    if (updatedPosts.length === blogPosts.length) return false;

    saveBlogPosts(updatedPosts);
    return true;
  };

  return {
    blogPosts,
    isLoading,
    createBlogPost,
    getBlogPostById,
    updateBlogPost,
    deleteBlogPost,
    refreshPosts: loadBlogPosts,
  };
}
