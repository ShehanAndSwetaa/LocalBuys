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
    
    static fromJson(json) {
        let business = new Business();
        business.name = json.name;
        business.email = json.email;
        business.address = json.address;
        return business;
    }
}

class Product {
    constructor(business) {
        this._business = business;
        this._id = "";
        this._name = "";
        this._category = "";
        this._price = 0;
        this._inventory = 0;
        this._image = "";
    }
    
    get business() {
        return this._business;
    }
    
    get id() {
        return this._id;
    }
    
    set id(value) {
        this._id = value;
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
        return parseFloat(this._price);
    }
    
    set price(value) {
        this._price = parseFloat(value);
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
    
    isValid() {
        return (this.name !== "" && this.category !== "" && this.price >= 0 && this.inventory > 0 && this.image !== "");
    }
    
    
    static fromDoc(doc, business) {
        const json = doc.data();
        let product = new Product(business);
        product.id = doc.id;
        product.name = json.name;
        product.category = json.category;
        product.price = json.price;
        product.inventory = json.inventory;
        product.image = json.image;
        return product;
    }
}
