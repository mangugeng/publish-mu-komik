const admin = require('firebase-admin');
const path = require('path');

const serviceAccount = require(path.resolve(__dirname, './serviceAccountKey.json'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

const ALLOWED_USERS = [
  'A1b9syxkDueePAOHJByza6v8vru2', // poltamotion@gmail.com
  'Ftamn7KofFR1YmMrf0xoMvYq76V2', // pabajati@gmail.com
  'QqEcos7TG7RkHXD6xD25rxPMzsb2', // universalsaranamedia.business@gmail.com
  'la2BnbT3BISTTNRprOaxNmXBPTv2', // pamantrisodik@gmail.com
  'RsMSXczj2zfPLcgYFuVI9ngTVrE2', // sulistiyo.dimas14@gmail.com
  'lSkWZ96TzHMGb7djgwiqvvsUBeP2', // dewifairuzfarhan@gmail.com
  'WIDMyQpWZ6QgL5Jv9QbUASDmS0N2', // fairuzamelia31@gmail.com
  'upcxNXTv9jOBEcilmmEdh2oszgJ3', // sghrd73@gmail.com
  'Ri1lzXKFRhTWoA9gXDck3W7gfWE3', // luplaymedia@gmail.com
  'nfKIrazYgIhbHI73csVJaVL6Deq1', // sugeng.hariadi@gmail.com
  'FkDWkOtmatN8BXtu2KSOQM413Q33', // mang.ugeng@gmail.com
];

async function cleanupUsers() {
  try {
    console.log('Starting user cleanup...');
    
    // Get all users
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();
    
    let deletedCount = 0;
    let errorCount = 0;
    
    // Check each user
    for (const docSnap of snapshot.docs) {
      const userId = docSnap.id;
      
      // If user is not in allowed list, delete them
      if (!ALLOWED_USERS.includes(userId)) {
        try {
          await docSnap.ref.delete();
          console.log(`Deleted user: ${userId}`);
          deletedCount++;
        } catch (error) {
          console.error(`Error deleting user ${userId}:`, error);
          errorCount++;
        }
      }
    }
    
    console.log('\nCleanup completed:');
    console.log(`Total users processed: ${snapshot.size}`);
    console.log(`Users deleted: ${deletedCount}`);
    console.log(`Errors encountered: ${errorCount}`);
    
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
}

cleanupUsers(); 