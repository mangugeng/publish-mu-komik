import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const { userId, planId, amount, paymentMethod, coins } = await req.json();

    // Validate request
    if (!userId || !planId || !amount || !paymentMethod || !coins) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transaction record
    const transactionId = `${userId}_${Date.now()}`;
    const transactionRef = doc(db, 'transactions', transactionId);
    
    await setDoc(transactionRef, {
      userId,
      planId,
      amount,
      paymentMethod,
      coins,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // Additional fields for manual verification
      paymentProof: null,
      verifiedBy: null,
      verifiedAt: null,
      notes: ''
    });

    return NextResponse.json({
      success: true,
      transactionId,
      message: 'Transaksi berhasil dibuat. Silakan lakukan pembayaran dan upload bukti pembayaran.'
    });
  } catch (error) {
    console.error('Transaction creation error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal membuat transaksi' },
      { status: 500 }
    );
  }
} 