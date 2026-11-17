"use client";

import { useEffect, useState } from "react";

/** A blog article as listed on a blog section. */
export interface BlogPost {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
  authorName: string;
  authorAvatar: string;
  date: string;
  /** When set, the card links to `/blog/<slug>`. */
  slug?: string;
  onBlogClick?: () => void;
}

/** Sample posts shown until the real list has loaded. */
const PLACEHOLDER_POSTS: BlogPost[] = [
  {
    id: "1",
    category: "Design",
    title: "UX review presentations",
    excerpt:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    imageSrc: "/images/shared/placeholder-1.webp",
    imageAlt: "Abstract design with purple and silver tones",
    authorName: "Olivia Rhye",
    authorAvatar: "/images/shared/placeholder-1.webp",
    date: "20 Jan 2025",
  },
  {
    id: "2",
    category: "Development",
    title: "Building scalable applications",
    excerpt:
      "Learn the best practices for building applications that can handle millions of users.",
    imageSrc: "/images/shared/placeholder-2.webp",
    imageAlt: "Development workspace",
    authorName: "John Smith",
    authorAvatar: "/images/shared/placeholder-2.webp",
    date: "18 Jan 2025",
  },
  {
    id: "3",
    category: "Marketing",
    title: "Content strategy essentials",
    excerpt: "Discover how to create a content strategy that drives engagement and conversions.",
    imageSrc: "/images/shared/placeholder-3.webp",
    imageAlt: "Marketing strategy board",
    authorName: "Sarah Johnson",
    authorAvatar: "/images/shared/placeholder-3.webp",
    date: "15 Jan 2025",
  },
  {
    id: "4",
    category: "Product",
    title: "Product management 101",
    excerpt: "Everything you need to know to become an effective product manager in 2025.",
    imageSrc: "/images/shared/placeholder-1.webp",
    imageAlt: "Product planning session",
    authorName: "Mike Davis",
    authorAvatar: "/images/shared/placeholder-1.webp",
    date: "12 Jan 2025",
  },
];

/** Loads the published posts. No blog backend is configured, so the list is empty. */
const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  console.warn("VITE_API_URL or VITE_PROJECT_ID not configured");
  return [];
};

/** Loads the blog posts once on mount. */
const useBlogPosts = () => {
  const [posts, setPosts] = useState(PLACEHOLDER_POSTS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const fetchedPosts = await fetchBlogPosts();
        if (isMounted) {
          setPosts(fetchedPosts);
        }
      } catch (error) {
        if (isMounted) {
          setError(error instanceof Error ? error : Error("Failed to fetch posts"));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    posts,
    isLoading,
    error,
  };
};

export { useBlogPosts };
