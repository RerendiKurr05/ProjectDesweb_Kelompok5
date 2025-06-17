document.addEventListener("DOMContentLoaded", function () {
  function loadNavbar() {
    fetch("./src/components/navbar/navbar.html")
      .then((res) => res.text())
      .then((data) => {
        document.getElementById("navbar").innerHTML = data;
        addActiveClass();
        setupToggleButton();
        setupScrollBehavior();
      })
      .catch((err) => console.log("Error loading navbar:", err));
  }

  function addActiveClass() {
    const currentLocation = window.location.href;
    const navLinks = document.querySelectorAll("#navbar a");

    navLinks.forEach((link) => {
      if (link.href === currentLocation) {
        link.classList.add("active");
      }
    });
  }

  function setupToggleButton() {
    const mobileMenu = document.querySelector("header nav .mobile-menu");
    const menu = document.querySelector("header nav .menu");

    mobileMenu.addEventListener("click", () => menu.classList.toggle("show"));

    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !mobileMenu.contains(e.target)) {
        menu.classList.remove("show");
      }
    });
  }

  function setupScrollBehavior() {
    const header = document.querySelector("header");
    window.onscroll = function () {
      if (document.documentElement.scrollTop >= 200) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
  }

  loadNavbar();
});

const body = document.querySelector("body");

// Kategori Tabs
const tabHTML = `<p class="all">All Menu</p>${[...new Set([...document.querySelectorAll(".category")].map(c => `<p class="${c.textContent.toLowerCase().replace(" ", "")}">${c.textContent}</p>`))].join("")}`;
document.querySelector(".tab").innerHTML = tabHTML;

const products = document.querySelectorAll(".product");
products.forEach((product) => {
  const category = product.querySelector(".category").innerText.toLowerCase().replace(" ", "");
  product.classList.add(category);
});

// Search
function searchProducts() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toLowerCase();
  products.forEach(product => {
    const title = product.querySelector('h3').textContent.toLowerCase();
    product.style.display = title.includes(filter) ? '' : 'none';
  });
}

// Tabs
const tabs = document.querySelectorAll(".tab > p");
tabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    if (!this.classList.contains("active")) {
      const tabClass = this.className;
      tabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      products.forEach(product => {
        product.style.display = (tabClass === "all" || product.classList.contains(tabClass)) ? "block" : "none";
      });
    }
  });
});
tabs[0].classList.add("active");

products.forEach(product => {
  product.addEventListener("click", () => {
    const cloned = product.cloneNode(true);
    const popup = document.querySelector(".popup");
    const ov = document.querySelector(".overlay");
    popup.innerHTML = "";
    popup.appendChild(cloned);
    popup.classList.add("show");
    ov.classList.add("show");
    body.classList.add("ov");
    fadeIn(ov);
  });
});

function closePopup() {
  document.querySelector(".popup").classList.remove("show");
  document.querySelector(".overlay").classList.remove("show");
  fadeOut(document.querySelector(".overlay"));
  body.classList.remove("ov");
}

function appendHTML(selector, html) {
  document.querySelectorAll(selector).forEach(el => el.innerHTML += html);
}

function beforeHTML(selector, html) {
  document.querySelectorAll(selector).forEach(el => el.insertAdjacentHTML("beforebegin", html));
}

