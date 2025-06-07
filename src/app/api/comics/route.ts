import { dbAdmin } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const authorId = searchParams.get('authorId');
  const collectionRef = dbAdmin.collection('komik');
  let queryRef = collectionRef as FirebaseFirestore.Query;
  if (authorId) {
    queryRef = collectionRef.where('authorId', '==', authorId);
  }
  const snapshot = await queryRef.get();
  const comics = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json(comics);
}

export async function POST(req: Request) {
  const data = await req.json();
  await dbAdmin.collection('komik').doc(data.id).set(data);
  return NextResponse.json({ id: data.id });
} 