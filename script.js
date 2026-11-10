
/* =========================================
   NHAT MINH EDU
   File: script.js
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // 1. MENU DI DONG
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {
            mainNav.classList.toggle("active");

            const isOpen = mainNav.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        // Dong menu sau khi chon mot muc
        const navLinks = mainNav.querySelectorAll("a");

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                mainNav.classList.remove("active");
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }


    // 2. CAP NHAT NAM TU DONG
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // 3. TRA CUU HO SO DEMO
    const lookupForm = document.getElementById("lookupForm");
    const lookupCode = document.getElementById("lookupCode");
    const lookupMessage = document.getElementById("lookupMessage");

    if (lookupForm) {

        lookupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const code = lookupCode.value.trim();

            if (!code) {
                lookupMessage.textContent =
                    "Vui lòng nhập mã hồ sơ hoặc số điện thoại.";

                return;
            }

            lookupMessage.textContent =
                "Đây là phiên bản DEMO. Hệ thống tra cứu hồ sơ sẽ được triển khai trong giai đoạn tiếp theo.";

            lookupMessage.style.color = "#a17a2b";
        });
    }


    // 4. FORM DANG KY TU VAN DEMO
    const registerForm = document.getElementById("registerForm");
    const registerMessage = document.getElementById("registerMessage");

    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const fullName =
                document.getElementById("fullName").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const program =
                document.getElementById("program").value;

            const message =
                document.getElementById("message").value.trim();


            // Kiem tra thong tin bat buoc
            if (!fullName || !phone) {
                registerMessage.textContent =
                    "Vui lòng nhập đầy đủ họ tên và số điện thoại.";

                registerMessage.style.color = "#c0392b";

                return;
            }

            // Kiem tra dinh dang so dien thoai
            const phonePattern = /^[0-9+\s().-]{9,15}$/;

            if (!phonePattern.test(phone)) {
                registerMessage.textContent =
                    "Số điện thoại chưa đúng định dạng. Vui lòng kiểm tra lại.";

                registerMessage.style.color = "#c0392b";

                return;
            }

            // Hien thi thong bao DEMO
            registerMessage.textContent =
                "Cảm ơn " + fullName +
                "! Biểu mẫu DEMO đã được kiểm tra. " +
                "Thông tin chưa được gửi hoặc lưu vào hệ thống.";

            registerMessage.style.color = "#126344";

            // Khong gui du lieu len may chu
            console.log("THONG TIN DEMO:", {
                fullName: fullName,
                phone: phone,
                email: email,
                program: program,
                message: message
            });

        });
    }


    // 5. HIEU UNG CUON DEN CAC MUC
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement =
                document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                history.replaceState(null, "", targetId);
            }
        });
    });


    // 6. THONG BAO KHOI TAO WEBSITE
    console.log("NHAT MINH EDU - Website DEMO da khoi tao.");

});
