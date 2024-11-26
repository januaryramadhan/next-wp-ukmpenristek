import { notion } from "../client";
import { NotionAnggota, FormattedAnggota } from "../type";

export async function getAnggota(): Promise<FormattedAnggota[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_ANGGOTA_DB!,
      sorts: [
        {
          property: "Nama Anggota",
          direction: "ascending",
        },
      ],
    });

    const formattedData = response.results.map((page) => {
      const anggota = page as unknown as NotionAnggota;
      const fotoProfilFile = anggota.properties["Foto Profil"].files[0];
      const fotoProfil = fotoProfilFile
        ? fotoProfilFile.type === "file"
          ? fotoProfilFile.file?.url
          : fotoProfilFile.external?.url
        : "";

      return {
        id: anggota.id,
        namaAnggota: anggota.properties["Nama Anggota"].title[0].text.content,
        tanggalLahir: anggota.properties["Tanggal Lahir"].date.start,
        fakultas: anggota.properties.Fakultas.select.name,
        prodi: anggota.properties.Prodi.select.name,
        nim: anggota.properties.NIM.number,
        telfon: anggota.properties.Telfon.phone_number,
        jenisAnggota: anggota.properties["Jenis Anggota"].select.name,
        email: anggota.properties.Email.email,
        tanggalBergabung: anggota.properties["Tanggal Bergabung"].date.start,
        jenisKelamin: anggota.properties["Jenis Kelamin"].select.name,
        fotoProfil: fotoProfil || "",
      };
    });

    return formattedData;
  } catch (error) {
    console.error("Error fetching anggota:", error);
    return [];
  }
}