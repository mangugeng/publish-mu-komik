import { dbAdmin } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: any) {
  try {
    const data = await req.json();
    await dbAdmin.collection('komik').doc(params.id).set(data, { merge: true });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: any) {
  await dbAdmin.collection('komik').doc(params.id).delete();
  return NextResponse.json({ success: true });
} 