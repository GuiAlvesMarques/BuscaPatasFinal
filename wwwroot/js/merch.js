let iconCart = document.querySelector('.cart_icon');
let closeCart = document.querySelector('.closeCart');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCarHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.cart_icon span');

let listProducts = [];
let carts = [];

// Toggle cart visibility
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
document.querySelector('.checkOut').addEventListener('click', () => {
    window.location.href = 'checkout.html';
});


// Add product to the cart
const addToCart = (productName) => {
    let positionThisProductInCart = carts.findIndex(cart => cart.productName === productName);

    if (positionThisProductInCart === -1) {
        // Add new product to the cart
        carts.push({
            productName: productName,
            quantity: 1
        });
    } else {
        // Increment quantity if the product is already in the cart
        carts[positionThisProductInCart].quantity += 1;
    }

    // Update the cart display in the HTML
    addCartToHTML();
};

// Change the quantity of items in the cart
const changeQuantity = (productName, type) => {
    let positionThisProductInCart = carts.findIndex(cart => cart.productName === productName);

    if (positionThisProductInCart >= 0) {
        switch (type) {
            case 'plus':
                carts[positionThisProductInCart].quantity += 1;
                break;

            case 'minus':
                carts[positionThisProductInCart].quantity -= 1;
                // Remove the product if the quantity reaches zero
                if (carts[positionThisProductInCart].quantity <= 0) {
                    carts.splice(positionThisProductInCart, 1);
                }
                break;

            default:
                console.error("Invalid type for changeQuantity function");
        }

        // Update the cart display in the HTML
        addCartToHTML();
    }
};

const addCartToHTML = () => {
    listCarHTML.innerHTML = ''; // Clear existing cart content

    let totalQuantity = 0; // Initialize total quantity counter
    let totalCost = 0; // Initialize total cost counter

    if (carts.length > 0) {
        carts.forEach(cart => {
            // Update total quantity and total cost
            totalQuantity += cart.quantity;

            // Find product details in listProducts by matching the name
            let productInfo = listProducts.find(product => product.name === cart.productName);

            if (!productInfo) {
                console.error(`Product not found: ${cart.productName}`);
                return;
            }

            // Add the cost of the current product to the total cost
            totalCost += productInfo.price * cart.quantity;

            // Populate the cart item
            let newCart = document.createElement('div');
            newCart.classList.add('itemCart');
            newCart.innerHTML = `
                <div class="imageCart">
                    <img src="${productInfo.image}" alt="${productInfo.name}">
                </div>
                <div class="nameCart">
                    ${productInfo.name}
                </div>
                <div class="totalPrice">
                    ${productInfo.price * cart.quantity} €
                </div>
                <div class="quantityCart">
                    <span class="minus" data-name="${cart.productName}">-</span>
                    <span>${cart.quantity}</span>
                    <span class="plus" data-name="${cart.productName}">+</span>
                </div>
            `;

            // Append the new cart item to the cart container
            listCarHTML.appendChild(newCart);
        });

        // Add event listeners to dynamically created `+` and `-` buttons
        document.querySelectorAll('.plus').forEach(button => {
            button.addEventListener('click', (event) => {
                let productName = event.target.dataset.name;
                changeQuantity(productName, 'plus');
            });
        });

        document.querySelectorAll('.minus').forEach(button => {
            button.addEventListener('click', (event) => {
                let productName = event.target.dataset.name;
                changeQuantity(productName, 'minus');
            });
        });
    }

    // Update the cart icon span to display the total quantity
    iconCartSpan.textContent = totalQuantity;

    // Display the total cost above the buttons, ensuring it's only added once
    const cartContainer = document.querySelector('.btnCart'); // The container for the buttons
    let totalCostDiv = document.querySelector('.cartTotal'); // Check if totalCostDiv already exists

    if (!totalCostDiv) {
        totalCostDiv = document.createElement('div');
        totalCostDiv.classList.add('cartTotal');
        totalCostDiv.style.textAlign = 'center';
        totalCostDiv.style.marginBottom = '10px';
        cartContainer.parentElement.insertBefore(totalCostDiv, cartContainer);
    }

    // Update the total cost content
    totalCostDiv.innerHTML = `<h3>Total Cost: ${totalCost} €</h3>`;

    console.log("Total Quantity in Cart:", totalQuantity);
    console.log("Total Cost in Cart:", totalCost);
};



// Event listener for clicking on products
listProductHTML.addEventListener('click', (event) => {
    const positionClick = event.target;

    // Check if the clicked element is the buy button
    if (positionClick.classList.contains('buy-btn')) {
        const productElement = positionClick.closest('.product-item');
        if (productElement) {
            const productName = productElement.querySelector('.product__item__text h6 a').textContent.trim();
            addToCart(productName);
        } else {
            console.error("Product element not found!");
        }
    }
});

// Initialize the application
const initApp = () => {
    fetch('json/products.json') // Ensure you have the correct path to your JSON file
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            addDataToHTML(); // Populate products after fetching data
        })
        .catch(error => console.error("Error loading products:", error));
};


// Call initApp to start the application
initApp();

/*---------------------
  Checkout
-----------------------*/

document.getElementById('payment-options').addEventListener('change', function () {
    const selectedMethod = this.value;

    // Hide all payment forms
    document.querySelectorAll('.payment-form').forEach(form => form.classList.add('hidden'));

    // Show the selected payment form
    document.getElementById(`${selectedMethod}-form`).classList.remove('hidden');
});
