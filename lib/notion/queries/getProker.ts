import { notion } from "../client";
import { NotionProker, FormattedProker } from "../type";

export async function getProker(): Promise<FormattedProker[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_PROKER_DB!,
      sorts: [
        {
          property: "Tanggal",
          direction: "ascending",
        },
      ],
    });

    return response.results.map((page) => {
      const proker = page as unknown as NotionProker;
      const dateString = proker.properties["Tanggal"].date.start;
      
      // Parse tanggal dan jam
      let tanggal = dateString; // Simpan dateString asli untuk keperluan sorting
      let displayTanggal = ""; // Untuk tampilan
      let jam = "upcoming";
      
      if (dateString) {
        const date = new Date(dateString);
        
        // Format tanggal ke "DD/MM/YYYY"
        displayTanggal = date.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });

        // Jika ada jam dalam dateString (format ISO)
        if (dateString.includes('T')) {
          // Format jam ke "HH:mm"
          jam = date.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          });
        }
      }

      return {
        id: proker.id,
        namaKegiatan: proker.properties["Nama Kegiatan"].title[0].text.content,
        tanggal: tanggal, // dateString asli untuk sorting
        displayTanggal: displayTanggal, // tanggal yang diformat untuk tampilan
        jam: jam,
        jenis: proker.properties["Jenis"].select.name,
        platform: proker.properties["Platform"].select.name,
      };
    });
  } catch (error) {
    console.error("Error fetching proker:", error);
    return [];
  }
}