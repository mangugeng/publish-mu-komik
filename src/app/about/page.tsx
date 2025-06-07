"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { Instagram } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="main-content mt-32 mb-16">
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tentang MU KOMIK Publisher</h1>
        <Card className="p-6 max-w-6xl mx-auto">
         
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">Tentang Software</h2>
              <p className="text-muted-foreground">
                Comic Creator AI adalah platform yang membantu Anda membuat komik dengan bantuan AI. 
                Software ini masih dalam tahap pengembangan aktif dan kami terus berusaha meningkatkan 
                fitur-fitur untuk memberikan pengalaman terbaik bagi pengguna.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Status Pengembangan</h2>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-muted-foreground">
                  🚧 Software ini masih dalam tahap pengembangan. Beberapa fitur mungkin belum 
                  sepenuhnya berfungsi atau masih dalam tahap penyempurnaan. Kami sangat menghargai 
                  feedback dari pengguna untuk membantu kami meningkatkan kualitas software ini.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Kontak & Feedback</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-5 h-5" />
                <a 
                  href="mailto:mang.ugeng@gmail.com" 
                  className="hover:text-primary transition-colors"
                >
                  mang.ugeng@gmail.com
                </a>
              </div>
              <p className="mt-2 text-muted-foreground">
                Kami sangat menghargai feedback, saran, dan bug report dari pengguna. 
                Silakan hubungi kami melalui email di atas untuk memberikan masukan 
                atau melaporkan masalah yang Anda temui.
              </p>
              <div className="flex items-center gap-2 mt-4 text-muted-foreground">
                <Instagram className="w-5 h-5" />
                <a
                  href="https://www.instagram.com/mu.komik/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors font-medium"
                >
                  Follow Instagram @mu.komik
                </a>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Fitur yang Sedang Dikembangkan</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Peningkatan kualitas generasi gambar AI</li>
                <li>Penambahan template dan gaya artistik baru</li>
                <li>Peningkatan performa dan kecepatan rendering</li>
                <li>Fitur kolaborasi tim</li>
                <li>Integrasi dengan platform komik lainnya</li>
              </ul>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
} 