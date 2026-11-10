
// ==========================================
// GIAO DUC NHAT MINH - MAIN JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ======================================
    // 1. MOBILE MENU
    // ======================================

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("show");

            const isOpen = navMenu.classList.contains("show");

            menuToggle.setAttribute("aria-expanded", isOpen);

            menuToggle.textContent = isOpen ? "✕ Đóng menu" : "☰ Menu";

        });

        // Đóng menu khi chọn mục

        navMenu.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("show");

                menuToggle.textContent = "☰ Menu";

                menuToggle.setAttribute("aria-expanded", "false");

            });

        });

    }


    // ======================================
    // 2. ACTIVE NAVIGATION
    // ======================================

    const navLinks = document.querySelectorAll(".nav-menu a[href^='#']");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            link.classList.add("active");

        });

    });


    // ======================================
    // 3. COURSE FILTER
    // ======================================

    const filterButtons = document.querySelectorAll(".filter-btn");

    const courseCards = document.querySelectorAll(".course-card");

    const courseSearch = document.getElementById("courseSearch");

    const searchButton = document.getElementById("searchButton");

    let currentFilter = "all";

    function filterCourses() {

        if (!courseCards.length) return;

        const keyword = courseSearch
            ? courseSearch.value.trim().toLowerCase()
            : "";

        let visibleCount = 0;

        courseCards.forEach(function (card) {

            const category = card.dataset.category || "";

            const content = card.textContent.toLowerCase();

            const matchesCategory =
                currentFilter === "all" ||
                category === currentFilter;

            const matchesKeyword =
                content.includes(keyword);

            const isVisible =
                matchesCategory && matchesKeyword;

            card.classList.toggle("hidden", !isVisible);

            if (isVisible) {
                visibleCount++;
            }

        });


        // Thông báo khi không tìm thấy khóa học

        const courseGrid = document.getElementById("courseGrid");

        let noResults = document.getElementById("noResults");

        if (!noResults && courseGrid) {

            noResults = document.createElement("div");

            noResults.id = "noResults";

            noResults.className = "no-results";

            noResults.textContent =
                "Không tìm thấy chương trình phù hợp. Vui lòng thử từ khóa khác.";

            noResults.style.display = "none";

            courseGrid.appendChild(noResults);

        }

        if (noResults) {
            noResults.style.display =
                visibleCount === 0 ? "block" : "none";
        }

    }


    // Xử lý nút danh mục

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            currentFilter = button.dataset.filter || "all";

            filterCourses();

        });

    });


    // Tìm kiếm khi nhập từ khóa

    if (courseSearch) {

        courseSearch.addEventListener("input", filterCourses);

        courseSearch.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                filterCourses();

            }

        });

    }


    // Nút tìm kiếm

    if (searchButton) {

        searchButton.addEventListener("click", function () {

            filterCourses();

        });

    }


    // ======================================
    // 4. REGISTRATION FORM
    // ======================================

    const registerForm = document.getElementById("registerForm");

    const formMessage = document.getElementById("formMessage");

    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const fullName =
                document.getElementById("fullName").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const course =
                document.getElementById("course").value;

            const message =
                document.getElementById("message").value.trim();


            if (!fullName || !phone) {

                formMessage.textContent =
                    "Vui lòng nhập đầy đủ họ tên và số điện thoại.";

                formMessage.style.color = "#c0392b";

                return;

            }


            // Chưa kết nối máy chủ nhận đăng ký

            const registration = {
                fullName: fullName,
                phone: phone,
                course: course,
                message: message
            };

            console.log(
                "Thông tin đăng ký tư vấn:",
                registration
            );

            formMessage.textContent =
                "Giao diện đã nhận thông tin nhập. Chức năng gửi đăng ký đang chờ kết nối hệ thống.";

            formMessage.style.color = "#527b25";

        });

    }


    // ======================================
    // 5. SMOOTH SCROLL
    // ======================================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // ======================================
    // 6. UPDATE COPYRIGHT YEAR
    // ======================================

    const copyright = document.querySelector(".footer-bottom p");

    if (copyright) {

        copyright.textContent =
            "© " + new Date().getFullYear() +
            " Giáo dục Nhật Minh. All rights reserved.";

    }


    // ======================================
    // 7. PHONE LINK
    // ======================================

    document.querySelectorAll('a[href="tel:0372484382"]')
        .forEach(function (link) {

            link.setAttribute("aria-label", "Gọi Nhật Minh: 0372 484 382");

        });


    console.log("Giáo dục Nhật Minh - Website đã khởi tạo thành công.");

});
