import { Suspense } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProkerWithRevalidate } from "@/libs/rest/notion/queries/getProker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FormattedProker } from "@/libs/types/notion/type";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calendar, Clock } from "lucide-react";

// Loading skeleton component
const TableSkeleton = () => (
  <div className="space-y-4">
    {Array(5).fill(null).map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    ))}
  </div>
);

// Error state component
const ErrorState = ({ error }: { error: string }) => (
  <div className="text-center p-4 text-red-500">
    <p>{error}</p>
  </div>
);

// Empty state component
const EmptyState = () => (
  <div className="text-center p-4 text-muted-foreground">
    <p>Tidak ada program kerja yang terjadwal</p>
  </div>
);

// Table content component
const TableContent = ({ proker }: { proker: FormattedProker[] }) => {
  const now = new Date();

  // Fungsi untuk mengecek status event
  const getEventStatus = (eventDate: Date, jam: string) => {
    const eventDateTime = new Date(eventDate);
    if (jam !== "upcoming") {
      const [hours, minutes] = jam.split(':').map(Number);
      eventDateTime.setHours(hours, minutes);
      // Tambah 2 jam untuk durasi default event
      const eventEndTime = new Date(eventDateTime.getTime() + (2 * 60 * 60 * 1000));
      
      if (now >= eventDateTime && now <= eventEndTime) {
        return "ongoing";
      }
    }
    return now > eventDateTime ? "past" : "upcoming";
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama Kegiatan</TableHead>
          <TableHead>Hari</TableHead>
          <TableHead>Tanggal</TableHead>
          <TableHead>Waktu</TableHead>
          <TableHead>Tempat</TableHead>
          <TableHead>Jenis</TableHead>
          <TableHead>Platform</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {proker.map((item) => {
          const date = new Date(item.tanggal);
          const day = new Intl.DateTimeFormat('id-ID', {
            weekday: 'long',
          }).format(date);

          const eventStatus = getEventStatus(date, item.jam);

          return (
            <TableRow 
              key={item.id}
              className={
                eventStatus === "ongoing" 
                  ? "bg-primary/5 animate-pulse" 
                  : eventStatus === "past" 
                  ? "opacity-50"
                  : ""
              }
            >
              <TableCell className="font-medium">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className={eventStatus === "past" ? "line-through" : ""}>
                        {item.namaKegiatan}
                      </span>
                      {eventStatus === "ongoing" && (
                        <Badge variant="secondary" className="ml-2 animate-pulse">
                          Sedang Berlangsung
                        </Badge>
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.jenis}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell className={eventStatus === "past" ? "line-through" : ""}>
                {day}
              </TableCell>
              <TableCell>
                <div className={`flex items-center gap-2 ${eventStatus === "past" ? "line-through" : ""}`}>
                  <Calendar className="h-4 w-4" />
                  {item.displayTanggal}
                </div>
              </TableCell>
              <TableCell>
                <div className={`flex items-center gap-2 ${eventStatus === "past" ? "line-through" : ""}`}>
                  <Clock className="h-4 w-4" />
                  {item.jam === "upcoming" ? (
                    <span className="text-muted-foreground text-sm">Upcoming</span>
                  ) : (
                    <span>{item.jam} WIB</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className={`text-sm ${eventStatus === "past" ? "line-through" : ""}`}>
                  {item.tempat}
                </span>
              </TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={eventStatus === "past" ? "opacity-50" : ""}
                >
                  {item.jenis}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={item.platform === "Online" ? "default" : "secondary"}
                  className={`cursor-pointer hover:opacity-80 ${eventStatus === "past" ? "opacity-50" : ""}`}
                >
                  {item.platform}
                </Badge>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

// Main component with async data fetching
async function TableProker() {
  try {
    const { data: proker, error } = await getProkerWithRevalidate();

    if (error) {
      return <ErrorState error={error} />;
    }

    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Kalender Kegiatan</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TableSkeleton />}>
            {proker.length > 0 ? (
              <TableContent proker={proker} />
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
          <CardTitle>Kalender Kegiatan</CardTitle>
        </CardHeader>
        <CardContent>
          <ErrorState error="Gagal memuat data program kerja" />
        </CardContent>
      </Card>
    );
  }
}

// Export with Suspense boundary
export default function TableProkerWrapper() {
  return (
    <Suspense fallback={
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Kalender Kegiatan</CardTitle>
        </CardHeader>
        <CardContent>
          <TableSkeleton />
        </CardContent>
      </Card>
    }>
      <TableProker />
    </Suspense>
  );
}