import { notion } from "../../../config/notion/client";
   import { cache } from 'react';

   // Interface for raw data from Notion
   interface NotionAbsen {
     id: string;
     properties: {
       "Nama Peserta": {
         title: [
           {
             text: {
               content: string;
             };
           },
         ];
       };
       "Tema": {
         rich_text: [
           {
             text: {
               content: string;
             };
           },
         ];
       };
       "Nama Kegiatan": {
         rich_text: [
           {
             text: {
               content: string;
             };
           },
         ];
       };
       "Tanggal": {
         date: {
           start: string;
         };
       };
       "ID Sertifikat": {
         unique_id: {
           prefix: string;
           number: number;
         };
       };
       "Jenis Sertifikat": {
         select: {
           name: string;
         };
       };
       "Status Kehadiran": {
         select: {
           name: "Hadir" | "Tidak Hadir" | "Pending";
         };
       };
       "Asal Organisasi": {
         select: {
           name: string;
         };
       };
       "Bukti Kehadiran": {
         files: Array<{
           file?: { url: string };
           external?: { url: string };
           name: string;
         }>;
       };
     };
   }

   // Interface for formatted data
   export interface FormattedAbsen {
     id: string;
     namaPeserta: string;
     namaKegiatan: string;
     tema: string;
     tanggal: string;
     idSertifikat: string;
     jenisSertifikat: string;
     statusKehadiran: string;
     asalOrganisasi: string;
     buktiKehadiran?: string;
   }

   // Helper function to parse unique ID
   export function parseNotionUniqueId(id: string) {
     const prefix = id.match(/[A-Z]+/)?.[0] || "";
     const number = parseInt(id.match(/\d+/)?.[0] || "0");
     return { prefix, number };
   }

   // Main function to fetch attendance data
   export const getAbsen = cache(async (): Promise<FormattedAbsen[]> => {
     try {
       if (!process.env.NOTION_ABSEN_DB) {
         throw new Error('NOTION_ABSEN_DB is not defined');
       }

       const response = await notion.databases.query({
         database_id: process.env.NOTION_ABSEN_DB,
         filter: {
           property: "Status Kehadiran",
           select: {
             equals: "Hadir"
           }
         },
         sorts: [
           {
             property: "Tanggal",
             direction: "descending",
           },
         ],
       });

       const formattedData = response.results.map((page) => {
         const absen = page as unknown as NotionAbsen;
         
         const idPrefix = absen.properties["ID Sertifikat"].unique_id.prefix;
         const idNumber = absen.properties["ID Sertifikat"].unique_id.number;
         const fullId = `${idPrefix}${idNumber.toString().padStart(4, '0')}`;

         const buktiFile = absen.properties["Bukti Kehadiran"].files[0];
         const buktiUrl = buktiFile 
           ? buktiFile.file 
             ? buktiFile.file.url 
             : buktiFile.external 
               ? buktiFile.external.url 
               : undefined
           : undefined;
         
         return {
           id: absen.id,
           namaPeserta: absen.properties["Nama Peserta"]?.title[0]?.text.content || "Nama tidak tersedia",
           namaKegiatan: absen.properties["Nama Kegiatan"]?.rich_text[0]?.text.content || "Kegiatan tidak tersedia",
           tema: absen.properties["Tema"]?.rich_text[0]?.text.content || "Tema tidak tersedia",
           tanggal: absen.properties["Tanggal"]?.date?.start || "",
           idSertifikat: fullId,
           jenisSertifikat: absen.properties["Jenis Sertifikat"]?.select?.name || "Tidak ada",
           statusKehadiran: absen.properties["Status Kehadiran"]?.select?.name || "Tidak ada",
           asalOrganisasi: absen.properties["Asal Organisasi"]?.select?.name || "Tidak ada",
           buktiKehadiran: buktiUrl,
         };
       });

       console.log("Formatted Data:", formattedData); // Tambahkan log ini

       return formattedData.filter(data => 
         data.namaPeserta !== "Nama tidak tersedia" && 
         data.statusKehadiran === "Hadir"
       );

     } catch (error) {
       console.error("Error fetching absen:", error);
       throw error;
     }
   });