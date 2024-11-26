import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { getProker } from "@/lib/notion/queries/getProker";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  
  export default async function TableProker() {
    const proker = await getProker();
  
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Kalender Kegiatan</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Kegiatan</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Platform</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proker.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.namaKegiatan}</TableCell>
                  <TableCell>{item.tanggal}</TableCell>
                  <TableCell>{item.jenis}</TableCell>
                  <TableCell>{item.platform}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }