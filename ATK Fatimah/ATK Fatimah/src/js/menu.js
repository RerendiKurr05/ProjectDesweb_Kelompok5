document.addEventListener("DOMContentLoaded", function () {
  // Function to load navbar HTML
  function loadNavbar() {
    fetch("./src/components/navbar/navbar.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("navbar").innerHTML = data;
        addActiveClass(); // Add active class to current page link
        setupToggleButton(); // Setup toggle button click event
        setupScrollBehavior(); // Setup scroll behavior
      })
      .catch((error) => console.log("Error loading navbar:", error));
  }

  // Function to add active class to current page link
  function addActiveClass() {
    var currentLocation = window.location.href;
    var navLinks = document.querySelectorAll("#navbar a");

    navLinks.forEach(function (link) {
      if (link.href === currentLocation) {
        link.classList.add("active");
      }
    });
  }

  function setupToggleButton() {
    const mobileMenu = document.querySelector("header nav .mobile-menu");
    const menu = document.querySelector("header nav .menu");
    mobileMenu.addEventListener("click", function () {
      menu.classList.toggle("show");
    });
    // Remove class kalau diklik diluar
    document.addEventListener("click", function (event) {
      if (!menu.contains(event.target) && !mobileMenu.contains(event.target)) {
        menu.classList.remove("show");
      }
    });
  }

  function setupScrollBehavior() {
    const header = document.querySelector("header");
    window.onscroll = function () {
      if (document.documentElement.scrollTop >= 200) {
        console.log("test");
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
  }

  // Load the navbar when the DOM is ready
  loadNavbar();
});

var body = document.querySelector("body");

document.querySelector(".tab").innerHTML = `<p class="all">All Menu</p>${[
  ...new Set(
    [...document.querySelectorAll(".category")].map(
      (c) =>
        `<p class="${c.textContent.toLowerCase().replace(" ", "")}">${c.textContent
        }</p>`
    )
  ),
].join("")}`;

const products = document.querySelectorAll(".product");

for (var i = 0; i < products.length; i++) {
  var product = products[i];
  var category = product.getElementsByClassName("category")[0];
  var categoryText = category.innerText.toLowerCase().replace(" ", "");
  product.classList.add(categoryText);
}

function searchProducts() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toLowerCase();
  const products = document.querySelectorAll('.product');

  products.forEach(product => {
    const title = product.querySelector('h3').textContent.toLowerCase();
    if (title.includes(filter)) {
      product.style.display = '';
    } else {
      product.style.display = 'none';
    }
  });
}

var tabs = document.querySelectorAll(".tab > p");

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    if (!this.classList.contains("active")) {
      var tabClass = this.className;
      tabs.forEach(function (tab) {
        tab.classList.remove("active");
      });
      this.classList.add("active");
      Array.from(products).forEach(function (product) {
        var productClass = product.classList;
        var shouldDisplay =
          tabClass === "all" || productClass.contains(tabClass);

        product.style.display = shouldDisplay ? "block" : "none";
      });
    }
  });
});

// Mengatur tab "All Menu" sebagai tab default yang aktif
tabs[0].classList.add("active");

products.forEach((product) => {
  product.addEventListener("click", () => {
    const clonedContent = product.cloneNode(true);
    const popup = document.querySelector(".popup");
    const ov = document.querySelector(".overlay");
    popup.innerHTML = "";
    popup.appendChild(clonedContent);
    popup.classList.add("show");
    ov.classList.add("show");
    body.classList.add("ov");
    fadeIn(document.querySelector(".overlay"));
  });
});

function closePopup() {
  document.querySelector(".popup").classList.remove("show");
  document.querySelector(".overlay").classList.remove("show");
  fadeOut(document.querySelector(".overlay"));
  body.classList.remove("ov");
}

function appendHTML(selector, html) {
  var elements = document.querySelectorAll(selector);
  elements.forEach(function (element) {
    element.innerHTML += html;
  });
}

function beforeHTML(selector, html) {
  var elements = document.querySelectorAll(selector);
  elements.forEach(function (element) {
    element.insertAdjacentHTML("beforebegin", html);
  });
}


