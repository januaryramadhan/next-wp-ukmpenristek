import { Client, APIErrorCode, isNotionClientError } from "@notionhq/client";
import { NotionAnggota, FormattedAnggota } from "../type";

// Initialize the Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

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
      const fotoProfilFile = anggota.properties["Foto Profil"]?.files?.[0];
      const fotoProfil = fotoProfilFile
          ? fotoProfilFile.type === "file"
              ? fotoProfilFile.file?.url
              : fotoProfilFile.external?.url
          : "";

      return {
        id: anggota.id,
        namaAnggota: anggota.properties["Nama Anggota"]?.title?.[0]?.text?.content || "",
        tanggalLahir: anggota.properties["Tanggal Lahir"]?.date?.start || "",
        fakultas: anggota.properties.Fakultas?.select?.name || "",
        prodi: anggota.properties.Prodi?.select?.name || "",
        nim: anggota.properties.NIM?.number || "",
        telfon: anggota.properties.Telfon?.phone_number || "",
        jenisAnggota: anggota.properties["Jenis Anggota"]?.select?.name || "",
        email: anggota.properties.Email?.email || "",
        tanggalBergabung: anggota.properties["Tanggal Bergabung"]?.date?.start || "",
        jenisKelamin: anggota.properties["Jenis Kelamin"]?.select?.name || "",
        fotoProfil: fotoProfil || "",
      };
    });

    return formattedData;
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      switch (error.code) {
        case APIErrorCode.ObjectNotFound:
          console.error("Database not found. Please check the database ID.");
          break;
        case APIErrorCode.Unauthorized:
          console.error("Unauthorized access. Please check your Notion token.");
          break;
        case APIErrorCode.RequestTimeout:
          console.error("Request timed out. Please try again later.");
          break;
        default:
          console.error("An error occurred:", error.message);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
    return [];
  }
}