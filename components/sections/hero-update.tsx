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
                Sosialiasi & Rapat Umum UKM PENRSITEK 2024-2025
              </h1>
              
              <p className="text-lg text-muted-foreground">
                Kenal lebih dekat BPH dan Program Kerja UKM PENRISTEK
              </p>
            </div>

            {/* Benefit List */}
            <ul className="space-y-3 text-base md:text-lg text-muted-foreground">
              <li className="flex items-center space-x-2 md:space-x-3 justify-center md:justify-start">
                <span className="text-primary">✓</span>
                <span>Perkenalan Pengurus</span>
              </li>
              <li className="flex items-center space-x-2 md:space-x-3 justify-center md:justify-start">
                <span className="text-primary">✓</span>
                <span>Pemaparan Program Kerja</span>
              </li>
              <li className="flex items-center space-x-2 md:space-x-3 justify-center md:justify-start">
                <span className="text-primary">✓</span>
                <span>Rapat Umum</span>
              </li>
            </ul>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                asChild
                className="md:w-auto"
              >
                <a 
                  href="https://tally.so/r/wd2Bzz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link Presensi
                </a>
              </Button>
            </div>
          </div>

          <div className="relative aspect-[9/16] md:aspect-square w-full max-w-[300px] mx-auto md:max-w-none order-1 md:order-2">
            <Iphone15Pro
              className="w-full h-full object-contain"
              src="https://bisque-duck-758265.hostingersite.com/wp-content/uploads/2024/12/WhatsApp-Image-2024-12-19-at-18.47.11.jpeg"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}