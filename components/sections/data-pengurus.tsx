"use client";

import { useState } from "react";
import { dataPengurus } from "@/data/dataPengurus";
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

const isValidUrl = (urlString: string) => {
  try {
    new URL(urlString);
    return true;
  } catch (e) {
    return false;
  }
};

export function DataPengurus() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term
  const filteredData = dataPengurus.filter((pengurus) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      pengurus.Person.toLowerCase().includes(searchLower) ||
      pengurus["Sub Jabatan"].toLowerCase().includes(searchLower)
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
        <h2 className="text-3xl font-bold tracking-tight">Data Pengurus</h2>
        <p className="text-muted-foreground">
          Daftar seluruh pengurus UKM PENRISTEK UT
        </p>
      </div>

      {/* Search Input */}
      <div className="flex items-center space-x-2">
        <Input
          type="search"
          placeholder="Cari nama atau posisi..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="max-w-sm"
        />
        <div className="text-sm text-muted-foreground">
          Total: {filteredData.length} pengurus
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentData.map((pengurus, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  {pengurus.Rollup && isValidUrl(pengurus.Rollup) ? (
                    <AvatarImage
                      src={pengurus.Rollup}
                      alt={pengurus.Person}
                      className="object-cover"
                    />
                  ) : (
                    <AvatarFallback className="text-lg">
                      {pengurus.Person.replace("@", "")
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .substring(0, 2)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-lg">
                    {pengurus.Person.replace("@", "")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {pengurus["Sub Jabatan"]}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      pengurus["Jenis Kelamin"] === "Laki-Laki"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-pink-50 text-pink-700"
                    }`}
                  >
                    {pengurus["Jenis Kelamin"]}
                  </span>
                </div>
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
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}