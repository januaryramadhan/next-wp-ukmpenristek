interface Pengurus {
  "Jabatan": string;
  "Sub Jabatan": string;
  "Person": string;
  "Jenis Kelamin": "Laki-Laki" | "Perempuan";
  "Rollup": string;
}

export const dataPengurus: Pengurus[] = [
    {
        "Jabatan": "Dewan Pembina & Pengarah",
        "Sub Jabatan": "Dewan Pembina",
        "Person": "@January",
        "Jenis Kelamin": "Laki-Laki",
        "Rollup": ""
    },
    {
        "Jabatan": "Dewan Pembina & Pengarah",
        "Sub Jabatan": "Dewan Pengarah",
        "Person": "@Naufal Alhakim",
        "Jenis Kelamin": "Laki-Laki",
        "Rollup": ""
    },
    {
        "Jabatan": "Ketua",
        "Sub Jabatan": "Ketua",
        "Person": "@Dian Nurjanah ",
        "Jenis Kelamin": "Perempuan",
        "Rollup": "https://storage.tally.so/private/IMG-20240824-WA0045.jpg?id=BxyP7e&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkJ4eVA3ZSIsImZvcm1JZCI6IndhRGJFQiIsImlhdCI6MTczMDExMTMxMH0.AKEj5LzW6-7PVWsOztFnfMG3_8KgE4CzpfVFmP4pZtM&signature=95070dd258f148a343c11d1deab8332efd8a1964c7bf41a918d0f059c1073746"
    },
    {
        "Jabatan": "Wakil ketua",
        "Sub Jabatan": "Wakil Ketua",
        "Person": "@Syahril Gunawan",
        "Jenis Kelamin": "Laki-Laki",
        "Rollup": "https://storage.tally.so/private/20231202_190553.jpg?id=D7j4OR&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkQ3ajRPUiIsImZvcm1JZCI6IndhRGJFQiIsImlhdCI6MTczMDExMTMxMH0.qL2TxMcKfsJxPEuteLkKvu-bO0J8KhoYlbfWoHNKH9U&signature=4447fe2b341a90a08163c57d8b33d994e962fc7a490b23575b713ced2f208471"
    },
    {
        "Jabatan": "Sekretaris",
        "Sub Jabatan": "Sekjen",
        "Person": "@M. Sohibul Wafa",
        "Jenis Kelamin": "Laki-Laki",
        "Rollup": "https://storage.tally.so/private/IMG_20240921_232944_302.jpg?id=O72O27&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik83Mk8yNyIsImZvcm1JZCI6IndhRGJFQiIsImlhdCI6MTczMDExMTMxMH0.v93d0XlbhlrfN14ffZfpfaL7Z3P9H5Ngtk1Mf0GAHLo&signature=604618495d5fab65f27db583a9cd0a8364fdca49e40361143ba972b6c0d4907a"
    },
    {
        "Jabatan": "Sekretaris",
        "Sub Jabatan": "Wasekjen",
        "Person": "@Nisa Pujia",
        "Jenis Kelamin": "Perempuan",
        "Rollup": "https://storage.tally.so/private/IMG-20240930-WA0014.jpg?id=MEWWVk&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1FV1dWayIsImZvcm1JZCI6IndhRGJFQiIsImlhdCI6MTczMDExMTMxMX0.43bDVLWkmVlfdwD5Oy1p_H-wgl9Mw74qVAp5yjowhY4&signature=ac0caac4ab55857e56a35f684ecd57fe3da8612f0460f97947381fffd69bcf81"
    },
    {
        "Jabatan": "Bendahara",
        "Sub Jabatan": "Bendahara Umum",
        "Person": "@Erika Azahra Nasya",
        "Jenis Kelamin": "Perempuan",
        "Rollup": "https://storage.tally.so/private/DSC03383.JPG?id=O72pvY&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik83MnB2WSIsImZvcm1JZCI6IndhRGJFQiIsImlhdCI6MTczMDExMTMxMH0.bZmJD28tLIl1bFWmqs-eElkM3CCQHR-rN7ZPa8CVMFk&signature=747a3cf30bf67179c90415a74854287cc49d15edbb5dbb73e9eee5660f279e95"
    },
    {
        "Jabatan": "Bendahara",
        "Sub Jabatan": "Wakil Bendahara Umum",
        "Person": "@Jihan",
        "Jenis Kelamin": "Perempuan",
        "Rollup": ""
    },
    {
        "Jabatan": "Humas",
        "Sub Jabatan": "Humas Internal ",
        "Person": "@Halimatussyadiyah",
        "Jenis Kelamin": "Perempuan",
        "Rollup": "https://storage.tally.so/private/IMG_20240914_133904_778.webp?id=O76N4k&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik83Nk40ayIsImZvcm1JZCI6IndhRGJFQiIsImlhdCI6MTczMDExMTMxMX0.Bi6rDmXmOtl05mifjaWfwysNTPcAVWvorZ1EyC1kmKs&signature=49b5f63b74459eab556f0efa78d372f7c5661c80bb1c6e6ba321b4987f841084"
    },
    {
        "Jabatan": "Humas",
        "Sub Jabatan": "Humas Eksternal",
        "Person": "@Elsa Syarifah",
        "Jenis Kelamin": "Perempuan",
        "Rollup": "https://storage.tally.so/private/1659772649513.jpg?id=LPe1Nj&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkxQZTFOaiIsImZvcm1JZCI6IndhRGJFQiIsImlhdCI6MTczMDExMTMxMH0.uGoQsDwPlMpCm77qbqoZspGtnUzkbUsllxMJQkQx1-E&signature=0d20fe254ff8e4a6df32c160d4110e6a65e42701c5ac777c782673259f74dbd9"
    },
    {
        "Jabatan": "Humas",
        "Sub Jabatan": "Community Manager",
        "Person": "@Cantika Junifer ",
        "Jenis Kelamin": "Perempuan",
        "Rollup": "https://storage.tally.so/private/20240610_100516_919.jpg?id=vPlGjg&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InZQbEdqZyIsImZvcm1JZCI6IndhRGJFQiIsImlhdCI6MTczMDExMTMxMH0.Of5AMxEKNodIKLOjjodGBWCpaiBL1bWZXzNhhV6gP2w&signature=e6405ada7b4c10f37b88205c94fe144bd811168d0a3c6027889b6ff024132e45"
    },
    {
        "Jabatan": "PPRK",
        "Sub Jabatan": "Project Manager",
        "Person": "@Agustin Radian (gustiaarj) ",
        "Jenis Kelamin": "Perempuan",
        "Rollup": "https://storage.tally.so/private/IMG_20231122_145742.JPG?id=Z27pqz&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IloyN3BxeiIsImZvcm1JZCI6IndhRGJFQiIsImlhdCI6MTczMDExMTMxMH0.e_c6NjeNlz1u8reuX3aTIQAW4-RzFoKwUX687xsTrsE&signature=ec0f9a30b9d033b5ff53e8b4ea620f1c289e6213eebe652df97026dffcde38b5"
    },
    {
        "Jabatan": "PPRK",
        "Sub Jabatan": "PSDM",
        "Person": "@FADHLAN SHODIQIN",
        "Jenis Kelamin": "Laki-Laki",
        "Rollup": "https://storage.tally.so/private/1692365925691.jpg?id=Ex2zlN&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkV4MnpsTiIsImZvcm1JZCI6IndhRGJFQiIsImlhdCI6MTczMDExMTMxMH0.dCg0pj1ZMrGyo1KPkTzdzVpyWziNu4pnxVLhx5HleHo&signature=29eb013c99d61c557bb30c3a31ba2a05e51e2da0ab7d7a6c13d9d138e817f113"
    },
    {
        "Jabatan": "PPRK",
        "Sub Jabatan": "Riset",
        "Person": "@Muhamad Hapid",
        "Jenis Kelamin": "Laki-Laki",
        "Rollup": "https://storage.tally.so/private/WhatsApp-Image-2024-10-19-at-16.37.38_e8f38f0a.jpg?id=qRr2L8&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InFScjJMOCIsImZvcm1JZCI6IndhRGJFQiIsImlhdCI6MTczMDExMTMxMH0.9cjDElacmbpKhJOJneIRx5SAIdco8tcTZl6aa0Nltrg&signature=4e67d4f6668caf5ea1e79e43a47e0128818ac0369d83140d59ce8323b2a0cc55"
    },
    {
        "Jabatan": "PPRK",
        "Sub Jabatan": "Kajian",
        "Person": "@Hemi Anggraeni ",
        "Jenis Kelamin": "Perempuan",
        "Rollup": "https://storage.tally.so/private/IMG_0825.JPG?id=VzKGGE&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlZ6S0dHRSIsImZvcm1JZCI6IndhRGJFQiIsImlhdCI6MTczMDExMTMxMH0.K4INzG_mww4K5e2-z_najjVWy6_zszVrBwOElayd03w&signature=3dc13a8b10d240e25a4837c735fd6db1075101c7471f0f5af45224c0f69f90e5"
    },
    {
        "Jabatan": "Tim IT",
        "Sub Jabatan": "Web Developer",
        "Person": "@Siti Arwiyah",
        "Jenis Kelamin": "Perempuan",
        "Rollup": "https://storage.tally.so/private/IMG_1325.JPG?id=bWaPyZ&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJXYVB5WiIsImZvcm1JZCI6IndhRGJFQiIsImlhdCI6MTczMDExMTMxMX0.WiFghsGNluO4hIpjypVBqvQaPzMb_TuW3xX_w94mWTs&signature=46517db8e5d6c58fc0854eda31da27714f5529b135dd086668cb81d18f6e314a"
    },
    {
        "Jabatan": "Tim IT",
        "Sub Jabatan": "IT Support",
        "Person": "@Rizski Maulana",
        "Jenis Kelamin": "Laki-Laki",
        "Rollup": "https://prod-files-secure.s3.us-west-2.amazonaws.com/f11686be-a6a5-4075-afad-6315c3a67235/0ab53c66-546f-40d1-bf26-d438b8771511/WhatsApp_Image_2024-09-01_at_21.12.15_50519cf2.jpg"
    },
    {
        "Jabatan": "Tim Kreatif",
        "Sub Jabatan": "Graphic Designer",
        "Person": "@Sekar Dwiana",
        "Jenis Kelamin": "Perempuan",
        "Rollup": "https://storage.tally.so/private/IMG-20240915-WA0134.jpg?id=RDAG4J&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJEQUc0SiIsImZvcm1JZCI6IndhRGJFQiIsImlhdCI6MTczMDExMTMxMH0.IzxbRVj-zZVP9ODc6hN2sTiPb5wFqrkHFGi95U1OE28&signature=4a40831a0b459c3a1c3ad6cf353c90ae8d088ae42a2dc949285c79c521d18ce5"
    },
    {
        "Jabatan": "Tim Kreatif",
        "Sub Jabatan": "Graphic Designer",
        "Person": "@Putri Dewantari",
        "Jenis Kelamin": "Perempuan",
        "Rollup": "https://storage.tally.so/private/IMG_1974.jpeg?id=Y41jz5&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ilk0MWp6NSIsImZvcm1JZCI6IndhRGJFQiIsImlhdCI6MTczMDExMTMxMH0.U3kjPzsA3lCeKlFXTL1raVETaS_XysLbS2ahTH08WWQ&signature=53cd31e83329d53df1efe0470a37268ac3685d81402e8874dda720bf305984db"
    },
    {
        "Jabatan": "Tim Kreatif",
        "Sub Jabatan": "Content Creator",
        "Person": "@Riza Apriansah",
        "Jenis Kelamin": "Laki-Laki",
        "Rollup": "https://storage.tally.so/private/IMG_3014.JPG?id=7NyRX0&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdOeVJYMCIsImZvcm1JZCI6IndhRGJFQiIsImlhdCI6MTczMDExMTMxMH0.yEm1z7IECVaoZ56nduzj0vT392PkaTrD9wPACKtNTvo&signature=7e65b2016351f98ae53b3bf28623146c9289a52fd93e23d5f9b2f73e01060fdc"
    },
    {
        "Jabatan": "Tim Kreatif",
        "Sub Jabatan": "Content Strategist",
        "Person": "@Muhamad Aminudin",
        "Jenis Kelamin": "Laki-Laki",
        "Rollup": "https://storage.tally.so/private/IMG_6756.jpeg?id=xJAVQ5&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InhKQVZRNSIsImZvcm1JZCI6IndhRGJFQiIsImlhdCI6MTczMDExMTMxMH0.NU-29tQIKhcc03U4bR9xaSDT12C4annMAnhy_mSt3No&signature=0987645a1709d8c8401103db81b6682a7a554c79a358ae8bbd288047aee0d845"
    }
]
