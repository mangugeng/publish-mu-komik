import { NextResponse } from 'next/server';

// Dummy data analytik
const analytik = {
  totalViews: 5000,
  totalLikes: 1000,
  totalComments: 500,
  detail: [
    { tanggal: '2023-01-01', views: 100, likes: 20, comments: 10 },
    { tanggal: '2023-01-02', views: 200, likes: 40, comments: 20 },
    { tanggal: '2023-01-03', views: 300, likes: 60, comments: 30 },
  ],
};

export async function GET() {
  return NextResponse.json(analytik);
} 