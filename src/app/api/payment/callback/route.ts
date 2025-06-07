import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Validate callback payload
    if (!payload.transactionId || !payload.status) {
      return NextResponse.json(
        { success: false, message: 'Invalid callback payload' },
        { status: 400 }
      );
    }

    // Get transaction details
    const transactionRef = doc(db, 'transactions', payload.transactionId);
    const transactionDoc = await getDoc(transactionRef);

    if (!transactionDoc.exists()) {
      return NextResponse.json(
        { success: false, message: 'Transaction not found' },
        { status: 404 }
      );
    }

    const transaction = transactionDoc.data();

    // Update transaction status
    await updateDoc(transactionRef, {
      status: payload.status,
      updatedAt: new Date().toISOString(),
      paymentDetails: payload
    });

    // If payment is successful, update user's coins
    if (payload.status === 'success') {
      const userRef = doc(db, 'users', transaction.userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const currentCoins = userData.coins || {
          reader: 0,
          creator: 0,
          reward: 0,
          diamond: 0
        };

        // Update coins based on the plan
        const updatedCoins = {
          reader: (currentCoins.reader || 0) + (transaction.coins.reader || 0),
          creator: (currentCoins.creator || 0) + (transaction.coins.creator || 0),
          reward: (currentCoins.reward || 0) + (transaction.coins.reward || 0),
          diamond: (currentCoins.diamond || 0) + (transaction.coins.diamond || 0)
        };

        await updateDoc(userRef, {
          coins: updatedCoins,
          updatedAt: new Date().toISOString()
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Payment callback error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process payment callback' },
      { status: 500 }
    );
  }
} 