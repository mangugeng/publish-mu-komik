"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Mail, Instagram, Youtube, Facebook, Heart, Users, TrendingUp, BookOpen } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="main-content mt-32 mb-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Tentang MU KOMIK Publisher</h1>
        <Card className="p-8 max-w-4xl mx-auto">
         
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <BookOpen className="mr-3 text-orange-500" size={28} />
                Tentang Platform
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                MU KOMIK Publisher adalah platform digital yang didedikasikan untuk para kreator komik Indonesia. 
                Kami menyediakan ruang bagi para seniman, penulis, dan kreator komik untuk menerbitkan karya orisinal 
                mereka dan menjangkau ribuan pembaca di seluruh Nusantara.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Heart className="mr-3 text-red-500" size={28} />
                Visi Kami
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Menjadi platform terdepan yang mendukung ekosistem komik digital Indonesia, 
                memberikan kesempatan bagi kreator lokal untuk berkembang dan mendapatkan penghasilan 
                dari passion mereka dalam dunia komik.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Users className="mr-3 text-blue-500" size={28} />
                Untuk Kreator
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  🎨 Platform yang user-friendly untuk upload dan mengelola komik Anda<br/>
                  💰 Sistem monetisasi yang fair untuk kreator<br/>
                  📊 Analytics detail untuk memahami performa komik<br/>
                  🌐 Jangkauan pembaca yang luas di seluruh Indonesia<br/>
                  🛡️ Perlindungan hak cipta untuk karya orisinal
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <TrendingUp className="mr-3 text-green-500" size={28} />
                Fitur Unggulan
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">Untuk Kreator</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Upload komik dengan mudah</li>
                    <li>Sistem chapter management</li>
                    <li>Analytics dan insights</li>
                    <li>Sistem monetisasi</li>
                    <li>Dashboard kreator</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">Untuk Pembaca</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Library komik yang luas</li>
                    <li>Pembayaran yang aman</li>
                    <li>Reading experience yang nyaman</li>
                    <li>Fitur bookmark dan favorite</li>
                    <li>Notifikasi update komik</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Kontak & Sosial Media</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="w-6 h-6 text-blue-500" />
                    <a 
                      href="mailto:mu.komik.apps@gmail.com" 
                      className="text-lg font-medium"
                    >
                      mu.komik.apps@gmail.com
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground ml-9">
                    Untuk pertanyaan bisnis, kerjasama, dan dukungan teknis
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Ikuti Kami</h3>
                  <div className="space-y-3">
                    <a
                      href="https://www.instagram.com/mu_komik/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-pink-500 transition-colors"
                    >
                      <Instagram className="w-6 h-6 text-pink-500" />
                      <span className="font-medium">@mu_komik</span>
                    </a>
                    <a
                      href="https://www.youtube.com/@mu-komik"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <Youtube className="w-6 h-6 text-red-500" />
                      <span className="font-medium">@mu-komik</span>
                    </a>
                    <a
                      href="https://www.facebook.com/mu.komik.reader"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-blue-600 transition-colors"
                    >
                      <Facebook className="w-6 h-6 text-blue-600" />
                      <span className="font-medium">mu.komik.reader</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Dukungan & Feedback</h2>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Kami sangat menghargai feedback, saran, dan masukan dari komunitas kreator dan pembaca. 
                  Setiap input dari Anda membantu kami untuk terus berkembang dan memberikan layanan terbaik. 
                  Jangan ragu untuk menghubungi kami melalui email atau sosial media di atas.
                </p>
              </div>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
} 