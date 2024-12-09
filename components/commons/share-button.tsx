'use client';

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(url);
      // You might want to add a toast notification here
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
    >
      <Share2 className="h-4 w-4 mr-2" />
      Share
    </Button>
  );
}