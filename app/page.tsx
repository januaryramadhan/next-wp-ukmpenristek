import { Section, Container } from "@/components/commons/craft";
import { ProgramKerjaScroll } from "@/components/sections/program-kerja-scroll";
import { Hero1 } from "@/components/sections/hero1";
import { Stats } from "@/components/sections/stats";
import FAQ from "@/components/sections/faq";
import VisiMisi from "@/components/sections/visi-misi";
import { StrukturOrganisasi } from "@/components/charts/strukturOrganisasi";
import { NewestPost } from "@/components/sections/newest-post";

export default async function Home() {
  return (
    <Section>
      <Container>
        <Hero1 />
        <NewestPost />
        <VisiMisi />
        <StrukturOrganisasi />
        <ProgramKerjaScroll />
        <Stats />
        <FAQ />
      </Container>
    </Section>
  );
}
