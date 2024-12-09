import { notion } from "../../../config/notion/client";
import { NotionProker, FormattedProker } from "../../../types/notion/type";
import { cache } from 'react';

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

interface ProkerResponse {
  data: FormattedProker[];
  error?: string;
}

// Menggunakan React cache untuk membantu dengan ISR
export const getProker = cache(async (): Promise<FormattedProker[]> => {
  try {
    if (!process.env.NOTION_PROKER_DB) {
      throw new Error('NOTION_PROKER_DB is not defined');
    }

    const response = await notion.databases.query({
      database_id: process.env.NOTION_PROKER_DB,
      sorts: [
        {
          property: "Tanggal",
          direction: "ascending",
        },
      ],
    });

    const formattedData = response.results.map((page) => {
      const proker = page as unknown as NotionProker;
      const dateString = proker.properties["Tanggal"].date.start;
      
      // Parse tanggal dan jam
      let tanggal = dateString; // Simpan dateString asli untuk keperluan sorting
      let displayTanggal = ""; // Untuk tampilan
      let jam = "upcoming";
      
      if (dateString) {
        const date = new Date(dateString);
        
        // Format tanggal ke "DD/MM/YYYY"
        displayTanggal = new Intl.DateTimeFormat('id-ID', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }).format(date);

        // Jika ada jam dalam dateString (format ISO)
        if (dateString.includes('T')) {
          // Format jam ke "HH:mm"
          jam = new Intl.DateTimeFormat('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }).format(date);
        }
      }

      const jenis = proker.properties["Jenis"].select.name;
      const iconName = getIconNameForJenis(jenis);

      // Mengambil data tempat dari Notion dengan null checking
      const tempat = proker.properties["Tempat"]?.rich_text?.[0]?.text?.content ?? "Akan diumumkan";

      return {
        id: proker.id,
        namaKegiatan: proker.properties["Nama Kegiatan"].title[0].text.content,
        tanggal, // dateString asli untuk sorting
        displayTanggal, // tanggal yang diformat untuk tampilan
        jam,
        jenis,
        platform: proker.properties["Platform"].select.name,
        iconName, // Nama ikon untuk jenis kegiatan
        tempat,
      };
    });

    return formattedData;

  } catch (error) {
    console.error("Error fetching proker:", error);
    throw error; // Re-throw error untuk handling di level component
  }
});

// Fungsi wrapper untuk fetch data dengan error handling
export async function getProkerWithRevalidate(): Promise<ProkerResponse> {
  try {
    const data = await getProker();
    return { data };
  } catch (error) {
    console.error("Error in getProkerWithRevalidate:", error);
    return {
      data: [],
      error: "Failed to fetch program kerja data",
    };
  }
}

// Utilitas untuk memvalidasi response
export function isValidProkerData(data: unknown): data is FormattedProker[] {
  return Array.isArray(data) && data.every(item => 
    typeof item === 'object' &&
    item !== null &&
    'id' in item &&
    'namaKegiatan' in item &&
    'tanggal' in item &&
    'platform' in item
  );
}

// Utilitas untuk sorting proker
export function sortProkerByDate(proker: FormattedProker[]): FormattedProker[] {
  return [...proker].sort((a, b) => {
    const dateA = new Date(a.tanggal);
    const dateB = new Date(b.tanggal);
    return dateA.getTime() - dateB.getTime();
  });
}

// Utilitas untuk filter proker yang aktif
export function filterActiveProker(proker: FormattedProker[]): FormattedProker[] {
  const now = new Date();
  return proker.filter(item => {
    const eventDate = new Date(item.tanggal);
    if (item.jam !== "upcoming") {
      const [hours, minutes] = item.jam.split(':').map(Number);
      eventDate.setHours(hours, minutes);
      // Tambah 2 jam untuk durasi default
      const eventEndTime = new Date(eventDate.getTime() + (2 * 60 * 60 * 1000));
      return now <= eventEndTime;
    }
    eventDate.setHours(23, 59, 59);
    return now <= eventDate;
  });
}