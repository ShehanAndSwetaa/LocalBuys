const BUSINESS_KEY = "business";

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
            console.log(this.json);
            addProduct(product.business, product.json)
                .then(() => {
                    console.log("Added product: ", this);
                    // call main again to show Product Form
                    main();
                    // clear form
                    form.reset();
                    // TODO: show success message
                })
                .catch((error) => {
                    // TODO: display error message
                    console.error("Error adding document: ", error);
                });
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
            window.localStorage.setItem(BUSINESS_KEY, JSON.stringify(this.json));
            addBusiness(business.json)
                .then(() => {
                    console.log("Added business: ", this);
                    // call main again to show Product Form
                    main();
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        };
    }
}


$(document).ready(function(){
    main();
});
