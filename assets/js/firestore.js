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

async function getProducts() {
    let products = {};
    return db.collection(BUSINESSES).get()
        .then((snapshot) => {
            let promises = [];
            snapshot.forEach((doc) => {
                let business = Business.fromJson(doc.data());
                promises.push(db.collection(BUSINESSES).doc(doc.id).collection(PRODUCTS).get()
                    .then((snapshot) => {
                        snapshot.forEach((productDoc) => {
                            products[productDoc.id] = Product.fromDoc(productDoc, business);
                        });
                    }).catch((error) => console.log("Failed to retrieve products for ", business.name)));
            });
            return Promise.all(promises).then(data => {
                console.log(`Retrieved ${Object.keys(products).length} products`);
                return products;
            });
        }).catch((error) => { console.log("Failed to retrieve products"); });
}
