'use client';

import { Section, Container } from "@/components/commons/craft";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Section>
      <Container>
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-4">
          <AlertTriangle className="w-16 h-16 text-destructive" />
          <h1 className="text-3xl font-bold tracking-tight">
            Something went wrong!
          </h1>
          <p className="text-muted-foreground max-w-[600px]">
            {error.message || "An error occurred while processing your request"}
          </p>
          <Button onClick={reset} variant="default">
            Try again
          </Button>
        </div>
      </Container>
    </Section>
  );
}