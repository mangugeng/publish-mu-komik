#!/bin/bash

# Create directories if they don't exist
mkdir -p public/library/karakter
mkdir -p public/library/background
mkdir -p public/library/property
mkdir -p public/library/artstyle

# Download character images
curl -L "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80" -o "public/library/karakter/riko.jpg"
curl -L "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80" -o "public/library/karakter/maya.jpg"
curl -L "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" -o "public/library/karakter/pak-guru.jpg"
curl -L "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80" -o "public/library/karakter/anak_laki.jpg"
curl -L "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" -o "public/library/karakter/anak_perempuan.jpg"
curl -L "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80" -o "public/library/karakter/ibu_cantik.jpg"

# Download background images
curl -L "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80" -o "public/library/background/ruang-kelas.jpg"
curl -L "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80" -o "public/library/background/perpustakaan.jpg"
curl -L "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80" -o "public/library/background/halaman-sekolah.jpg"
curl -L "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80" -o "public/library/background/dapur.jpg"
curl -L "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80" -o "public/library/background/kamar_tidur.jpg"
curl -L "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80" -o "public/library/background/ruang_keluarga.jpg"
curl -L "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80" -o "public/library/background/taman.jpg"

# Download property images
curl -L "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80" -o "public/library/property/buku-matematika.jpg"
curl -L "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80" -o "public/library/property/smartphone.jpg"
curl -L "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80" -o "public/library/property/tas-ransel.jpg"
curl -L "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80" -o "public/library/property/bola.jpg"
curl -L "https://images.unsplash.com/photo-1562040506-a9b32cb51b94?auto=format&fit=crop&w=800&q=80" -o "public/library/property/boneka.jpg"
curl -L "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80" -o "public/library/property/buku_cerita.jpg"
curl -L "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80" -o "public/library/property/sepeda.jpg"

# Download art style reference images
curl -L "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80" -o "public/library/artstyle/manga-modern.jpg"
curl -L "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80" -o "public/library/artstyle/semi-realistic.jpg"
curl -L "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80" -o "public/library/artstyle/cartoon-modern.jpg"
curl -L "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80" -o "public/library/artstyle/anime_modern.jpg"
curl -L "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80" -o "public/library/artstyle/cartoon.jpg"
curl -L "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80" -o "public/library/artstyle/sketch.jpg"
curl -L "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80" -o "public/library/artstyle/watercolor.jpg" 