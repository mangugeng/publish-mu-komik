import { dbAdmin } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

// Konversi pembacaan ke diamond
const READ_TO_DIAMOND_RATIO = 0.1; // 1 pembacaan = 0.1 diamond

export async function GET(req: Request) {
  try {
    const { searchParams, pathname } = new URL(req.url);
    const creatorId = searchParams.get('creatorId');
    // Ambil comicId dari path: /api/comics/[id]/purchases
    const pathParts = pathname.split('/');
    const comicsIndex = pathParts.indexOf('comics');
    const comicId = comicsIndex !== -1 ? pathParts[comicsIndex + 1] : null;

    if (!creatorId) {
      return NextResponse.json({ error: 'creatorId required' }, { status: 400 });
    }
    if (!comicId) {
      return NextResponse.json({ error: 'comicId required' }, { status: 400 });
    }

    // Ambil semua purchases untuk komik ini
    const purchasesSnap = await dbAdmin.collection(`komik/${comicId}/purchases`).get();
    const purchases = purchasesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Hitung total pembacaan
    const totalReads = purchases.length;
    // Hitung diamond yang didapat
    const diamondEarned = totalReads * READ_TO_DIAMOND_RATIO;

    // Update diamond creator
    const creatorRef = dbAdmin.collection('users').doc(creatorId);
    const creatorDoc = await creatorRef.get();
    if (!creatorDoc.exists) {
      return NextResponse.json({ error: 'Creator not found' }, { status: 404 });
    }
    const creatorData = creatorDoc.data();
    const currentDiamond = creatorData?.coins?.diamond || 0;
    await creatorRef.update({
      'coins.diamond': currentDiamond + diamondEarned
    });

    return NextResponse.json({
      totalReads,
      diamondEarned,
      newDiamondBalance: currentDiamond + diamondEarned
    });
  } catch (error: any) {
    console.error('Error processing comic reads:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 