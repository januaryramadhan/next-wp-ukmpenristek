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
      return {
        id: proker.id,
        namaKegiatan: proker.properties["Nama Kegiatan"].title[0].text.content,
        tanggal: proker.properties["Tanggal"].date.start,
        jenis: proker.properties["Jenis"].select.name,
        platform: proker.properties["Platform"].select.name,
      };
    });
  } catch (error) {
    console.error("Error fetching proker:", error);
    return [];
  }
}
