export type JenisAnggota = "Anggota Aktif" | "Anggota Umum";
export type JenisKelamin = "Laki-Laki" | "Perempuan";
export type Platform = "Online" | "Offline";

// Interface untuk data Anggota dari Notion
export interface NotionAnggota {
  id: string;
  properties: {
    "Nama Anggota": {
      title: [
        {
          text: {
            content: string;
          };
        },
      ];
    };
    "Tanggal Lahir": {
      date: {
        start: string;
      };
    };
    Fakultas: {
      select: {
        name: string;
      };
    };
    Prodi: {
      select: {
        name: string;
      };
    };
    NIM: {
      number: number;
    };
    Telfon: {
      phone_number: string;
    };
    "Jenis Anggota": {
      select: {
        name: JenisAnggota;
      };
    };
    Email: {
      email: string;
    };
    "Tanggal Bergabung": {
      date: {
        start: string;
      };
    };
    "Jenis Kelamin": {
      select: {
        name: JenisKelamin;
      };
    };
    "Foto Profil": {
      files: [
        {
          type: "file" | "external";
          file?: {
            url: string;
          };
          external?: {
            url: string;
          };
        },
      ];
    };
  };
}

export interface FormattedAnggota {
  id: string;
  namaAnggota: string;
  tanggalLahir: string | null;
  fakultas: string;
  prodi: string;
  nim: number | null;
  telfon: string;
  jenisAnggota: string;
  email: string;
  tanggalBergabung: string | null;
  jenisKelamin: string;
  fotoProfil: string;
}

// Interface untuk data Proker dari Notion
export interface NotionProker {
  id: string;
  properties: {
    "Nama Kegiatan": {
      title: [{ text: { content: string } }];
    };
    "Tanggal": {
      date: { start: string };
    };
    "Jenis": {
      select: { name: string };
    };
    "Platform": {
      select: { name: string };
    };
    "Tempat": {  // Tambahkan ini
      rich_text: [{ text: { content: string } }];
    };
  };
}

export interface FormattedProker {
  id: string;
  namaKegiatan: string;
  tanggal: string;
  displayTanggal: string;
  jam: string;
  jenis: string;
  platform: string;
  iconName: string;
  tempat: string;  // Tambahkan ini
}

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
    "Tanggal": {
      date: {
        start: string;
      };
    };
    "ID Sertifikat": {
      rich_text: [
        {
          text: {
            content: string;
          };
        },
      ];
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
  };
}

export interface FormattedAbsen {
  id: string;
  namaPeserta: string;
  namaKegiatan: string; // Add this line
  tema: string;
  tanggal: string;
  idSertifikat: string;
  jenisSertifikat: string;
  statusKehadiran: string;
}

interface AbsenResponse {
  data: FormattedAbsen[];
  error?: string;
}

