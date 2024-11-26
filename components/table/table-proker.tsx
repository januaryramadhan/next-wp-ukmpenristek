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
import { Badge } from "@/components/ui/badge"; // Import Badge jika diperlukan

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
              <TableHead>Hari</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Waktu</TableHead>
              <TableHead>Jenis</TableHead>
              <TableHead>Platform</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proker.map((item) => {
              const date = new Date(item.tanggal);
              const formattedDate = date.toLocaleDateString('id-ID', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              });
              const day = date.toLocaleDateString('id-ID', {
                weekday: 'long',
              });

              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.namaKegiatan}</TableCell>
                  <TableCell>{day}</TableCell>
                  <TableCell>{formattedDate}</TableCell>
                  <TableCell>
                    {item.jam === "upcoming" ? (
                      <span className="text-muted-foreground text-sm">Upcoming</span>
                    ) : (
                      <span>{item.jam} WIB s/d selesai</span>
                    )}
                  </TableCell>
                  <TableCell>{item.jenis}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={item.platform === "Online" ? "default" : "secondary"}
                    >
                      {item.platform}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}