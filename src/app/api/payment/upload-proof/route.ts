import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const transactionId = formData.get('transactionId') as string;

    if (!file || !transactionId) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, message: 'File harus berupa gambar' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const filename = `${transactionId}_${Date.now()}.${file.type.split('/')[1]}`;
    const uploadDir = join(process.cwd(), 'public', 'payment-proofs');
    
    // Save file
    await writeFile(join(uploadDir, filename), buffer);

    // Update transaction record
    const transactionRef = doc(db, 'transactions', transactionId);
    await updateDoc(transactionRef, {
      paymentProof: `/payment-proofs/${filename}`,
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: 'Bukti pembayaran berhasil diupload'
    });
  } catch (error) {
    console.error('Payment proof upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal upload bukti pembayaran' },
      { status: 500 }
    );
  }
} 