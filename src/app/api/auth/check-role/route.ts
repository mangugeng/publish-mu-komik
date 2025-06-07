import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { dbAdmin } from '@/lib/firebaseAdmin';

export async function POST(request: Request) {
  try {
    const { session } = await request.json();

    if (!session) {
      return NextResponse.json({ isSuperadmin: false }, { status: 401 });
    }

    const decodedClaims = await getAuth().verifySessionCookie(session, true);
    const userDoc = await dbAdmin.collection('users').doc(decodedClaims.uid).get();
    const userData = userDoc.data();
    const isSuperadmin = userDoc.exists && userData && userData.role === 'superadmin';

    return NextResponse.json({ isSuperadmin });
  } catch (error) {
    console.error('Error checking role:', error);
    return NextResponse.json({ isSuperadmin: false }, { status: 401 });
  }
} 