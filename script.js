let cart = [];
let cartCount = 0;

// Initialize the store
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  loadCart();
  showPage("home");

  // Add event listeners to navigation links
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const pageId = link.getAttribute("href").substring(1);
      showPage(pageId);
    });
  });
});

// Load products
function loadProducts() {
  const productGrid = document.getElementById("product-grid");
  productGrid.innerHTML = products
    .map(
      (product) => `
          <div class="product-card">
              <img src="${product.image}" alt="${
        product.name
      }" class="product-image">
              <div class="product-info">
                  <h3 class="product-title">${product.name}</h3>
                  <p class="product-price">$${product.price.toFixed(2)}</p>
                  <button class="add-to-cart" onclick="addToCart(${
                    product.id
                  })">Add to Cart</button>
              </div>
          </div>
      `
    )
    .join("");
}

// Add to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push(product);
    cartCount++;
    updateCart();
    alert(`${product.name} added to cart!`);
  }
}

// Remove from cart
function removeFromCart(productId) {
  const productIndex = cart.findIndex((p) => p.id === productId);
  if (productIndex !== -1) {
    cart.splice(productIndex, 1); 
    cartCount--;
    updateCart();
    alert("Product removed from cart!");
  }
}

// Update cart
function updateCart() {
  document.getElementById("cart-count").textContent = cartCount;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems();
}

// Render cart items
function renderCartItems() {
  const cartItems = document.getElementById("cart-items");
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `
    )
    .join("");
  document.getElementById("cart-total").textContent = total.toFixed(2);
}

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    cartCount = cart.length;
    updateCart();
  }
}

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    cartCount = cart.length;
    updateCart();
  }
}

function showPage(pageId) {
  document
    .querySelectorAll(".page")
    .forEach((page) => page.classList.remove("active"));

  const activePage = document.getElementById(pageId);
  activePage.classList.add("active");

  const headerHeight = document.querySelector("header").offsetHeight;

  const pageTop = activePage.getBoundingClientRect().top + window.pageYOffset;

  window.scrollTo({
    top: pageTop - headerHeight,
    behavior: "smooth",
  });
}

//Search products
function searchProducts() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  const productGrid = document.getElementById("product-grid");
  const products = document.querySelectorAll(".product-card");
  let found = false;

  products.forEach((product) => {
    const productName = product
      .querySelector(".product-title")
      .textContent.toLowerCase();
    if (productName.includes(searchInput)) {
      product.style.display = "block";

      found = true;
    } else {
      product.style.display = "none";
    }
  });


  // Show "No results" message
  const noResults = document.getElementById("no-results");
  if (!found) {
    if (!noResults) {
      const noResultsMsg = document.createElement("p");
      noResultsMsg.id = "no-results";
      noResultsMsg.textContent = "No products found.";
      productGrid.appendChild(noResultsMsg);
    }
  } else if (noResults) {
    noResults.remove();
  }
}

// Go to checkout
function goToCheckout() {
  showPage("checkout");
}

// Handle checkout form submission
document.getElementById("checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Order placed successfully!");
  cart = [];
  cartCount = 0;
  updateCart();
  showPage("home");
});
