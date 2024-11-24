"use client";

import React, { useState } from "react";
import { Section, Container } from "@/components/commons/craft";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dataPengurus } from "@/data/dataPengurus";
import { dataAnggota } from "@/data/dataAnggota";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Position {
  id: string;
  title: string;
  level: number;
  parent?: string;
}

const positions: Position[] = [
  { id: "pembina", title: "Dewan Pembina", level: 1 },
  { id: "ketua", title: "Ketua Umum", level: 2, parent: "pembina" },
  { id: "pengarah", title: "Dewan Pengarah", level: 2, parent: "pembina" },
  { id: "wakil", title: "Wakil Ketua", level: 3, parent: "ketua" },
  { id: "sekretaris", title: "Sekretaris", level: 3, parent: "ketua" },
  { id: "bendahara", title: "Bendahara", level: 3, parent: "ketua" },
  { id: "humas", title: "Humas", level: 4, parent: "ketua" },
  { id: "it", title: "Tim IT", level: 4, parent: "ketua" },
  { id: "pprk", title: "PPRK", level: 4, parent: "ketua" },
  { id: "kreatif", title: "Tim Kreatif", level: 4, parent: "ketua" },
  { id: "anggota", title: "Anggota", level: 5, parent: "ketua" },
];

const defaultHolders = {
  "Dewan Pembina": "@January",
  "Dewan Pengarah": "@Naufal Alhakim",
  "Ketua Umum": "@Dian Nurjanah",
};

const PositionCard = ({
  position,
  isActive,
  onClick,
}: {
  position: Position;
  isActive: boolean;
  onClick: () => void;
}) => {
  const holders = dataPengurus.filter(
    (p) => p.Jabatan.toLowerCase() === position.title.toLowerCase()
  );

  if (holders.length === 0 && defaultHolders[position.title]) {
    holders.push({
      Person: defaultHolders[position.title],
      "Sub Jabatan": position.title,
      Jabatan: position.title,
      Rollup: "",
      "Jenis Kelamin": "Laki-Laki",
    });
  }

  const anggotaHolders =
    position.title === "Anggota"
      ? dataAnggota
          .filter((a) => a["Jenis Anggota"] === "Anggota Aktif")
          .slice(0, 5)
      : [];

  return (
    <HoverCard>
      <HoverCardTrigger>
        <Card
          className={`cursor-pointer transition-all ${
            isActive
              ? "border-primary bg-primary/10 transform scale-105"
              : "hover:border-primary/50 hover:bg-primary/5"
          }`}
          onClick={onClick}
        >
          <CardHeader className="p-4">
            <CardTitle className="text-sm text-center">
              {position.title}
            </CardTitle>
          </CardHeader>
          {(holders.length > 0 || anggotaHolders.length > 0) && (
            <CardContent className="p-4 pt-0">
              <div className="flex flex-wrap justify-center gap-2">
                {position.title === "Anggota"
                  ? anggotaHolders.map((holder, idx) => (
                      <Avatar key={idx} className="w-8 h-8">
                        <AvatarImage src={holder["Foto Profil"]} />
                        <AvatarFallback>
                          {holder["Nama Anggota"].substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    ))
                  : holders.map((holder, idx) => (
                      <Avatar key={idx} className="w-8 h-8">
                        <AvatarImage src={holder.Rollup} />
                        <AvatarFallback>
                          {holder.Person.substring(1, 3)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                {position.title === "Anggota" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                    +{dataAnggota.length - 5}
                  </div>
                )}
              </div>
            </CardContent>
          )}
        </Card>
      </HoverCardTrigger>
      {position.title !== "Anggota" && (
        <HoverCardContent>
          {holders.map((holder, idx) => (
            <div key={idx} className="flex items-center gap-4 py-2 ">
              {" "}
              {/* Tambahkan margin-bottom */}
              <Avatar>
                <AvatarImage src={holder.Rollup} />
                <AvatarFallback>{holder.Person.substring(1, 3)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">
                  {holder.Person.substring(1)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {holder["Sub Jabatan"]}
                </p>
              </div>
            </div>
          ))}
        </HoverCardContent>
      )}
    </HoverCard>
  );
};

export const StrukturOrganisasi = () => {
  const [activePosition, setActivePosition] = useState<string | null>(null);

  const handleClick = (positionId: string) => {
    if (positionId === "anggota") {
      setActivePosition(null);
      return;
    }
    setActivePosition(activePosition === positionId ? null : positionId);
  };

  return (
    <Section>
      <Container>
        <Card className="transition-all duration-300">
          <CardHeader>
            <CardTitle>Struktur Organisasi</CardTitle>
            <CardDescription>
              Struktur organisasi UKM Pendidikan, Riset dan Teknologi
              Universitas Terbuka
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-8">
              {/* Level 1 - Dewan Pembina */}
              <div className="grid grid-cols-1 gap-4 w-full md:w-1/3">
                {positions
                  .filter((p) => p.level === 1)
                  .map((position) => (
                    <PositionCard
                      key={position.id}
                      position={position}
                      isActive={activePosition === position.id}
                      onClick={() => handleClick(position.id)}
                    />
                  ))}
              </div>

              {/* Level 2 - Dewan Pengarah & Ketua Umum */}
              <div className="grid grid-cols-2 gap-8 w-full md:w-2/3">
                {positions
                  .filter((p) => p.level === 2)
                  .map((position) => (
                    <PositionCard
                      key={position.id}
                      position={position}
                      isActive={activePosition === position.id}
                      onClick={() => handleClick(position.id)}
                    />
                  ))}
              </div>

              {/* Level 3 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {positions
                  .filter((p) => p.level === 3)
                  .map((position) => (
                    <PositionCard
                      key={position.id}
                      position={position}
                      isActive={activePosition === position.id}
                      onClick={() => handleClick(position.id)}
                    />
                  ))}
              </div>

              {/* Level 4 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {positions
                  .filter((p) => p.level === 4)
                  .map((position) => (
                    <PositionCard
                      key={position.id}
                      position={position}
                      isActive={activePosition === position.id}
                      onClick={() => handleClick(position.id)}
                    />
                  ))}
              </div>

              {/* Level 5 */}
              <div className="grid grid-cols-1 gap-4 w-full md:w-1/2">
                {positions
                  .filter((p) => p.level === 5)
                  .map((position) => (
                    <PositionCard
                      key={position.id}
                      position={position}
                      isActive={activePosition === position.id}
                      onClick={() => handleClick(position.id)}
                    />
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
};
