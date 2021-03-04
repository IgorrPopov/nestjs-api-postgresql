const admin = require('firebase-admin');

const serviceAccount = require('/home/igor/my-projects/nestjs-api-postgresql/cloud-store-test-app-firebase-adminsdk-oyo6t-4be20b84a2.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export { admin };