import React from "react";
import { dataProker } from "@/lib/dataProker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Container, Section } from "@/components/commons/craft";

const ProgramKerjaPage = () => {
  return (
    <Section>
      <Container>
        <h1 className="text-2xl font-bold mb-4">Program Kerja</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Platform</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataProker.map(({ id, title, date, type, platform }, index) => (
              <TableRow key={id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{title}</TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{platform}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Section>
  );
};

export default ProgramKerjaPage;
