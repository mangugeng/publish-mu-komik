import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "@/lib/firebase";

export async function logCoinTransaction({
  userId,
  type,
  from,
  to,
  amount,
  rate,
  note = ""
}: {
  userId: string;
  type: string;
  from: string;
  to: string;
  amount: number;
  rate: number;
  note?: string;
}) {
  const db = getFirestore(app);
  await addDoc(collection(db, "coin_transactions"), {
    userId,
    type,
    from,
    to,
    amount,
    rate,
    timestamp: serverTimestamp(),
    note,
  });
} 