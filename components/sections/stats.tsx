import { ChartPieAnggota } from "../charts/anggota/chartPieAnggota";
import { ChartPieProgramKerja } from "../charts/proker/chartPieProgramKerja";
import { RadarChartAnggotaFakultas } from "../charts/anggota/radarChartAnggotaFakultas";
import { BarChartInteractive } from "../charts/proker/barChartInteractive";
import { Section, Container } from "@/components/commons/craft";
import { getAnggota } from "@/libs/rest/notion/queries/getAnggota";
import { getProker } from "@/libs/rest/notion/queries/getProker";
import { BarChartProkerJenis } from "../charts/proker/barChartProkerJenis";

export async function Stats() {
  // Fetch data anggota
  const anggota = await getAnggota();
  const proker = await getProker();

  return (
    <Section className="py-20">
      <Container>
        <div className="mb-6">
          <h3 className="text-2xl md:text-3xl font-semibold text-center">
            Data & Statistik
          </h3>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
            Informasi statistik yang memberikan wawasan tentang Anggota,
            Pengurus, dan Program Kerja UKM.
          </p>
        </div>
        <div className="mb-6"></div>
        <BarChartInteractive proker={proker} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
          <ChartPieAnggota anggota={anggota} />
          <RadarChartAnggotaFakultas anggota={anggota} />
          <ChartPieProgramKerja proker={proker} />
          <BarChartProkerJenis proker={proker} />
        </div>
      </Container>
    </Section>
  );
}
