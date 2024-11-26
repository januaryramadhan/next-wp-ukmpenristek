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
  tanggalLahir: string;
  fakultas: string;
  prodi: string;
  nim: number;
  telfon: string;
  jenisAnggota: JenisAnggota;
  email: string;
  tanggalBergabung: string;
  jenisKelamin: JenisKelamin;
  fotoProfil: string;
}

// Interface untuk data Proker dari Notion
export interface NotionProker {
  id: string;
  properties: {
    "Nama Kegiatan": {
      title: [
        {
          text: {
            content: string;
          };
        },
      ];
    };
    Tanggal: {
      date: {
        start: string;
      };
    };
    Jenis: {
      select: {
        name: string;
      };
    };
    Platform: {
      select: {
        name: Platform;
      };
    };
  };
}

export interface FormattedAnggota {
  id: string;
  namaAnggota: string;
  tanggalLahir: string;
  fakultas: string;
  prodi: string;
  nim: number;
  telfon: string;
  jenisAnggota: JenisAnggota;
  email: string;
  tanggalBergabung: string;
  jenisKelamin: JenisKelamin;
  fotoProfil: string;
}


export interface FormattedProker {
  id: string;
  namaKegiatan: string;
  tanggal: string;
  jam: string | "upcoming";  // Tambahkan field jam
  jenis: string;
  platform: Platform;
}