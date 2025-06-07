import { dbAdmin } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

// GET /api/comics/analytics?userId=xxx
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

  // 1. Get all comics for this user
  const comicsSnap = await dbAdmin.collection('komik').where('authorId', '==', userId).get();
  const comics = comicsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];

  // 2. For each comic, get all chapters from subcollection
  const analytics = [];
  for (const comic of comics) {
    const chaptersSnap = await dbAdmin.collection(`komik/${comic.id}/chapters`).get();
    const chapters = chaptersSnap.docs.map(chap => ({
      id: chap.id,
      title: chap.data().title,
      order: chap.data().order,
      isComment: chap.data().isComment,
      // Statistik
      totalPurchases: chap.data().totalPurchases || 0,
      totalRevenue: chap.data().totalRevenue || 0,
      lastPurchaseTime: chap.data().lastPurchaseTime || null,
      purchaseCount: chap.data().purchaseCount || 0,
      viewCount: chap.data().viewCount || 0,
      lastViewTime: chap.data().lastViewTime || null,
      totalViews: chap.data().totalViews || 0,
      commentCount: chap.data().commentCount || 0,
      lastCommentTime: chap.data().lastCommentTime || null,
      totalComments: chap.data().totalComments || 0,
    }));
    analytics.push({
      comicId: comic.id,
      title: comic.title || '',
      chapters,
    });
  }

  return NextResponse.json(analytics);
} 