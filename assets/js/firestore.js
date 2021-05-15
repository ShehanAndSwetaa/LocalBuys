const firebaseConfig = {
    apiKey: "AIzaSyBFDO5W0I_cnFuT7DXDjioN35XEKzRi6iY",
    authDomain: "shoplocal-71b03.firebaseapp.com",
    projectId: "shoplocal-71b03",
    storageBucket: "shoplocal-71b03.appspot.com",
    messagingSenderId: "1057816713284",
    appId: "1:1057816713284:web:0a070fb4aada9404b84411",
    measurementId: "G-4J4V0QCYW9"
};

// Initialize Cloud Firestore through Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Firestore Keys
const BUSINESSES = "businesses";
const PRODUCTS = "products";

async function addBusiness(business) {
    return db.collection(BUSINESSES).doc(business.name).set(business);
}

async function addProduct(business, product) {
    return db.collection(BUSINESSES).doc(business.name).collection(PRODUCTS).add(product);
}
