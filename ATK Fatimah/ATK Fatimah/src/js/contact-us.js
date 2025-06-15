document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.querySelector('button.submit');
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault(); // BUG FIX: Prevent form submission/reload

            const nameInput = document.querySelector('.name input');
            const emailInput = document.querySelector('.email input');
            const msgInput = document.querySelector('.msg textarea');

            // BUG FIX: Check if elements exist before accessing value
            if (!nameInput || !emailInput || !msgInput) return;

            const name = encodeURIComponent(nameInput.value);
            const email = encodeURIComponent(emailInput.value);
            const text = encodeURIComponent(msgInput.value);

            // BUG FIX: Remove extra comma and duplicate name in message
            const message = `Hallo, Toko ATK Fatimah! Saya ${name}.%0A%0A${text}%0A%0A${email}`;
            const url = `https://api.whatsapp.com/send?phone=6283833349662&text=${message}`;
            window.open(url, '_blank');
        });
    }
});