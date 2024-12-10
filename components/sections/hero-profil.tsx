"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function HeroProfil() {
  return (
    <section className=" py-15 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Background Pattern */}
        

        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              Tentang Kami
            </Badge>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Profil UKM PENRISTEK
          </motion.h1>

          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mx-auto max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Unit Kegiatan Mahasiswa yang berfokus pada pengembangan kompetensi
            dalam bidang pendidikan, riset, dan teknologi melalui berbagai
            program inovatif dan kolaboratif.
          </motion.p>

        </motion.div>
      </div>
    </section>
  );
}