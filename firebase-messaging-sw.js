importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-messaging.js');

var firebaseConfig = {
  apiKey: "AIzaSyDkD4ii2a-teW7COYFvY2TfJaBVEC4Cw34",
  authDomain: "cloud-store-test-app.firebaseapp.com",
  projectId: "cloud-store-test-app",
  storageBucket: "cloud-store-test-app.appspot.com",
  messagingSenderId: "418137229436",
  appId: "1:418137229436:web:4702e54d4676e0305a61f9",
  measurementId: "G-CDZJCWEHTT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();