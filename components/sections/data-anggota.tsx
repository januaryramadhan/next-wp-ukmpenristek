"use client";

import { useState } from "react";
import { dataAnggota } from "@/data/dataAnggota";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 20;

export function DataAnggotaComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term
  const filteredData = dataAnggota.filter((anggota) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      anggota["Nama Anggota"].toLowerCase().includes(searchLower) ||
      anggota.Prodi.toLowerCase().includes(searchLower) ||
      anggota.NIM.toLowerCase().includes(searchLower)
    );
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Generate page numbers array
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Data Anggota</h2>
        <p className="text-muted-foreground">
          Daftar seluruh anggota UKM PENRISTEK UT
        </p>
      </div>

      {/* Search Input */}
      <div className="flex items-center space-x-2">
        <Input
          type="search"
          placeholder="Cari nama, prodi, atau NIM..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page when searching
          }}
          className="max-w-sm"
        />
        <div className="text-sm text-muted-foreground">
          Total: {filteredData.length} anggota
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentData.map((anggota, index) => (
          <Card key={index}>
            <CardContent className="pt-6 flex flex-col items-center space-y-4">
              <Avatar className="h-20 w-20">
                {anggota["Foto Profil"] ? (
                  <AvatarImage 
                    src={anggota["Foto Profil"]} 
                    alt={anggota["Nama Anggota"]} 
                    className="object-cover"
                  />
                ) : (
                  <AvatarFallback>
                    {anggota["Nama Anggota"].split(' ').map(name => name[0]).join('').substring(0, 2)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="text-center">
                <p className="font-medium">{anggota["Nama Anggota"]}</p>
                <p className="text-sm text-muted-foreground">{anggota.Prodi}</p>
                <p className="text-sm text-muted-foreground">{anggota.NIM}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                  anggota["Jenis Anggota"] === "Aktif" 
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {anggota["Jenis Anggota"]}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>

            {getPageNumbers().map((pageNum, index) => (
              <PaginationItem key={index}>
                {pageNum === "..." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={currentPage === pageNum}
                    onClick={() => setCurrentPage(Number(pageNum))}
                  >
                    {pageNum}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}