const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // path ke file credential-mu

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function migrateCoins() {
  const targetUserIds = [
    'FkDWkOtmatN8BXtu2KSOQM413Q33',
    'QqEcos7TG7RkHXD6xD25rxPMzsb2',
    'Ri1lzXKFRhTWoA9gXDck3W7gfWE3',
    'RsMSXczj2zfPLcgYFuVI9ngTVrE2',
    'WIDMyQpWZ6QgL5Jv9QbUASDmS0N2',
    'lSkWZ96TzHMGb7djgwiqvvsUBeP2',
    'la2BnbT3BISTTNRprOaxNmXBPTv2',
    'nfKIrazYgIhbHI73csVJaVL6Deq1',
    'upcxNXTv9jOBEcilmmEdh2oszgJ3'
  ];

  for (const userId of targetUserIds) {
    const userRef = db.collection("users").doc(userId);
    const doc = await userRef.get();

    if (!doc.exists) {
      console.log(`User ${userId} not found`);
      continue;
    }

    const data = doc.data();
    if (typeof data.coins === "number") {
      const newCoins = {
        creator: data.coins,
        reward: 0,
        diamond: 0,
        reader: 0
      };
      await doc.ref.update({ coins: newCoins });
      console.log(`Migrated user ${userId}:`, newCoins);
    } else {
      console.log(`User ${userId} already has the new coins structure`);
    }
  }
  console.log("Migrasi selesai!");
}

migrateCoins().catch(console.error);