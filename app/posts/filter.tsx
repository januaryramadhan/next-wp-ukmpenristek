"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterPostsProps {
  authors: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  tags: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  selectedAuthor?: string;
  selectedTag?: string;
  selectedCategory?: string;
}

export default function FilterPosts({
  authors,
  tags,
  categories,
  selectedAuthor,
  selectedTag,
  selectedCategory,
}: FilterPostsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state with selected values or 'all'
  const [filters, setFilters] = useState({
    author: selectedAuthor || "all",
    tag: selectedTag || "all",
    category: selectedCategory || "all",
  });

  // Update state when props change
  useEffect(() => {
    setFilters({
      author: selectedAuthor || "all",
      tag: selectedTag || "all",
      category: selectedCategory || "all",
    });
  }, [selectedAuthor, selectedTag, selectedCategory]);

  const updateFilter = (type: string, value: string) => {
    // Update local state
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));

    // Update URL
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    if (value === "all") {
      current.delete(type);
    } else {
      current.set(type, value);
    }
    
    // Reset page when filter changes
    current.delete('page');
    
    const search = current.toString();
    const query = search ? `?${search}` : "";
    
    router.push(`/posts${query}`);
  };

  return (
    <div className="flex flex-wrap gap-4">
      <Select
        value={filters.author}
        onValueChange={(value) => updateFilter("author", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by Author">
            {filters.author === "all" ? "All Authors" : 
              authors.find(a => a.slug === filters.author)?.name || "All Authors"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Authors</SelectItem>
          {authors.map((author) => (
            <SelectItem key={author.id} value={author.slug}>
              {author.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.tag}
        onValueChange={(value) => updateFilter("tag", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by Tag">
            {filters.tag === "all" ? "All Tags" :
              tags.find(t => t.slug === filters.tag)?.name || "All Tags"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Tags</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag.id} value={tag.slug}>
              {tag.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.category}
        onValueChange={(value) => updateFilter("category", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by Category">
            {filters.category === "all" ? "All Categories" :
              categories.find(c => c.slug === filters.category)?.name || "All Categories"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.slug}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}