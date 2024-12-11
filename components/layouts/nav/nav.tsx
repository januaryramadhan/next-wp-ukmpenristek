import { cn } from "@/libs/utils";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import { mainMenu } from "@/menu.config";
import Logo from "@/public/logo.png";
import { ThemeToggle } from "../../theme/theme-toggle";

interface NavProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export const Nav = ({ className, children, id }: NavProps) => {
  return (
    <nav
      className={cn(
        "sticky z-50 top-0 bg-background",
        "border-b",
        "fade-in",
        className,
      )}
      id={id}
    >
      <div
        id="nav-container"
        className="max-w-5xl mx-auto py-4 px-6 sm:px-8 flex justify-between items-center"
      >
        <Link
          className="hover:opacity-75 transition-all flex gap-2 items-center font-bold"
          href="/"
        >
          <h2 className="sr-only">UKM PENRISTEK UT</h2>
          <Image
            src={Logo}
            alt="Logo"
            className=""
            width={15}
            height={15}
          ></Image>
          UKM PENRISTEK UT
        </Link>
        {children}
        <div className="flex items-center gap-2">
          <div className="mx-2 hidden md:flex">
            {Object.entries(mainMenu).map(([key, href]) => (
              <Button key={href} asChild variant="ghost" size="sm">
                <Link href={href}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              </Button>
            ))}
          </div>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};