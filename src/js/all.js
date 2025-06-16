document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  const mobileNav = document.querySelector(".mobile-nav");
  const headerNav = document.querySelector("header nav");
  if (mobileNav && headerNav) {
    mobileNav.addEventListener("click", () => {
      headerNav.classList.toggle("show");
    });
  }

  // Cart count update
  function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      cartCount.textContent = cartItems.length;
    }
  }
  updateCartCount();

  // Cart modal logic
  const cartButton = document.querySelector(".cart-button");
  const modal = document.getElementById("cartModal");
  const closeButton = document.querySelector(".close");

  if (cartButton && modal) {
    cartButton.addEventListener("click", displayCartModal);
  }
  if (closeButton && modal) {
    closeButton.addEventListener("click", closeModal);
  }

  // Dropdown logic
  const dropbtn = document.getElementById("dropbtn");
  const dropdownContent = document.getElementById("dropdown-content");
  if (dropbtn && dropdownContent) {
    dropbtn.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdownContent.style.display = "block";
    });

    dropdownContent.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        dropbtn.textContent = event.target.getAttribute("data-value") || dropbtn.textContent;
        dropdownContent.style.display = "none";
      }
    });

    // Close the dropdown if the user clicks outside of it
    window.addEventListener("click", function (event) {
      if (!event.target.matches("#dropbtn")) {
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        }
      }
    });
  }
});

function displayCartModal() {
  const totalPriceElement = document.getElementById("total-price");
  const cartItemsData = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  let totalPriceAllItems = 0;

  // Clear previous content
  cartItemsContainer.innerHTML = "";

  // Loop through cart items data and display them
  cartItemsData.forEach((item, index) => {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");

    // Create container for item details
    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("item-details");

    // Create container for item image
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("item-image");
    const itemImage = document.createElement("img");
    itemImage.src = item.image;
    imageContainer.appendChild(itemImage);

    const itemText = document.createElement("div");
    itemText.classList.add("item");

    // Create item name element
    const itemName = document.createElement("h5");
    itemName.textContent = item.name;

    const itemDescription = document.createElement("div");
    itemDescription.classList.add("item-description");

    // Create item price element
    const itemPrice = document.createElement("p");
    itemPrice.textContent = item.price;
    itemPrice.classList.add(`item-price-${index}`);
    itemPrice.setAttribute("value", item.originalPrice);

    itemText.appendChild(itemName);
    itemText.appendChild(itemDescription);
    itemText.appendChild(itemPrice);

    // Append name and price to details container
    detailsContainer.appendChild(imageContainer);
    detailsContainer.appendChild(itemText);

    // Create container for buttons (delete, increase, decrease)
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Create delete button
    const deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-container");
    deleteContainer.onclick = () => {
      deleteCartItem(index);
    };

    const deleteButton = document.createElement("i");
    deleteButton.classList.add("fas", "fa-trash");

    deleteContainer.appendChild(deleteButton);

    const quantity = document.createElement("div");
    quantity.classList.add("item-quantity");

    // Create elements for minus button
    const minusButton = document.createElement("div");
    minusButton.classList.add("minus");
    minusButton.dataset.itemName = item.name;
    minusButton.innerHTML = '<i class="fas fa-minus"></i>';

    // Create element for input field
    const inputField = document.createElement("div");
    inputField.classList.add("value");
    const inputElement = document.createElement("input");
    inputElement.id = `product-amount-${index}`;
    inputElement.value = item.quantity || 1;
    inputField.appendChild(inputElement);

    // Create elements for plus button
    const plusButton = document.createElement("div");
    plusButton.classList.add("plus");
    plusButton.dataset.itemName = item.name;
    plusButton.innerHTML = '<i class="fas fa-plus"></i>';

    // --- BUG FIX: Bind the correct index for increase/decrease functions ---
    minusButton.onclick = () => {
      decreaseValue(index);
    };
    plusButton.onclick = () => {
      increaseValue(index);
    };

    function decreaseValue(idx) {
      const inputElement = document.getElementById(`product-amount-${idx}`);
      let currentValue = parseInt(inputElement.value);
      if (currentValue > 1) {
        currentValue--;
        inputElement.value = currentValue;
        cartItemsData[idx].quantity = currentValue;
        updatePrice(idx, currentValue);
      }
    }

    function increaseValue(idx) {
      const inputElement = document.getElementById(`product-amount-${idx}`);
      let currentValue = parseInt(inputElement.value);
      currentValue++;
      inputElement.value = currentValue;
      cartItemsData[idx].quantity = currentValue;
      updatePrice(idx, currentValue);
    }

    function updatePrice(idx, quantity) {
      const priceElement = document.querySelector(`.item-price-${idx}`);
      const price = parseInt(priceElement.getAttribute("value"));
      const totalPrice = price * quantity;
      priceElement.textContent = "Rp " + totalPrice.toLocaleString("id-ID");
      cartItemsData[idx].price = "Rp " + totalPrice.toLocaleString("id-ID");
      cartItemsData[idx].quantity = quantity;
      localStorage.setItem("cartItems", JSON.stringify(cartItemsData));
      updateTotalPrice();
    }

    function updateTotalPrice() {
      totalPriceAllItems = cartItemsData.reduce((total, item) => {
        return total + item.originalPrice * item.quantity;
      }, 0);
      totalPriceElement.textContent =
        "Rp " + totalPriceAllItems.toLocaleString("id-ID");
    }

    // Append the elements to the quantity container
    quantity.appendChild(minusButton);
    quantity.appendChild(inputField);
    quantity.appendChild(plusButton);

    // Append buttons to button container
    buttonContainer.appendChild(quantity);
    buttonContainer.appendChild(deleteContainer);

    // Append image, details and buttons to item container
    itemContainer.appendChild(detailsContainer);
    itemContainer.appendChild(buttonContainer);

    // Append item container to cart items container
    cartItemsContainer.appendChild(itemContainer);

    totalPriceAllItems +=
      parseInt(item.originalPrice) * parseInt(item.quantity);
  });

  totalPriceElement.setAttribute("value", totalPriceAllItems);
  totalPriceElement.textContent =
    "Rp " + totalPriceAllItems.toLocaleString("id-ID");
  // Open the modal
  openModal();
}

function deleteCartItem(index) {
  // Retrieve the cart items from localStorage
  const cartItemsData = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Remove the item at the specified index
  cartItemsData.splice(index, 1);

  // Update the cart items in localStorage
  localStorage.setItem("cartItems", JSON.stringify(cartItemsData));

  // Re-render the cart items
  displayCartModal();
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById("cartModal");
  if (modal) modal.style.display = "none";
}
// Function to open the modal
function openModal() {
  const modal = document.getElementById("cartModal");
  if (modal) modal.style.display = "flex";
}