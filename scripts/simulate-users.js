const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // pastikan path benar

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const users = [
  {
    id: "FkDWkOtmatN8BXtu2KSOQM413Q33",
    email: "user1@example.com",
    displayName: "User 1",
    coins: { creator: 99, reward: 0, diamond: 0, reader: 0 },
    role: "creator"
  },
  {
    id: "QqEcos7TG7RkHXD6xD25rxPMzsb2",
    email: "user2@example.com",
    displayName: "User 2",
    coins: { creator: 100, reward: 0, diamond: 0, reader: 0 },
    role: "creator"
  },
  {
    id: "Ri1lzXKFRhTWoA9gXDck3W7gfWE3",
    email: "user3@example.com",
    displayName: "User 3",
    coins: { creator: 200, reward: 0, diamond: 0, reader: 0 },
    role: "creator"
  },
  {
    id: "RsMSXczj2zfPLcgYFuVI9ngTVrE2",
    email: "user4@example.com",
    displayName: "User 4",
    coins: { creator: 150, reward: 0, diamond: 0, reader: 0 },
    role: "creator"
  },
  {
    id: "WIDMyQpWZ6QgL5Jv9QbUASDmS0N2",
    email: "user5@example.com",
    displayName: "User 5",
    coins: { creator: 120, reward: 0, diamond: 0, reader: 0 },
    role: "creator"
  },
  {
    id: "lSkWZ96TzHMGb7djgwiqvvsUBeP2",
    email: "user6@example.com",
    displayName: "User 6",
    coins: { creator: 80, reward: 0, diamond: 0, reader: 0 },
    role: "creator"
  },
  {
    id: "la2BnbT3BISTTNRprOaxNmXBPTv2",
    email: "user7@example.com",
    displayName: "User 7",
    coins: { creator: 90, reward: 0, diamond: 0, reader: 0 },
    role: "creator"
  },
  {
    id: "nfKIrazYgIhbHI73csVJaVL6Deq1",
    email: "user8@example.com",
    displayName: "User 8",
    coins: { creator: 110, reward: 0, diamond: 0, reader: 0 },
    role: "creator"
  },
  {
    id: "upcxNXTv9jOBEcilmmEdh2oszgJ3",
    email: "user9@example.com",
    displayName: "User 9",
    coins: { creator: 130, reward: 0, diamond: 0, reader: 0 },
    role: "creator"
  }
];

const transactions = [
  // Sample transactions for each user
  {
    userId: "FkDWkOtmatN8BXtu2KSOQM413Q33",
    type: "topup",
    from: "admin",
    to: "creator",
    amount: 99,
    rate: 1,
    note: "Initial topup",
    status: "approved"
  },
  {
    userId: "Ri1lzXKFRhTWoA9gXDck3W7gfWE3",
    type: "topup",
    from: "admin",
    to: "creator",
    amount: 200,
    rate: 1,
    note: "Initial topup",
    status: "approved"
  }
];

async function main() {
  // Create users with specific IDs
  for (const user of users) {
    const userRef = db.collection("users").doc(user.id);
    await userRef.set({
      email: user.email,
      displayName: user.displayName,
      coins: user.coins,
      role: user.role,
      createdAt: new Date().toISOString()
    });
    console.log(`User created: ${user.email} (${user.id})`);
  }

  // Create transactions
  for (const tx of transactions) {
    const txData = {
      userId: tx.userId,
      type: tx.type,
      from: tx.from,
      to: tx.to,
      amount: tx.amount,
      rate: tx.rate,
      note: tx.note,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    };
    if (typeof tx.status !== 'undefined') txData.status = tx.status;
    await db.collection("coin_transactions").add(txData);
    console.log(`Transaction created for user ${tx.userId}: ${tx.type}`);
  }

  console.log("Simulasi selesai!");
}

main().catch(console.error);