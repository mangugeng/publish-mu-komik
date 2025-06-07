import { dbAdmin as db } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: any) {
  const { params } = context;
  const doc = await db.collection('komik').doc(params.id).get();
  if (!doc.exists) return NextResponse.json([], { status: 404 });
  const data = doc.data();
  const chapter = (data?.chapters || []).find((ch: any) => ch.id === params.chapterId);
  return NextResponse.json(chapter?.pages || []);
}

export async function POST(req: Request, context: any) {
  const { params } = context;
  try {
    const page = await req.json();
    const docRef = db.collection('komik').doc(params.id);
    const doc = await docRef.get();
    if (!doc.exists) return NextResponse.json({ error: 'Comic not found' }, { status: 404 });
    const data = doc.data();
    const chapters = data?.chapters || [];
    const updatedChapters = chapters.map((ch: any) =>
      ch.id === params.chapterId ? { ...ch, pages: [...(ch.pages || []), page] } : ch
    );
    await docRef.update({ chapters: updatedChapters });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 