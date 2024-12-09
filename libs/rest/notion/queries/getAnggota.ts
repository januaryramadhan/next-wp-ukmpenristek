import { notion } from "../../../config/notion/client";
import { NotionAnggota, FormattedAnggota } from "../../../types/notion/type";
import { cache } from 'react';

interface AnggotaResponse {
  data: FormattedAnggota[];
  error?: string;
}

// Menggunakan React cache untuk membantu dengan ISR
export const getAnggota = cache(async (): Promise<FormattedAnggota[]> => {
  try {
    if (!process.env.NOTION_ANGGOTA_DB) {
      throw new Error('NOTION_ANGGOTA_DB is not defined');
    }

    const response = await notion.databases.query({
      database_id: process.env.NOTION_ANGGOTA_DB,
      sorts: [
        {
          property: "Nama Anggota",
          direction: "ascending",
        },
      ],
    });

    const formattedData = response.results.map((page) => {
      const anggota = page as unknown as NotionAnggota;
      
      // Handle foto profil dengan null checking yang lebih baik
      const fotoProfilFile = anggota.properties["Foto Profil"]?.files[0];
      const fotoProfil = fotoProfilFile
        ? fotoProfilFile.type === "file"
          ? fotoProfilFile.file?.url
          : fotoProfilFile.external?.url
        : "";

      // Handle properties dengan null checking yang lebih baik
      const namaAnggotaTitle = anggota.properties["Nama Anggota"]?.title[0];
      const tanggalLahirData = anggota.properties["Tanggal Lahir"]?.date;
      const fakultasData = anggota.properties.Fakultas?.select;
      const prodiData = anggota.properties.Prodi?.select;
      const jenisAnggotaData = anggota.properties["Jenis Anggota"]?.select;
      const jenisKelaminData = anggota.properties["Jenis Kelamin"]?.select;
      const tanggalBergabungData = anggota.properties["Tanggal Bergabung"]?.date;

      return {
        id: anggota.id,
        namaAnggota: namaAnggotaTitle?.text.content || "Nama tidak tersedia",
        tanggalLahir: tanggalLahirData?.start || null,
        fakultas: fakultasData?.name || "Belum ditentukan",
        prodi: prodiData?.name || "Belum ditentukan",
        nim: anggota.properties.NIM?.number || null,
        telfon: anggota.properties.Telfon?.phone_number || "",
        jenisAnggota: jenisAnggotaData?.name || "Belum ditentukan",
        email: anggota.properties.Email?.email || "",
        tanggalBergabung: tanggalBergabungData?.start || null,
        jenisKelamin: jenisKelaminData?.name || "Belum ditentukan",
        fotoProfil: fotoProfil || "",
      };
    });

    // Filter invalid entries dan sort
    return formattedData
      .filter(data => data.namaAnggota !== "Nama tidak tersedia")
      .sort((a, b) => a.namaAnggota.localeCompare(b.namaAnggota));

  } catch (error) {
    console.error("Error fetching anggota:", error);
    throw error; // Re-throw untuk handling di level component
  }
});

// Fungsi wrapper dengan error handling
export async function getAnggotaWithErrorHandling(): Promise<AnggotaResponse> {
  try {
    const data = await getAnggota();
    return { data };
  } catch (error) {
    console.error("Error in getAnggotaWithErrorHandling:", error);
    return {
      data: [],
      error: "Failed to fetch anggota data",
    };
  }
}

// Utilitas untuk memvalidasi response
export function isValidAnggotaData(data: unknown): data is FormattedAnggota[] {
  return Array.isArray(data) && data.every(item => 
    typeof item === 'object' &&
    item !== null &&
    'id' in item &&
    'namaAnggota' in item &&
    'jenisAnggota' in item
  );
}

// Utilitas untuk filter berdasarkan jenis anggota
export function filterAnggotaByJenis(
  anggota: FormattedAnggota[], 
  jenis: string
): FormattedAnggota[] {
  return anggota.filter(item => item.jenisAnggota === jenis);
}

// Utilitas untuk filter berdasarkan fakultas
export function filterAnggotaByFakultas(
  anggota: FormattedAnggota[],
  fakultas: string
): FormattedAnggota[] {
  return anggota.filter(item => item.fakultas === fakultas);
}

// Utilitas untuk mendapatkan statistik anggota
export function getAnggotaStats(anggota: FormattedAnggota[]) {
  return {
    total: anggota.length,
    aktif: anggota.filter(item => item.jenisAnggota === "Anggota Aktif").length,
    umum: anggota.filter(item => item.jenisAnggota === "Anggota Umum").length,
    fakultasCount: anggota.reduce((acc, curr) => {
      acc[curr.fakultas] = (acc[curr.fakultas] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };
}

// Utilitas untuk format tanggal
export function formatTanggal(tanggal: string | null): string {
  if (!tanggal) return "-";
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(tanggal));
}