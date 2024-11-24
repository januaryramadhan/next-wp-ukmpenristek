import { Section, Container } from "@/components/commons/craft";

export default function VisiMisi() {
  return (
    <Section>
      <Container>
        <div id="visi-misi" className="space-y-16">

          {/* Visi */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold tracking-tight">Visi</h3>
              <p className="text-muted-foreground">
                Gambaran ideal masa depan UKM PENRISTEK sebagai wadah pengembangan potensi mahasiswa yang unggul dan berdaya saing
              </p>
              <div className="h-1 w-20 bg-primary rounded-full"></div>
            </div>
            <figure className="my-8">
              <blockquote className="relative border-l-4 border-primary pl-4 italic text-xl md:text-2xl text-muted-foreground">
                <span className="text-4xl text-primary absolute -left-3 -top-4">"</span>
                Menjadi Unit Kegiatan Mahasiswa terunggul se-Indonesia pada tahun 2045 yang menghasilkan mahasiswa berkarakter kritis, intelektual, berketerampilan sosial, berdaya saing global, agar dapat mengamalkan pendidikan dan penelitian untuk diabdikan pada masyarakat.
                <span className="text-4xl text-primary absolute -right-3 bottom-0">"</span>
              </blockquote>
            </figure>
          </div>

          {/* Misi */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold tracking-tight">Misi</h3>
              <p className="text-muted-foreground">
                Rangkaian program dan inisiatif strategis yang kami lakukan untuk mewujudkan visi organisasi secara berkelanjutan
              </p>
              <div className="h-1 w-20 bg-primary rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {misiItems.map((item, index) => (
                <div 
                  key={index} 
                  className="flex gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <span className="font-bold text-xl text-primary">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <p className="text-muted-foreground leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

const misiItems = [
  "Menciptakan lingkungan organisasi yang positif dan kondusif untuk mendorong kreativitas, inovasi, dan pengembangan diri mahasiswa",
  "Mengoptimalkan pemanfaatan teknologi informasi dan komunikasi dalam proses manajemen organisasi",
  "Menyelenggarakan kegiatan yang dapat mengembangkan kompetensi dan keahlian anggota melalui program pemberdayaan anggota",
  "Mengembangkan program pengabdian kepada masyarakat yang efektif dan relevan sesuai kebutuhan masyarakat",
  "Melaksanakan penelitian dan pengembangan ilmu pengetahuan serta teknologi yang inovatif dan bermanfaat bagi masyarakat",
  "Meningkatkan daya saing global mahasiswa melalui program perlombaan dan partisipasi dalam kompetisi skala lokal, regional, atau internasional",
  "Membangun kerja sama dengan berbagai pihak, baik skala lokal, regional, nasional, maupun internasional",
];
