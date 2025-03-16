const products = [
    { id: 1, name: "Smartphone", price: 45000, image: "smartphone.jpg", description: "High-end smartphone with advanced features." },
    { id: 2, name: "Laptop", price: 59000, image: "laptop.jpg", description: "Powerful laptop for work and entertainment." },
    { id: 3, name: "Headphones", price: 999, image: "headphone.jpg", description: "Wireless headphones with noise cancellation." },
    { id: 4, name: "Smartwatch", price: 1990, image: "smartwatch.jpg", description: "Fitness tracker and smartwatch in one." },
    { id: 5, name: "Charger", price: 250, image: "charger.jpg", description: "Fast charging compatible with multiple devices." },
    { id: 6, name: "Tablet", price: 35000, image: "tablet.jpg", description: "Versatile tablet for work and entertainment." },
    { id: 7, name: "Camera", price: 75000, image: "camera.jpg", description: "Professional-grade camera for stunning photos." },
    { id: 8, name: "Smart Speaker", price: 4990, image: "speaker.jpg", description: "Voice-controlled smart speaker for your home." },
    
    { id: 8, name: "Shoes", price: 500, image: "shoes.jpg", description: "Colored shoes for wear." },
    { id: 8, name: "Shirt", price: 490, image: "shirt.jpg", description: "Max shirt for men." },
    { id: 8, name: "Pant", price: 670, image: "pant.jpg", description: "Max pants for men." }
];

let cart = [];

function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.onclick = () => showProductDetails(product);

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;

    const name = document.createElement('h3');
    name.textContent = product.name;

    const price = document.createElement('p');
    price.textContent = `₹${product.price}`;

    const button = document.createElement('button');
    button.textContent = 'Add to Cart';
    button.onclick = (e) => {
        e.stopPropagation();
        addToCart(product);
    };

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(button);

    return card;
}

function displayProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    products.forEach(product => {
        const card = createProductCard(product);
        productGrid.appendChild(card);
    });
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
    }
    updateCartCount();
    showCart();
}

// Add this function to script.js
function showCart() {
    const modal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <p>${item.name} - Quantity: ${item.quantity} - ₹${item.price * item.quantity}
            <button onclick="removeFromCart(${item.id})">Remove</button></p>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotal.innerHTML = `
        <span>Total: ₹${total}</span>
        <button id="buyNowBtn" onclick="checkout()">Buy Now</button>
    `;
    modal.style.display = 'block';
}

function checkout() {
    // Store cart data in localStorage
    localStorage.setItem('cartData', JSON.stringify(cart));
    localStorage.setItem('cartTotal', document.getElementById('cartTotal').querySelector('span').textContent);
    
    // Redirect to confirmation page
    window.location.href = 'confirmation.html';
}

function showProductDetails(product) {
    const modal = document.getElementById('productModal');
    const productDetails = document.getElementById('productDetails');
    
    productDetails.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Price: ₹${product.price}</p>
        <button onclick="addToCart({id: ${product.id}, name: '${product.name}', price: ${product.price}, image: '${product.image}'})">Add to Cart</button>
    `;
    
    modal.style.display = 'block';
}

function searchProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchInput) ||
        product.description.toLowerCase().includes(searchInput)
    );
    
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        productGrid.appendChild(card);
    });
}

document.getElementById('cartLink').addEventListener('click', (e) => {
    e.preventDefault();
    showCart();
});

document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        document.getElementById('cartModal').style.display = 'none';
        document.getElementById('productModal').style.display = 'none';
    });
});

document.getElementById('homeLink').addEventListener('click', (e) => {
    e.preventDefault();
    displayProducts();
    document.getElementById('searchInput').value = '';
});


window.addEventListener('click', (event) => {
    if (event.target == document.getElementById('cartModal') || event.target == document.getElementById('productModal')) {
        document.getElementById('cartModal').style.display = 'none';
        document.getElementById('productModal').style.display = 'none';
    }
});

displayProducts();