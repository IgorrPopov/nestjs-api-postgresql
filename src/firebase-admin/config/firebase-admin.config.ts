const admin = require('firebase-admin');

const serviceAccount = require('/home/igor/my-projects/nestjs-api-postgresql/firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export { admin };