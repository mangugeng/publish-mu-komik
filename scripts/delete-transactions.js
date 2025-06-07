const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const transactionIds = [
  'TzV1jLcBAXvPwr9RG1Aq',
  'brGbrDJvJSIYFhXs5nZQ',
  'zg9elUGJ9T3GfuUXNrYT',
  '9AcUdYrNQmvUBN4ppvju'
];

async function deleteTransactions() {
  try {
    for (const txId of transactionIds) {
      const txRef = db.collection("coin_transactions").doc(txId);
      await txRef.delete();
      console.log(`Deleted transaction: ${txId}`);
    }
    console.log("Penghapusan transaksi selesai!");
  } catch (error) {
    console.error("Error deleting transactions:", error);
  }
}

deleteTransactions().catch(console.error); 