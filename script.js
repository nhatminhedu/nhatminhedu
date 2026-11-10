
/* =====================================
   GIÁO DỤC NHẬT MINH - JAVASCRIPT
   ===================================== */

document.addEventListener("DOMContentLoaded", function () {

    // 1. HIỂN THỊ NĂM HIỆN TẠI
    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 2. MENU ĐIỆN THOẠI
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("show");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }
        });

        // Đóng menu khi chọn liên kết
        navMenu.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {
                navMenu.classList.remove("show");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });

        });
    }

    // 3. ĐÁNH DẤU MENU ĐANG ĐƯỢC CHỌN
    const navLinks = document.querySelectorAll(
        '.nav-menu a[href^="#"]'
    );

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            link.classList.add("active");

        });

    });

    // 4. XỬ LÝ FORM ĐĂNG KÝ DEMO
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const fullName = document.getElementById("fullName").value.trim();
            const phone = document.getElementById("phone").value.trim();

            const phonePattern = /^[0-9+\s.-]{9,15}$/;

            if (!fullName) {
                alert("Vui lòng nhập họ và tên.");
                return;
            }

            if (!phonePattern.test(phone)) {
                alert("Vui lòng nhập số điện thoại hợp lệ.");
                return;
            }

            if (formMessage) {
                formMessage.textContent =
                    "Thông tin đã được kiểm tra. Đây là bản DEMO, hệ thống chưa kết nối cơ sở dữ liệu để lưu hồ sơ. Vui lòng gọi 0372 484 382 để được tư vấn.";

                formMessage.style.color = "#547c24";
            }

        });

    }

    // 5. HIỆU ỨNG CUỘN TRANG
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                history.replaceState(null, "", targetId);
            }

        });

    });

});