function showNotification(type = "success", title = "Berhasil", message = "Barang berhasil ditambahkan ke keranjang") {
  // Hapus notifikasi lama jika ada
  const existingNotif = document.querySelector(".modern-notification");
  if (existingNotif) {
    existingNotif.remove();
  }

  // Buat elemen notifikasi
  const notif = document.createElement("div");
  notif.className = `modern-notification ${type}`;

  notif.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">✔️</div>
      <div class="notification-text">
        <div class="notification-title">${title}</div>
        <div class="notification-message">${message}</div>
      </div>
      <button class="notification-close">&times;</button>
    </div>
  `;

  document.body.appendChild(notif);

  // Tampilkan notifikasi
  setTimeout(() => {
    notif.classList.add("show");
  }, 10);

  // Sembunyikan setelah 3 detik
  setTimeout(() => {
    notif.classList.remove("show");
    setTimeout(() => notif.remove(), 300);
  }, 3000);

  // Tombol close manual
  notif.querySelector(".notification-close").addEventListener("click", () => {
    notif.classList.remove("show");
    setTimeout(() => notif.remove(), 300);
  });
}


function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const total = cartItems.reduce((sum, item) => sum + parseInt(item.quantity), 0);
  const countEl = document.getElementById("cart-count");
  if (countEl) countEl.textContent = total;
}

//Fungsi untuk update item secara realtime
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let totalQuantity = 0;

  cartItems.forEach((item) => {
    totalQuantity += parseInt(item.quantity);
  });

  document.getElementById("cart-count").textContent = totalQuantity;
}
function addToCart() {
  const name = document.querySelector(".popup h3").textContent;
  const price = document.querySelector(".popup .price").textContent;
  const quantity = document.querySelector(".popup #product-amount").value;
  const image = document.querySelector(".popup .img img").src;
  const original = document.querySelector(".popup .price").getAttribute("value");
  const size = document.querySelector(".popup #hiddenSizeInput")?.value || "Regular";

  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.push({ name, price, image, quantity: parseInt(quantity), originalPrice: original, size });

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCartCount();
  
  closePopup();
  window.location.reload();
  
}

beforeHTML(".price", `
  <div class="amount">
    <span>Amount</span>
    <div class="number">
      <div class="minus" onclick="decreaseValue()"><i class="fas fa-minus"></i></div>
      <div class="value"><input id="product-amount" value="1"/></div>
      <div class="plus" onclick="increaseValue()"><i class="fas fa-plus"></i></div>
    </div>
  </div>`);

appendHTML(".product-wrap", `
  <div onclick="addToCart()" class="add"><span>Add to cart</span><i class="fas fa-cart-plus"></i></div>
  <div class="close-pop" onclick="closePopup()"><i class="fas fa-times"></i></div>`);

Array.from(document.getElementsByClassName("price")).forEach(e =>
  e.setAttribute("value", e.textContent.replace("Rp", "").replace(/\s/g, "").replace(/\./g, ""))
);

function decreaseValue() {
  const input = document.getElementById("product-amount");
  let val = parseInt(input.value);
  if (val > 1) {
    input.value = --val;
    updatePrice(val);
  }
}

function increaseValue() {
  const input = document.getElementById("product-amount");
  let val = parseInt(input.value);
  input.value = ++val;
  updatePrice(val);
}

function updateHiddenInput(id, val) {
  const input = document.getElementById(id);
  input.value = val;
  console.log(`Hidden input ${id} updated to:`, input.value);
}

function updatePrice(quantity) {
  const priceEl = document.querySelector(".price");
  const price = parseInt(priceEl.getAttribute("value"));
  const sizeSel = document.querySelector(".popup .size select");

  let multiplier = 1;
  if (sizeSel) {
    sizeSel.addEventListener("change", () => updatePrice(quantity));
    if (sizeSel.value === "Medium") multiplier = 1.25;
    else if (sizeSel.value === "Large") multiplier = 1.5;
  }

  const total = price * multiplier * quantity;
  priceEl.textContent = "Rp " + total.toLocaleString("id-ID");
  priceEl.setAttribute("priceValue", total);
}

function fadeOut(el) {
  el.style.opacity = 1;
  (function fade() {
    if ((el.style.opacity -= 0.08) < 0) el.style.display = "none";
    else requestAnimationFrame(fade);
  })();
}

function fadeIn(el, display = "block") {
  el.style.opacity = 0;
  el.style.display = display;
  (function fade() {
    let val = parseFloat(el.style.opacity);
    if (!((val += 0.08) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

function getDaftarBarang() {
  const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
  if (items.length === 0) return "Tidak ada barang";
  return items.map((item, i) => `${i + 1}. ${item.name} x${item.quantity} - ${item.price}`).join("%0A");
}

function hitungTotalHarga() {
  const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
  let total = 0;
  items.forEach(i => total += (parseInt(i.originalPrice) || 0) * (parseInt(i.quantity) || 0));
  return "Rp " + total.toLocaleString("id-ID");
}

function buatLinkWhatsApp(jenis) {
  const nomor = "6283833349662";
  const daftar = getDaftarBarang();
  const total = hitungTotalHarga();
  const pesan = `Halo, saya ingin melakukan pemesanan.%0A%0A*Nama :* %0A*Jam diambil :* %0A%0A*Barang yang dibeli :*%0A${daftar}%0A%0A*Harga total :* ${total}%0A*Pembayaran :* ${jenis}`;
  return `https://wa.me/${nomor}?text=${pesan}`;
}

document.addEventListener("DOMContentLoaded", () => {
  ["tunai-link", "qris-link"].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", e => {
        e.preventDefault();
        const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
        if (items.length === 0) {
          alert("Keranjang belanja kosong! Silakan tambahkan produk terlebih dahulu.");
          return;
        }
        const method = id === "tunai-link" ? "Tunai" : "QRIS";
        window.open(buatLinkWhatsApp(method), '_blank');
      });
    }
  });
});

showNotification("success", "Berhasil", "Produk telah masuk ke keranjang!");
window.onload = updateCartCount;
