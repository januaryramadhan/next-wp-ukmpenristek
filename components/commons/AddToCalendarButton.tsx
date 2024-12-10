"use client";

import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react"; // Import a simple calendar icon

interface AddToCalendarButtonProps {
  post: {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    slug: string;
  };
}

function generateGoogleCalendarLink(post, baseUrl: string) {
  const startDate = new Date(post.date).toISOString().replace(/-|:|\.\d+/g, '');
  const endDate = new Date(new Date(post.date).getTime() + 60 * 60 * 1000).toISOString().replace(/-|:|\.\d+/g, ''); // 1 hour event

  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(post.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(post.excerpt.replace(/<[^>]+>/g, ''))}&location=${encodeURIComponent(baseUrl + '/posts/' + post.slug)}&trp=false&sprop=&sprop=name:`;

  return googleCalendarUrl;
}

export function AddToCalendarButton({ post }: AddToCalendarButtonProps) {
  const handleAddToCalendar = () => {
    const baseUrl = window.location.origin;
    const googleCalendarLink = generateGoogleCalendarLink(post, baseUrl);
    window.open(googleCalendarLink, '_blank');
  };

  return (
    <Button variant="outline" onClick={handleAddToCalendar} className="flex items-center gap-2">
      <CalendarIcon className="h-4 w-4" />
      <span>Google Calendar</span>
    </Button>
  );
}