import { NextResponse } from 'next/server';

// Dummy data pendapatan
const pendapatan = {
  total: 1000000,
  detail: [
    { bulan: 'Januari', jumlah: 200000 },
    { bulan: 'Februari', jumlah: 300000 },
    { bulan: 'Maret', jumlah: 500000 },
  ],
};

export async function GET() {
  return NextResponse.json(pendapatan);
} 