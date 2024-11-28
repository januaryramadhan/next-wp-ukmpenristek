import { Section, Container } from "@/components/commons/craft";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Section>
      <Container>
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-4">
          <FileQuestion className="w-16 h-16 text-muted-foreground" />
          <h1 className="text-3xl font-bold tracking-tight">
            Page Not Found
          </h1>
          <p className="text-muted-foreground max-w-[600px]">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link href="/">
              Return Home
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}