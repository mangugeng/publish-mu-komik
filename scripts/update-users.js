const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const users = [
  {
    id: "A1b9syxkDueePAOHJByza6v8vru2",
    email: "poltamotion@gmail.com",
    displayName: "Poltamotion",
    coins: { creator: 1000, reward: 0, diamond: 0, reader: 1000 },
    role: "creator"
  },
  {
    id: "Ftamn7KofFR1YmMrf0xoMvYq76V2",
    email: "pabajati@gmail.com",
    displayName: "Pabajati",
    coins: { creator: 1000, reward: 0, diamond: 0, reader: 1000 },
    role: "creator"
  },
  {
    id: "QqEcos7TG7RkHXD6xD25rxPMzsb2",
    email: "universalsaranamedia.business@gmail.com",
    displayName: "Universal Sarana Media",
    coins: { creator: 1000, reward: 0, diamond: 0, reader: 1000 },
    role: "creator"
  },
  {
    id: "la2BnbT3BISTTNRprOaxNmXBPTv2",
    email: "pamantrisodik@gmail.com",
    displayName: "Pamantri Sodik",
    coins: { creator: 1000, reward: 0, diamond: 0, reader: 1000 },
    role: "creator"
  },
  {
    id: "RsMSXczj2zfPLcgYFuVI9ngTVrE2",
    email: "sulistiyo.dimas14@gmail.com",
    displayName: "Sulistiyo Dimas",
    coins: { creator: 1000, reward: 0, diamond: 0, reader: 1000 },
    role: "creator"
  },
  {
    id: "lSkWZ96TzHMGb7djgwiqvvsUBeP2",
    email: "dewifairuzfarhan@gmail.com",
    displayName: "Dewi Fairuz Farhan",
    coins: { creator: 1000, reward: 0, diamond: 0, reader: 1000 },
    role: "creator"
  },
  {
    id: "WIDMyQpWZ6QgL5Jv9QbUASDmS0N2",
    email: "fairuzamelia31@gmail.com",
    displayName: "Fairuz Amelia",
    coins: { creator: 1000, reward: 0, diamond: 0, reader: 1000 },
    role: "creator"
  },
  {
    id: "upcxNXTv9jOBEcilmmEdh2oszgJ3",
    email: "sghrd73@gmail.com",
    displayName: "SGHRD 73",
    coins: { creator: 1000, reward: 0, diamond: 0, reader: 1000 },
    role: "creator"
  },
  {
    id: "Ri1lzXKFRhTWoA9gXDck3W7gfWE3",
    email: "luplaymedia@gmail.com",
    displayName: "Luplay Media",
    coins: { creator: 1000, reward: 0, diamond: 0, reader: 1000 },
    role: "creator"
  },
  {
    id: "nfKIrazYgIhbHI73csVJaVL6Deq1",
    email: "sugeng.hariadi@gmail.com",
    displayName: "Sugeng Hariadi",
    coins: { creator: 1000, reward: 0, diamond: 0, reader: 1000 },
    role: "creator"
  },
  {
    id: "FkDWkOtmatN8BXtu2KSOQM413Q33",
    email: "mang.ugeng@gmail.com",
    displayName: "Mang Ugeng",
    coins: { creator: 1000, reward: 0, diamond: 0, reader: 1000 },
    role: "creator"
  }
];

async function updateUsers() {
  try {
    for (const user of users) {
      const userRef = db.collection("users").doc(user.id);
      await userRef.set({
        email: user.email,
        displayName: user.displayName,
        coins: user.coins,
        role: user.role,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      console.log(`Updated user: ${user.email} (${user.id})`);
    }
    console.log("Update selesai!");
  } catch (error) {
    console.error("Error updating users:", error);
  }
}

updateUsers().catch(console.error); 