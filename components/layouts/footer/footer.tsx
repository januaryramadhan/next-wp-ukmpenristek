import Image from "next/image";
import Link from "next/link";
import { mainMenu, contentMenu } from "@/menu.config";
import { Section, Container } from "@/components/commons/craft";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import Balancer from "react-wrap-balancer";
import Logo from "@/public/logo.png";

export const Footer = () => {
  const description = "Unit Kegiatan Mahasiswa Pendidikan, Riset, dan Teknologi Universitas Terbuka";

  return (
    <footer className="bg-background border-t">
      <Section className="py-8 md:py-12">
        <Container>
          <div className="flex flex-col md:flex-row justify-between gap-8">
            {/* Logo and Description */}
            <div className="space-y-4 md:max-w-xs">
              <Link href="/" className="inline-block">
                <Image
                  src={Logo}
                  alt="Logo"
                  width={25}
                  height={23}
                  className="hover:opacity-75 transition-all"
                />
              </Link>
              <p className="text-sm text-muted-foreground">
                <Balancer>{description}</Balancer>
              </p>
            </div>

            {/* Menu Groups */}
            <div className="grid grid-cols-2 gap-8 sm:gap-12">
              {/* Website Menu */}
              <div className="space-y-4">
                <h5 className="font-medium text-base">Website</h5>
                <nav className="flex flex-col space-y-2">
                  {Object.entries(mainMenu).map(([key, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Blog Menu */}
              <div className="space-y-4">
                <h5 className="font-medium text-base">Blog</h5>
                <nav className="flex flex-col space-y-2">
                  {Object.entries(contentMenu).map(([key, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} UKM PENRISTEK UT. All rights reserved.
              </p>

              {/* Social Links & Theme Toggle */}
              <div className="flex items-center gap-4">
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </footer>
  );
};