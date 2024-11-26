import { Section, Container } from "@/components/commons/craft";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const FOKUS_AREAS = [
  {
    title: "Pendidikan",
    description:
      "Mengembangkan program pendidikan yang inovatif dan berkualitas",
  },
  {
    title: "Riset",
    description: "Mendorong budaya penelitian dan pengembangan ilmiah",
  },
  {
    title: "Teknologi",
    description: "Memanfaatkan teknologi untuk solusi inovatif",
  },
] as const;

export default function FokusArea() {
  return (
    <Section className="py-16">
      <Container>
        <Card className="bg-transparent">
          <CardHeader>
            <h2 className="text-2xl font-bold">Tentang Kami</h2>
          </CardHeader>
          <CardContent className="grid gap-6">
            <p className="text-muted-foreground">
              UKM PENRISTEK adalah organisasi kemahasiswaan yang menghimpun
              dan memberdayakan mahasiswa Universitas Terbuka dalam
              mengembangkan kompetensi di bidang pendidikan, riset, dan
              teknologi melalui kolaborasi, inovasi, dan pengabdian
              masyarakat.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {FOKUS_AREAS.map((area) => (
                <Card key={area.title}>
                  <CardContent className="pt-6">
                    <h3 className="font-bold mb-2">{area.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {area.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}