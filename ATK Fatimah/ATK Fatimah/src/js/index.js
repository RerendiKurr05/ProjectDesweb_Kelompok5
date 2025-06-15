document.addEventListener("DOMContentLoaded", function () {
  // function setupToggleButton() {
  //   const mobileMenu = document.querySelector("header nav .mobile-menu");
  //   const menu = document.querySelector("header nav .menu");
  //   mobileMenu.addEventListener("click", function () {
  //     menu.classList.toggle("show");
  //   });
  //   // Remove class kalau diklik diluar
  //   document.addEventListener("click", function (event) {
  //     if (!menu.contains(event.target) && !mobileMenu.contains(event.target)) {
  //       menu.classList.remove("show");
  //     }
  //   });
  // }
});

// Hero button smooth scroll to #recent
window.addEventListener("DOMContentLoaded", (event) => {
  document
    .querySelector("#hero .text .button")
    .addEventListener("click", function () {
      var targetElement = document.querySelector("#best");
      var targetOffset = targetElement.offsetTop - 60;
      window.scrollTo({
        top: targetOffset,
        behavior: "smooth",
      });
    });
});

// Testimonial Slider

var testimonials = document.querySelectorAll(".testimonial");
var navigationContainer = document.querySelector(".navigation");
var currentIndex = 0;
function showTestimonial(index) {
  var navigationButtons = navigationContainer.querySelectorAll("button");
  navigationButtons.forEach(function (button) {
    button.classList.remove("active");
  });
  navigationButtons[index].classList.add("active");
  var testimonialContainer = document.querySelector(".slider-container");
  testimonialContainer.style.transform = "translateX(-" + index * 100 + "%)";
}
function nextTestimonial() {
  currentIndex++;
  if (currentIndex >= testimonials.length) {
    currentIndex = 0;
  }
  showTestimonial(currentIndex);
}
var autoplayInterval = setInterval(nextTestimonial, 3000);
testimonials.forEach(function (testimonial, index) {
  var button = document.createElement("button");
  button.addEventListener("click", function () {
    clearInterval(autoplayInterval);
    currentIndex = index;
    showTestimonial(index);
  });
  navigationContainer.appendChild(button);
});
showTestimonial(currentIndex);

fetch("./menu.html", { mode: "no-cors" })
  .then((response) => response.text())
  .then((data) => {
    const menuWrapElement = new DOMParser()
      .parseFromString(data, "text/html")
      .querySelector(".menu-wrap");
    const bestProductElements = Array.from(
      menuWrapElement.querySelectorAll(".product.best")
    );
    const indexContainer = document.getElementById("index-container");
    bestProductElements.forEach((product) => {
      indexContainer.appendChild(product);
    });
  });

setTimeout(() => {
  const scriptElement = document.createElement("script");
  scriptElement.src = "./src/js/menu.js";
  document.body.appendChild(scriptElement);
}, 5000);

// Data pembeli
const pembeli = {
  nama: "Nama Pembeli",
  waktuAmbil: "15.00 WIB", // Atur sesuai kebutuhan dinamis jika mau
};

// Fungsi buat WhatsApp link dengan pesan otomatis
function buatLinkWhatsApp(jenisPembayaran) {
  const nomor = "6283833349662";
  const totalHargaElem = document.getElementById("total-price");
  // BUG: If #total-price does not exist, .innerText will throw error
  // FIX: Check if totalHargaElem exists before accessing innerText
  const totalHarga = totalHargaElem ? totalHargaElem.innerText : "Rp 0";
  const pesan = `Halo, saya ingin melakukan pemesanan.%0A%0ANama: ${pembeli.nama}%0AJam: ${pembeli.waktuAmbil}%0AHarga Total: ${totalHarga}%0AJenis Pembayaran: ${jenisPembayaran}`;
  return `https://wa.me/${nomor}?text=${pesan}`;
}

// Event ketika link diklik
document.addEventListener("DOMContentLoaded", function () {
  const tunaiLink = document.getElementById("tunai-link");
  const qrisLink = document.getElementById("qris-link");

  // BUG: If these elements do not exist, addEventListener will throw error
  // FIX: Check if elements exist before adding event listeners
  if (tunaiLink) {
    tunaiLink.addEventListener("click", function (e) {
      this.href = buatLinkWhatsApp("Tunai");
    });
  }
  if (qrisLink) {
    qrisLink.addEventListener("click", function (e) {
      this.href = buatLinkWhatsApp("QRIS");
    });
  }
});