// Function to create and show modern notification
function showNotification(title, message, type = 'success') {
  // Remove existing notification if any
  const existingNotification = document.querySelector('.modern-notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `modern-notification ${type}`;
  
  // Set notification content
  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">
        ${type === 'success' ? '🛒' : '⚠️'}
      </div>
      <div class="notification-text">
        <div class="notification-title">${title}</div>
        <div class="notification-message">${message}</div>
      </div>
      <button class="notification-close" onclick="closeNotification()">×</button>
    </div>
  `;

  // Add notification to body
  document.body.appendChild(notification);

  // Show notification with animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  // Auto hide after 4 seconds
  setTimeout(() => {
    closeNotification();
  }, 4000);
}

// Function to close notification
function closeNotification() {
  const notification = document.querySelector('.modern-notification');
  if (notification) {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }
}

// Modified addToCart function with modern notification
function addToCart() {
  const productName = document.querySelector(".popup h3").textContent;
  const productPrice = document.querySelector(".popup .price").textContent;
  const productQuantity = document.querySelector(
    ".popup #product-amount"
  ).value;
  const productImage = document
    .querySelector(".popup .img img")
    .getAttribute("src");
  const originalPrice = document
    .querySelector(".popup .price")
    .getAttribute("value");

  // Initialize cartItems as an empty array
  let cartItems = [];

  // Retrieve existing cart items from localStorage
  const existingCartItems = localStorage.getItem("cartItems");

  if (existingCartItems) {
    // Parse the existing cart items from localStorage
    cartItems = JSON.parse(existingCartItems);
  }

  // Add the new product data to the existing cart items
  const newProductData = {
    name: productName,
    price: productPrice,
    image: productImage,
    quantity: productQuantity,
    originalPrice: originalPrice,
  };
  cartItems.push(newProductData);

  // Save the updated cart items back to localStorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // Show modern notification instead of alert
  showNotification("Berhasil!", "Produk ditambahkan ke keranjang");
  closePopup();
}

beforeHTML(
  ".price",
  `
  <div class="amount">
      <span>Amount</span>
      <div class="number">
        <div class="minus" onclick="decreaseValue()"><i class="fas fa-minus"></i></div>
        <div class="value"><input id="product-amount" value="1"/></div>
        <div class="plus" onclick="increaseValue()"><i class="fas fa-plus"></i></div>
      </div>
  </div>
`
);

appendHTML(
  ".product-wrap",
  `
  <div onclick="addToCart()" class="add"><span>Add to cart</span><i class="fas fa-cart-plus"></i></div>
  <div class="close-pop" onclick="closePopup()"><i class="fas fa-times"></i></div>
`
);

appendHTML(
  ".product-wrap .size",
  `
  <span>Size</span>
  <select class="fixed" onchange="stillValue(); updateHiddenInput('hiddenSizeInput', this.value)">
      <option selected=''>Regular</option>
      <option>Medium</option>
      <option>Large</option>
  </select>
  <input name="size" type="hidden" id="hiddenSizeInput" value="Regular" />
`
);

appendHTML(
  ".product-wrap .type",
  `
  <span>Ice</span>
  <select class="fixed" onchange="stillValue(); updateHiddenInput('hiddenTypeInput', this.value)">
      <option>Less</option>
      <option selected>Normal</option>
      <option>Extra</option>
  </select>
  <input name="type" type="hidden" id="hiddenTypeInput" value="Normal" />

`
);


Array.from(document.getElementsByClassName("price")).forEach((e) =>
  e.setAttribute(
    "value",
    e.textContent.replace("Rp", "").replace(/\s/g, "").replace(/\./g, "")
  )
);

function decreaseValue() {
  const inputElement = document.getElementById("product-amount");
  let currentValue = parseInt(inputElement.value);
  if (currentValue > 1) {
    currentValue--;
    inputElement.value = currentValue;
    updatePrice(currentValue);
  }
}

function increaseValue() {
  const inputElement = document.getElementById("product-amount");
  let currentValue = parseInt(inputElement.value);
  currentValue++;
  inputElement.value = currentValue;
  updatePrice(currentValue);
}

function stillValue() {
  const inputElement = document.getElementById("product-amount");
  let currentValue = parseInt(inputElement.value);
  inputElement.value = currentValue;
  updatePrice(currentValue);
}

// Function to update the hidden input based on the selected option
function updateHiddenInput(inputId, value) {
  const hiddenInput = document.getElementById(inputId);
  hiddenInput.value = value;
  console.log(`Hidden input ${inputId} updated to:`, hiddenInput.value);
}

function updatePrice(quantity) {
  const priceElement = document.querySelector(".price");
  const price = parseInt(priceElement.getAttribute("value"));
  const sizeSelect = document.querySelector(".popup .size select");
  if (sizeSelect) {
    const calculateTotalPrice = () => {
      let multiplier = 1;
      if (sizeSelect && sizeSelect.value === "Medium") {
        multiplier = 1.25;
      } else if (sizeSelect && sizeSelect.value === "Large") {
        multiplier = 1.5;
      }
      const totalPrice = (price * multiplier) * quantity;
      priceElement.textContent = "Rp " + totalPrice.toLocaleString("id-ID");
      priceElement.setAttribute("priceValue", totalPrice);

    };
    sizeSelect.addEventListener("change", calculateTotalPrice);
    calculateTotalPrice();
  } else {
    const totalPrice = price * quantity;
    priceElement.textContent = "Rp " + totalPrice.toLocaleString("id-ID");
    priceElement.setAttribute("priceValue", totalPrice);
    // priceElement.setAttribute("value", totalPrice);
  }
}

function fadeOut(el) {
  el.style.opacity = 1;
  (function fade() {
    if ((el.style.opacity -= 0.08) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

function fadeIn(el, display) {
  el.style.opacity = 0;
  el.style.display = display || "block";
  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += 0.08) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

// Fungsi untuk mendapatkan daftar barang dari cart
function getDaftarBarang() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  if (cartItems.length === 0) {
    return "Tidak ada barang";
  }
  
  return cartItems.map((item, index) => {
    return `${index + 1}. ${item.name} x${item.quantity} - ${item.price}`;
  }).join("%0A");
}

// Fungsi untuk menghitung total harga dari cart
function hitungTotalHarga() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  let total = 0;
  
  cartItems.forEach(item => {
    // Ambil harga dari string dan convert ke number
    const harga = parseInt(item.originalPrice) || 0;
    const quantity = parseInt(item.quantity) || 0;
    total += harga * quantity;
  });
  
  return "Rp " + total.toLocaleString("id-ID");
}

// Fungsi buat WhatsApp link dengan pesan otomatis - UPDATED
function buatLinkWhatsApp(jenisPembayaran) {
  const nomor = "6283833349662"; // Ganti dengan nomor WhatsApp Anda
  
  // Ambil data dari cart
  const daftarBarang = getDaftarBarang();
  const totalHarga = hitungTotalHarga();
  
  // Format pesan WhatsApp
  const pesan = `Halo, saya ingin melakukan pemesanan.%0A%0A` +
               `*Nama :* %0A` +
               `*Jam diambil :* %0A%0A` +
               `*Barang yang dibeli :*%0A${daftarBarang}%0A%0A` +
               `*Harga total :* ${totalHarga}%0A` +
               `*Pembayaran :* ${jenisPembayaran}`;
  
  return `https://wa.me/${nomor}?text=${pesan}`;
}

// Event listeners untuk tombol pembayaran
document.addEventListener("DOMContentLoaded", function () {
  const tunaiLink = document.getElementById("tunai-link");
  const qrisLink = document.getElementById("qris-link");

  if (tunaiLink) {
    tunaiLink.addEventListener("click", function (e) {
      e.preventDefault();
      
      // Cek apakah ada barang di cart
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      if (cartItems.length === 0) {
        alert("Keranjang belanja kosong! Silakan tambahkan produk terlebih dahulu.");
        return;
      }
      
      // Redirect ke WhatsApp
      const whatsappUrl = buatLinkWhatsApp("Tunai");
      window.open(whatsappUrl, '_blank');
      
      // Optional: Clear cart setelah redirect
      // localStorage.removeItem("cartItems");
    });
  }
  
  if (qrisLink) {
    qrisLink.addEventListener("click", function (e) {
      e.preventDefault();
      
      // Cek apakah ada barang di cart
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      if (cartItems.length === 0) {
        alert("Keranjang belanja kosong! Silakan tambahkan produk terlebih dahulu.");
        return;
      }
      
      // Redirect ke WhatsApp
      const whatsappUrl = buatLinkWhatsApp("QRIS");
      window.open(whatsappUrl, '_blank');
      
      // Optional: Clear cart setelah redirect
      // localStorage.removeItem("cartItems");
    });
  }
});