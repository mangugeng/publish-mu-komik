"use client";
import Link from "next/link";
import HeaderNav from "@/components/header-nav";
import { CheckCircle, Globe, Mail, Instagram, Star, Users, TrendingUp, Heart, Palette, BookOpen, Smartphone, Youtube, Facebook } from "lucide-react";
import Logo from "@/components/Logo";
import CharacterOverlay from "@/components/CharacterOverlay";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <HeaderNav />
      
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-purple-700 relative overflow-hidden pt-16 md:pt-32">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Comic-style decorations */}
          <div className="absolute top-20 right-10 w-32 h-32 bg-purple-300 rounded-full opacity-20 animate-pulse-glow"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-orange-300 rounded-full opacity-20 animate-pulse-glow delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-300 rounded-full opacity-20 animate-pulse-glow delay-500"></div>
          
          {/* Halftone dots pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-4 h-4 bg-white rounded-full comic-dot" style={{"--dot-index": "0"} as any}></div>
            <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full comic-dot" style={{"--dot-index": "1"} as any}></div>
            <div className="absolute top-30 left-15 w-3 h-3 bg-white rounded-full comic-dot" style={{"--dot-index": "2"} as any}></div>
            <div className="absolute top-40 left-25 w-2 h-2 bg-white rounded-full comic-dot" style={{"--dot-index": "3"} as any}></div>
            <div className="absolute top-50 left-35 w-4 h-4 bg-white rounded-full comic-dot" style={{"--dot-index": "4"} as any}></div>
            <div className="absolute top-60 left-45 w-3 h-3 bg-white rounded-full comic-dot" style={{"--dot-index": "5"} as any}></div>
            <div className="absolute top-70 left-55 w-2 h-2 bg-white rounded-full comic-dot" style={{"--dot-index": "6"} as any}></div>
            <div className="absolute top-80 left-65 w-4 h-4 bg-white rounded-full comic-dot" style={{"--dot-index": "7"} as any}></div>
            <div className="absolute top-90 left-75 w-3 h-3 bg-white rounded-full comic-dot" style={{"--dot-index": "8"} as any}></div>
            <div className="absolute top-100 left-85 w-2 h-2 bg-white rounded-full comic-dot" style={{"--dot-index": "9"} as any}></div>
            
            {/* Right side dots */}
            <div className="absolute top-10 right-10 w-4 h-4 bg-white rounded-full comic-dot" style={{"--dot-index": "10"} as any}></div>
            <div className="absolute top-20 right-20 w-2 h-2 bg-white rounded-full comic-dot" style={{"--dot-index": "11"} as any}></div>
            <div className="absolute top-30 right-15 w-3 h-3 bg-white rounded-full comic-dot" style={{"--dot-index": "12"} as any}></div>
            <div className="absolute top-40 right-25 w-2 h-2 bg-white rounded-full comic-dot" style={{"--dot-index": "13"} as any}></div>
            <div className="absolute top-50 right-35 w-4 h-4 bg-white rounded-full comic-dot" style={{"--dot-index": "14"} as any}></div>
            <div className="absolute top-60 right-45 w-3 h-3 bg-white rounded-full comic-dot" style={{"--dot-index": "15"} as any}></div>
            <div className="absolute top-70 right-55 w-2 h-2 bg-white rounded-full comic-dot" style={{"--dot-index": "16"} as any}></div>
            <div className="absolute top-80 right-65 w-4 h-4 bg-white rounded-full comic-dot" style={{"--dot-index": "17"} as any}></div>
            <div className="absolute top-90 right-75 w-3 h-3 bg-white rounded-full comic-dot" style={{"--dot-index": "18"} as any}></div>
            <div className="absolute top-100 right-85 w-2 h-2 bg-white rounded-full comic-dot" style={{"--dot-index": "19"} as any}></div>
          </div>
          
          {/* Comic burst elements */}
          <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-yellow-300 opacity-30 transform rotate-45 comic-burst"></div>
          <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-orange-300 opacity-30 transform -rotate-45 comic-burst"></div>
          
          {/* Dynamic accent elements */}
          <div className="absolute top-1/3 left-1/6 w-12 h-12 bg-pink-400 opacity-40 rounded-full animate-pulse-glow delay-300"></div>
          <div className="absolute bottom-1/3 right-1/6 w-16 h-16 bg-cyan-400 opacity-35 rounded-full animate-pulse-glow delay-700"></div>
          <div className="absolute top-2/3 left-1/3 w-10 h-10 bg-emerald-400 opacity-45 rounded-full animate-pulse-glow delay-1200"></div>
          <div className="absolute top-1/2 right-1/3 w-14 h-14 bg-violet-400 opacity-30 rounded-full animate-pulse-glow delay-900"></div>
        </div>
        
        {/* Character Overlay */}
        <CharacterOverlay />
        
        <div className="relative z-50 container mx-auto px-4 py-0 md:py-0">
          {/* Logo at the very top - mobile only */}
          <div className="md:hidden flex justify-center mb-6 mt-0">
            <div className="rounded-full overflow-hidden w-[200px] h-[200px] bg-white shadow-lg flex items-center justify-center">
              <div className="flex items-center justify-center w-full h-full">
                <Logo size="xl" variant="default" />
              </div>
            </div>
          </div>

          {/* Mobile characters - positioned below logo */}
          <div className="md:hidden flex justify-center mb-8 mt-8">
            <div className="grid grid-cols-3 gap-4 relative">
              {/* VFX Overlay - Stars and Sparkles */}
              <div className="absolute inset-0 pointer-events-none z-50">
                {/* Floating stars with rotation */}
                <div className="absolute top-2 left-4 w-2 h-2 bg-yellow-300 rounded-full animate-floating-star opacity-80"></div>
                <div className="absolute top-8 right-6 w-1 h-1 bg-pink-300 rounded-full animate-floating-star delay-500 opacity-70"></div>
                <div className="absolute bottom-4 left-8 w-1.5 h-1.5 bg-blue-300 rounded-full animate-floating-star delay-1000 opacity-90"></div>
                <div className="absolute top-12 left-2 w-1 h-1 bg-purple-300 rounded-full animate-floating-star delay-1500 opacity-60"></div>
                <div className="absolute bottom-8 right-2 w-2 h-2 bg-orange-300 rounded-full animate-floating-star delay-2000 opacity-80"></div>
                
                {/* Motion lines with dynamic animation */}
                <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-gradient-to-b from-transparent via-yellow-400 to-transparent animate-motion-line opacity-60"></div>
                <div className="absolute bottom-0 right-1/3 w-0.5 h-6 bg-gradient-to-b from-transparent via-pink-400 to-transparent animate-motion-line delay-700 opacity-50"></div>
                <div className="absolute top-1/2 left-0 w-0.5 h-4 bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-motion-line delay-1200 opacity-70"></div>
                
                {/* Sparkle effects with scale and rotation */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full animate-sparkle opacity-90 transform rotate-45"></div>
                <div className="absolute bottom-2 left-6 w-2 h-2 bg-white rounded-full animate-sparkle delay-300 opacity-80 transform -rotate-45"></div>
                <div className="absolute top-6 left-1/2 w-2.5 h-2.5 bg-white rounded-full animate-sparkle delay-800 opacity-70 transform rotate-90"></div>
                
                {/* Additional sparkles */}
                <div className="absolute top-1 right-1 w-1 h-1 bg-cyan-300 rounded-full animate-sparkle delay-400 opacity-90"></div>
                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-sparkle delay-600 opacity-80"></div>
                <div className="absolute top-10 left-6 w-1 h-1 bg-violet-300 rounded-full animate-sparkle delay-900 opacity-70"></div>
                
                {/* Energy particles */}
                <div className="absolute top-3 right-8 w-1 h-1 bg-yellow-400 rounded-full animate-pulse-glow delay-200 opacity-90"></div>
                <div className="absolute bottom-6 left-4 w-1 h-1 bg-pink-400 rounded-full animate-pulse-glow delay-400 opacity-80"></div>
                <div className="absolute top-14 right-2 w-1 h-1 bg-blue-400 rounded-full animate-pulse-glow delay-600 opacity-70"></div>
              </div>
              
              <div className="relative w-24 h-32">
                <Image
                  src="/tokoh1.png"
                  alt="Character 1"
                  fill
                  className="object-contain object-bottom animate-character-float"
                  priority
                />
              </div>
              <div className="relative w-24 h-32">
                <Image
                  src="/tokoh2.png"
                  alt="Character 2"
                  fill
                  className="object-contain object-bottom animate-character-float delay-500"
                  priority
                />
              </div>
              <div className="relative w-24 h-32">
                <Image
                  src="/tokoh3.png"
                  alt="Character 3"
                  fill
                  className="object-contain object-bottom animate-character-float delay-1000"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Text content */}
            <div className="text-white animate-slide-in-up">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-center md:text-left">
                Halo para kreator komik se-Nusantara!
              </h1>
              <p className="text-xl md:text-2xl mb-8 font-medium text-center md:text-left">
                Punya komik keren? Cerita orisinal? Visual yang unik?
              </p>
              <div className="glass rounded-2xl p-6 mb-8 inline-block animate-float w-full md:w-auto border-2 border-yellow-300 shadow-2xl">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-2 text-center md:text-left bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                  TERBITKAN KOMIKMU & DAPAT CUAN TAMBAHAN!
                </h2>
              </div>
            </div>
            
            {/* Right side - Character space */}
            <div className="hidden md:block relative h-96">
              {/* Character will be positioned here by CharacterOverlay */}
            </div>
          </div>

          {/* Character Illustrations */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Comic Artist Character */}
            <div className="glass rounded-2xl p-8 text-white hover-lift text-center animate-bounce-in character-1 border border-orange-300 shadow-xl">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-float shadow-lg">
                <Palette className="text-white" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-orange-300 to-red-400 bg-clip-text text-transparent">Kreator Komik</h3>
              <p className="text-sm opacity-90">Upload karya orisinalmu</p>
            </div>
            
            {/* Digital Reading */}
            <div className="glass rounded-2xl p-8 text-white hover-lift text-center animate-bounce-in character-2 border border-blue-300 shadow-xl">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center animate-float delay-500 shadow-lg">
                <BookOpen className="text-white" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">Pembaca Digital</h3>
              <p className="text-sm opacity-90">Jangkau ribuan pembaca</p>
            </div>
            
            {/* Mobile Platform */}
            <div className="glass rounded-2xl p-8 text-white hover-lift text-center animate-bounce-in character-3 border border-green-300 shadow-xl">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 via-teal-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center animate-float delay-1000 shadow-lg">
                <Smartphone className="text-white" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-green-300 to-teal-400 bg-clip-text text-transparent">Platform Digital</h3>
              <p className="text-sm opacity-90">Akses dari mana saja</p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="glass rounded-2xl p-8 text-white hover-lift border border-green-300 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
                <CheckCircle className="mr-3 text-green-400" size={28} />
                Yang Kamu Dapatkan
              </h3>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start hover:bg-green-500/10 p-2 rounded-lg transition-colors">
                  <CheckCircle className="mr-3 text-green-400 mt-1 flex-shrink-0" size={20} />
                  Menerbitkan komikmu di platform digital lokal
                </li>
                <li className="flex items-start hover:bg-green-500/10 p-2 rounded-lg transition-colors">
                  <CheckCircle className="mr-3 text-green-400 mt-1 flex-shrink-0" size={20} />
                  Menjangkau pembaca dari seluruh Indonesia
                </li>
                <li className="flex items-start hover:bg-green-500/10 p-2 rounded-lg transition-colors">
                  <CheckCircle className="mr-3 text-green-400 mt-1 flex-shrink-0" size={20} />
                  Mendapatkan pendapatan tambahan dari karya yang kamu sukai
                </li>
                <li className="flex items-start hover:bg-green-500/10 p-2 rounded-lg transition-colors">
                  <CheckCircle className="mr-3 text-green-400 mt-1 flex-shrink-0" size={20} />
                  Bangun komunitas penggemar dan promosikan dirimu
                </li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-8 text-white hover-lift border border-yellow-300 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                <Star className="mr-3 text-yellow-400" size={28} />
                Genre yang Kami Terima
              </h3>
              <div className="grid grid-cols-2 gap-3 text-lg">
                <div className="flex items-center hover:bg-yellow-500/10 p-2 rounded-lg transition-colors">
                  <Star className="mr-2 text-yellow-400" size={16} />
                  Komik Pendek
                </div>
                <div className="flex items-center hover:bg-yellow-500/10 p-2 rounded-lg transition-colors">
                  <Star className="mr-2 text-yellow-400" size={16} />
                  Strip Mingguan
                </div>
                <div className="flex items-center hover:bg-yellow-500/10 p-2 rounded-lg transition-colors">
                  <Star className="mr-2 text-yellow-400" size={16} />
                  One-Shot
                </div>
                <div className="flex items-center hover:bg-yellow-500/10 p-2 rounded-lg transition-colors">
                  <Star className="mr-2 text-yellow-400" size={16} />
                  Silat
                </div>
                <div className="flex items-center">
                  <Star className="mr-2 text-yellow-400" size={16} />
                  Horror
                </div>
                <div className="flex items-center">
                  <Star className="mr-2 text-yellow-400" size={16} />
                  Slice of Life
                </div>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="glass rounded-2xl p-8 text-center text-white mb-12 animate-fade-in">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center">
              <Heart className="mr-3 text-red-400" size={28} />
              Misi Kami
            </h3>
            <p className="text-xl leading-relaxed">
              Kami ingin membangun rumah bagi komik-komik Indonesia yang kreatif, beragam, dan otentik. 
              Yuk gabung dan jadi bagian dari gerakan komik digital baru!
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="text-center space-y-4 animate-slide-in-up">
          <Link href="/upload">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-xl shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105 hover-lift">
                Upload Komik Sekarang! 🚀
              </button>
          </Link>
            <p className="text-white text-lg font-medium">
              Bersama kita buktikan, komik lokal juga bisa unjuk gigi!
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white py-16 relative z-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Info & Kirim Karya
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 hover-lift">
              <Globe className="mx-auto mb-4 text-purple-600" size={40} />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Website</h3>
              <p className="text-gray-600">publish.mu-komik.com</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 hover-lift">
              <Mail className="mx-auto mb-4 text-orange-600" size={40} />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600">mu.komik.apps@gmail.com</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 hover-lift">
              <Instagram className="mx-auto mb-4 text-pink-600" size={40} />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Instagram</h3>
              <p className="text-gray-600">@mu_komik</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-red-50 to-red-100 hover-lift">
              <Youtube className="mx-auto mb-4 text-red-600" size={40} />
              <h3 className="text-xl font-bold text-gray-800 mb-2">YouTube</h3>
              <a href="https://www.youtube.com/@mu-komik" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors">
                @mu-komik
              </a>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover-lift">
              <Facebook className="mx-auto mb-4 text-blue-600" size={40} />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Facebook</h3>
              <a href="https://www.facebook.com/mu.komik.reader" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
                mu.komik.reader
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 py-16 relative z-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <Users className="mx-auto mb-4" size={48} />
              <h3 className="text-3xl font-bold mb-2">1000+</h3>
              <p className="text-lg">Kreator Komik</p>
            </div>
            <div>
              <TrendingUp className="mx-auto mb-4" size={48} />
              <h3 className="text-3xl font-bold mb-2">50K+</h3>
              <p className="text-lg">Pembaca Aktif</p>
            </div>
            <div>
              <Heart className="mx-auto mb-4" size={48} />
              <h3 className="text-3xl font-bold mb-2">100%</h3>
              <p className="text-lg">Komik Lokal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Section */}
      <div className="bg-gray-50 py-16 relative z-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Syarat & Ketentuan Upload Komik
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <ol className="list-decimal ml-6 text-gray-700 space-y-3 text-lg">
              <li>Karya komik harus orisinal dan tidak melanggar hak cipta pihak lain.</li>
              <li>Konten tidak mengandung unsur SARA, pornografi, atau kekerasan berlebihan.</li>
              <li>Komik yang diupload akan melalui proses review sebelum dipublikasikan.</li>
              <li>Penjualan komik tunduk pada aturan dan pembagian hasil platform.</li>
              <li>Dengan mengupload, Anda setuju dengan <Link href="/terms" className="underline text-purple-600 font-semibold">Syarat & Ketentuan Platform</Link>.</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
} 