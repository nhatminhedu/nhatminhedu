
// ==============================
// GIÁO DỤC NHẬT MINH
// Các chức năng giao diện DEMO
// ==============================

document.addEventListener("DOMContentLoaded", function () {
  // MENU ĐIỆN THOẠI
  const menuToggle = document.getElementById("menuToggle");
  const navList = document.getElementById("navList");

  if (menuToggle && navList) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navList.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.innerHTML = isOpen
        ? "✕ <span>Đóng danh mục</span>"
        : "☰ <span>Danh mục</span>";
    });

    // Đóng menu sau khi chọn liên kết
    navList.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navList.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = "☰ <span>Danh mục</span>";
      });
    });
  }

  // ĐÁNH DẤU MENU ĐANG ĐƯỢC CHỌN
  const navLinks = document.querySelectorAll(".nav-list a");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.forEach(function (item) {
        item.classList.remove("active");
      });

      link.classList.add("active");
    });
  });

  // FORM ĐĂNG KÝ DEMO
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      if (formMessage) {
        formMessage.textContent =
          "Đây là biểu mẫu DEMO, chưa lưu thông tin. Vui lòng gọi hotline 0372.484.382 để được tư vấn.";
        formMessage.classList.add("form-warning");
      }

      contactForm.reset();
    });
  }
});
