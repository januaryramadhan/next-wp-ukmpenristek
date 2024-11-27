import { notion } from "../client";
import { NotionProker, FormattedProker } from "../type";

// Fungsi untuk mendapatkan nama ikon berdasarkan jenis kegiatan
function getIconNameForJenis(jenis: string): string {
  switch (jenis) {
    case "Pendataan Anggota":
      return "UserCheck";
    case "Orientasi Anggota Baru":
      return "UserPlus";
    case "Rapat":
      return "Calendar";
    case "Sharing Session":
      return "MessageCircle";
    case "Meetup":
      return "Users";
    case "Agenda Komunitas":
      return "ClipboardList";
    case "Seminar Nasional":
      return "Mic";
    case "Farewell":
      return "Smile";
    case "Workshop":
      return "PenTool";
    default:
      return "Pin"; // Default icon
  }
}

export async function getProker(): Promise<FormattedProker[]> {
  try {
    console.log("Fetching proker from Notion...");
    const response = await notion.databases.query({
      database_id: process.env.NOTION_PROKER_DB!,
      sorts: [
        {
          property: "Tanggal",
          direction: "ascending",
        },
      ],
    });

    console.log("Proker fetched successfully:", response);

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

      const jenis = proker.properties["Jenis"].select.name;
      const iconName = getIconNameForJenis(jenis);

      // Mengambil data tempat dari Notion
      // Jika tidak ada data tempat, gunakan "Akan diumumkan"
      const tempat = proker.properties["Tempat"].rich_text.length > 0
        ? proker.properties["Tempat"].rich_text[0].text.content
        : "Akan diumumkan";

      return {
        id: proker.id,
        namaKegiatan: proker.properties["Nama Kegiatan"].title[0].text.content,
        tanggal: tanggal, // dateString asli untuk sorting
        displayTanggal: displayTanggal, // tanggal yang diformat untuk tampilan
        jam: jam,
        jenis: jenis,
        platform: proker.properties["Platform"].select.name,
        iconName: iconName, // Nama ikon untuk jenis kegiatan
        tempat: tempat, // Data tempat dari Notion
      };
    });
  } catch (error) {
    console.error("Error fetching proker:", error);
    return [];
  }
}