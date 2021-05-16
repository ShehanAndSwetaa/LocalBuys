const BUSINESS_KEY = "business";
const INFO = "info";
const ERROR = "error";

function clearBusiness() {
    window.localStorage.clear();
    // call main to load business form
    main();
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
    
    if (business) {
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
            if (product.isValid()) {
                // upload product
                addProduct(product.business, product.json)
                    .then(() => {
                        showToast(INFO, `Added ${product.name} successfully!`);
                        // call main again to show Product Form
                        main();
                        // clear form
                        form.reset();
                        // category dropdown maintains same category for ease of input
                        categoryInput.value = product.category;
                    })
                    .catch((error) => {
                        showToast(ERROR, `Failed to add ${product.name}`);
                    });
            } else {
                showToast(ERROR, `One or more product fields are invalid`);
            }
        };
    } else {
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
            window.localStorage.setItem(BUSINESS_KEY, JSON.stringify(business.json));
            addBusiness(business.json)
                .then(() => {
                    showToast(INFO, `${business.name} successfully joined Local Buys!`);
                    // call main again to show Product Form
                    main();
                })
                .catch((error) => {
                    showToast(ERROR, `Failed to join Local Buys`);
                });
        };
    }
}

let numToasts = 0;
function showToast(type, message) {
    let icon = "info_outline";
    if (type === ERROR) {
        icon = "error_outline";
    }
    const snackbar = document.getElementById("snackbar");
    const toastContent = document.getElementById("toast-content");
    toastContent.innerHTML = `
      <div class="alert-icon">
        <i class="material-icons">${icon}</i>
      </div>
      ${message}
    `;
    snackbar.className = "show";
    numToasts += 1;
    setTimeout(function() {
        numToasts -= 1;
        if (numToasts === 0) {
            snackbar.className = snackbar.className.replace("show", "");
        }
    }, 3000);
}

$(document).ready(function(){
    main();
});
