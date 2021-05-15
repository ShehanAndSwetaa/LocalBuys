const BUSINESS_KEY = "business";

class Business {
    constructor() {
        this._name = "";
        this._email = 0;
        this._address = 0;
    }
    
    get name() {
        return this._name;
    }
    
    set name(value) {
        this._name = value;
    }
    
    get email() {
        return this._email;
    }
    
    set email(value) {
        this._email = value;
    }
    
    get address() {
        return this._address;
    }
    
    set address(value) {
        this._address = value;
    }
    
    get json() {
        return {
            "name" : this.name,
            "email" : this.email,
            "address": this.address,
        };
    }
    
    join() {
        window.localStorage.setItem(BUSINESS_KEY, JSON.stringify(this.json));
        addBusiness(this.json)
            .then(() => {
                console.log("Added business: ", this);
                // call main again to show Product Form
                main();
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }
}

class Product {
    constructor(business) {
        this._business = business;
        this._name = "";
        this._category = "";
        this._price = 0;
        this._inventory = 0;
        this._image = "";
    }
    
    get business() {
        return this._business;
    }
    
    get name() {
        return this._name;
    }
    
    set name(value) {
        this._name = value;
    }
    
    get category() {
        return this._category;
    }
    
    set category(value) {
        this._category = value;
    }
    
    get price() {
        return this._price;
    }
    
    set price(value) {
        this._price = value;
    }
    
    get inventory() {
        return this._inventory;
    }
    
    set inventory(value) {
        this._inventory = value;
    }
    
    get image() {
        return this._image;
    }
    
    set image(value) {
        this._image = value;
    }
    
    get json() {
        return {
            "name" : this.name,
            "category" : this.category,
            "price" : this.price,
            "inventory": this.inventory,
            "image": this.image
        };
    }
    
    upload() {
        console.log(this._business);
        console.log("Uploading product");
        console.log(this.json);
    
        addProduct(this.business, this.json)
            .then(() => {
                console.log("Added product: ", this);
                // call main again to show Product Form
                main();
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }
}

function getBusiness() {
    let business = window.localStorage.getItem(BUSINESS_KEY);
    if (business !== null) {
        business = JSON.parse(business);
        if (business["name"]) {
            return business;
        }
    }
    return false;
}

function toggleView(show, hide) {
    show.style.display = "block";
    hide.style.display = "none";
}

function main() {
    const business = getBusiness();
    const businessHeader = document.getElementById('business_header');
    const businessForm = document.getElementById('business_form');
    const productForm = document.getElementById('product_form');
    
    console.log(business);
    
    if (business) {
        console.log("Product Form");
        businessHeader.innerText = `Welcome ${business.name}`;
        toggleView(productForm, businessForm);
        const form = document.getElementById('product-form');
    
        const nameInput = document.getElementById('product_name');
        const categoryInput = document.getElementById('product_category');
        const priceInput = document.getElementById('product_price');
        const inventoryInput = document.getElementById('product_inventory');
        const uploadButton = document.getElementById('upload_product');
        
        uploadButton.onclick = () => {
            let product = new Product(business);
            product.name = nameInput.value;
            product.category = categoryInput.value;
            product.price = priceInput.value;
            product.inventory = inventoryInput.value;
            const images = $('.fileinput').fileinput()[0].getElementsByTagName('img');
            product.image = images[images.length - 1].src;
            // upload product
            product.upload();
            // clear form
            form.reset();
        };
    } else {
        console.log("Business Form");
        businessHeader.innerText = "Join Local Buys";
        toggleView(businessForm, productForm);
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const addressInput = document.getElementById('address');
        const joinButton = document.getElementById('join');
    
        joinButton.onclick = () => {
            let business = new Business();
            business.name = nameInput.value;
            business.email = emailInput.value;
            business.address = addressInput.value;
            business.join();
        };
    }
}


$(document).ready(function(){
    main();
});
