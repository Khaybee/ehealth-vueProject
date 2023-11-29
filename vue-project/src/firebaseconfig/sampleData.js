const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('../credentials/firebase-sample-data-credentials.json'); // Replace with your service account key file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://sample-data-3d140-default-rtdb.firebaseio.com/' // Replace with your database URL
});

const db = admin.database();
const ref = db.ref('people');

// Generate and add sample data for 20 people
for (let i = 1; i <= 20; i++) {
  const person = {
    name: `Person ${i}`,
    age: Math.floor(Math.random() * 100) + 20, // Generate random age between 20 and 110
    bloodGroup: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'][Math.floor(Math.random() * 8)] // Random blood group
  };

  ref.push(person, (error) => {
    if (error) {
      console.error('Data could not be saved.', error);
    } else {
      console.log('Data saved successfully.');
    }
  });
}
