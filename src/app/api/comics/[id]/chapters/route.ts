import { dbAdmin as db } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: any
) {
  const doc = await db.collection('komik').doc(params.id).get();
  if (!doc.exists) return NextResponse.json([], { status: 404 });
  const data = doc.data();
  return NextResponse.json(data?.chapters || []);
}

export async function POST(
  request: Request,
  { params }: any
) {
  try {
    const chapter = await request.json();
    const docRef = db.collection('komik').doc(params.id);
    const doc = await docRef.get();
    if (!doc.exists) {
      // Jika dokumen belum ada, buat dokumen baru dengan array chapters berisi satu chapter
      await docRef.set({ chapters: [chapter] }, { merge: true });
    } else {
      // Jika sudah ada, tambahkan chapter ke array
      await docRef.update({ chapters: FieldValue.arrayUnion(chapter) });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 