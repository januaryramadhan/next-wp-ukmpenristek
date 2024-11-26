import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { getAnggota } from "@/lib/notion/queries/getAnggota";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  
  export default async function TableAnggota() {
    const anggota = await getAnggota();
  
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Data Anggota</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Foto</TableHead>
                <TableHead>Nama Anggota</TableHead>
                <TableHead>Fakultas</TableHead>
                <TableHead>Program Studi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {anggota.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={item.fotoProfil} alt={item.namaAnggota} />
                      <AvatarFallback>
                        {item.namaAnggota.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{item.namaAnggota}</TableCell>
                  <TableCell>{item.fakultas}</TableCell>
                  <TableCell>{item.prodi}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }