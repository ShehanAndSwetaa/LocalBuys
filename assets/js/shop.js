let products = {};
let cart = {};
let filters = {
    priceRange: {
        left: 0,
        right: 100
    },
    categories: new Set()
}

function addToCart(product_id, product_name) {
    if (product_id in cart) {
        cart[product_id].quantity += 1;
    } else {
        cart[product_id] = {
            quantity: 1,
            name: product_name
        }
    }
}

function toggleCategory(checkbox, category) {
    if (checkbox.checked) {
        filters.categories.add(category);
    } else {
        filters.categories.delete(category);
    }
    renderProducts();
}

function createProductCard(product_id, product) {
    // Construct card content
    return `
          <div class="col-md-4">
            <div class="card card-product card-plain no-shadow" data-colored-shadow="false">
              <div class="card-header card-header-image product-image-holder">
                <img src="${product.image}" alt="Product Image" class="product-image">
              </div>
              <div class="card-body">
                <a href="#">
                  <h4 class="card-title">${product.name}</h4>
                </a>
                <p class="description business-name">
                  ${product.business.name}
                </p>
              </div>
              <div class="card-footer justify-content-between">
                <div class="price-container">
                  <span class="price">$${product.price}</span>
                </div>
                <button class="btn btn-rose btn-link btn-fab btn-fab-mini btn-round pull-right"
                        rel="tooltip" title="" data-placement="left" data-original-title="Add to cart"
                        onclick="addToCart('${product_id}', '${product.name}')">
                  <i class="material-icons">add_shopping_cart</i>
                </button>
              </div>
            </div> <!-- end card -->
          </div>
  `;
}

function main() {
    getProducts().then((p) => {
        Object.assign(products, p);
        renderProducts();
    }).catch((err) => console.log("Failed to retrieve products"));
    
    let slider = document.getElementById('priceRange');
    
    noUiSlider.create(slider, {
        start: [filters.priceRange.left, filters.priceRange.right],
        connect: true,
        range: {
            'min': [0],
            'max': [100]
        }
    });
    
    let limitFieldMin = document.getElementById('price-left');
    let limitFieldMax = document.getElementById('price-right');
    
    slider.noUiSlider.on('update', function(values, handle) {
        if (handle) {
            limitFieldMax.innerHTML = $('#price-right').data('currency') + Math.round(values[handle]);
            filters.priceRange.right = Math.round(values[handle]);
        } else {
            limitFieldMin.innerHTML = $('#price-left').data('currency') + Math.round(values[handle]);
            filters.priceRange.left = Math.round(values[handle]);
        }
        renderProducts();
    });
}

function inCategories(product) {
    if (filters.categories.size === 0) { return true; }
    return filters.categories.has(product.category);
}

function inPriceRange(product) {
    return (filters.priceRange.left <= product.price && product.price <= filters.priceRange.right);
}

function filterProducts(products) {
    let filtered = {};
    for (const product_id in products) {
        const product = products[product_id];
        if (inCategories(product) && inPriceRange(product)) {
            filtered[product_id] = product;
        }
    }
    return filtered;
}

function renderProducts() {
    if (products && Object.keys(products).length > 0) {
        const container = document.getElementById('product-listings');
        container.innerHTML = "";
        for (const product_id in filterProducts(products)) {
            container.innerHTML += createProductCard(product_id, products[product_id]);
        }
    }
}

$(document).ready(function(){
    main();
});
