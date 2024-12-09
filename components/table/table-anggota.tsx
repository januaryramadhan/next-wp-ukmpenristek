import { Suspense } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAnggota } from "@/libs/rest/notion/queries/getAnggota";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FormattedAnggota } from "@/libs/types/notion/type";

// Loading skeleton component
const TableSkeleton = () => (
  <div className="space-y-3">
    {Array(5).fill(null).map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    ))}
  </div>
);

// Error component
const ErrorState = ({ error }: { error: string }) => (
  <div className="text-center p-4 text-red-500">
    <p>{error}</p>
  </div>
);

// Table content component
const TableContent = ({ anggota }: { anggota: FormattedAnggota[] }) => (
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
);

// Empty state component
const EmptyState = () => (
  <div className="text-center p-4 text-muted-foreground">
    <p>Tidak ada data anggota yang tersedia</p>
  </div>
);

// Main component with async data fetching
async function TableAnggota() {
  try {
    const anggota = await getAnggota();

    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Data Anggota</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TableSkeleton />}>
            {anggota.length > 0 ? (
              <TableContent anggota={anggota} />
            ) : (
              <EmptyState />
            )}
          </Suspense>
        </CardContent>
      </Card>
    );
  } catch (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Data Anggota</CardTitle>
        </CardHeader>
        <CardContent>
          <ErrorState error="Gagal memuat data anggota" />
        </CardContent>
      </Card>
    );
  }
}

// Export with Suspense boundary
export default function TableAnggotaWrapper() {
  return (
    <Suspense fallback={
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Data Anggota</CardTitle>
        </CardHeader>
        <CardContent>
          <TableSkeleton />
        </CardContent>
      </Card>
    }>
      <TableAnggota />
    </Suspense>
  );
}