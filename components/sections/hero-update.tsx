import { Section, Container } from "@/components/commons/craft";
import { Iphone15Pro } from "@/components/ui/iphone-15-pro";
import { Button } from "../ui/button";

export function HeroUpdate() {
  return (
    <Section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <Container>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Content Left */}
          <div className="space-y-8 text-center md:text-left order-2 md:order-1">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Selamat Menjalani UAS UT 2024.2
              </h1>
              
              <p className="text-lg text-muted-foreground">
                Semangat menghadapi Ujian Akhir Semester di Universitas Terbuka
              </p>
            </div>

            {/* Benefit List */}
            <ul className="space-y-3 text-base md:text-lg text-muted-foreground">
              <li className="flex items-center space-x-2 md:space-x-3 justify-center md:justify-start">
                <span className="text-primary">✓</span>
                <span>Persiapkan diri dengan baik</span>
              </li>
              <li className="flex items-center space-x-2 md:space-x-3 justify-center md:justify-start">
                <span className="text-primary">✓</span>
                <span>Jaga kesehatan fisik dan mental</span>
              </li>
              <li className="flex items-center space-x-2 md:space-x-3 justify-center md:justify-start">
                <span className="text-primary">✓</span>
                <span>Tetap fokus dan optimis</span>
              </li>
            </ul>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                asChild
                className="md:w-auto"
              >
                <a 
                  href="https://www.ut.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Info Selengkapnya
                </a>
              </Button>
            </div>
          </div>

          <div className="relative aspect-[9/16] md:aspect-square w-full max-w-[300px] mx-auto md:max-w-none order-1 md:order-2">
            <Iphone15Pro
              className="w-full h-full object-contain"
              src="https://bisque-duck-758265.hostingersite.com/wp-content/uploads/2024/12/WhatsApp-Image-2024-12-13-at-23.45.32.jpeg"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}