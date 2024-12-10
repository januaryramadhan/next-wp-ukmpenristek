export function generateICS(post, baseUrl: string) {
    const startDate = new Date(post.date).toISOString().replace(/-|:|\.\d+/g, '');
    const endDate = new Date(new Date(post.date).getTime() + 60 * 60 * 1000).toISOString().replace(/-|:|\.\d+/g, ''); // 1 hour event
  
    const icsContent = `
  BEGIN:VCALENDAR
  VERSION:2.0
  PRODID:-//Your Organization//NONSGML v1.0//EN
  BEGIN:VEVENT
  UID:${post.id}
  DTSTAMP:${startDate}
  DTSTART:${startDate}
  DTEND:${endDate}
  SUMMARY:${post.title}
  DESCRIPTION:${post.excerpt.replace(/<[^>]+>/g, '')}
  URL;VALUE=URI:${baseUrl}/posts/${post.slug}
  END:VEVENT
  END:VCALENDAR
    `.trim();
  
    return icsContent;
  }