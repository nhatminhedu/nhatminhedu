
document.addEventListener("DOMContentLoaded", function () {
  const mobileToggle = document.getElementById("mobileToggle");
  const mainNav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".nav-link");

  // Mở và đóng menu trên điện thoại
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("open");
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
      mobileToggle.textContent = isOpen ? "✕" : "☰";
    });
  }

  // Đóng menu sau khi chọn mục
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.forEach(item => item.classList.remove("active"));
      link.classList.add("active");

      if (mainNav) mainNav.classList.remove("open");
      if (mobileToggle) {
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.textContent = "☰";
      }
    });
  });

  // Tìm kiếm chương trình đào tạo trên trang
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const keyword = searchInput.value.trim().toLocaleLowerCase("vi");

      if (!keyword) {
        alert("Vui lòng nhập nội dung cần tìm.");
        return;
      }

      const searchableItems = document.querySelectorAll(
        ".course-card, .news-card"
      );

      let firstMatch = null;

      searchableItems.forEach(function (item) {
        const content = item.textContent.toLocaleLowerCase("vi");

        if (content.includes(keyword)) {
          item.style.outline = "3px solid #ffd23f";
          item.style.outlineOffset = "3px";
          if (!firstMatch) firstMatch = item;
        } else {
          item.style.outline = "";
          item.style.outlineOffset = "";
        }
      });

      if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        alert("Chưa tìm thấy nội dung phù hợp. Vui lòng thử từ khóa khác.");
      }
    });
  }

  // Biểu mẫu tư vấn bản demo
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const fullName = document.getElementById("fullName").value.trim();
      const phone = document.getElementById("phone").value.trim();

      if (!fullName || !phone) {
        alert("Vui lòng nhập họ tên và số điện thoại.");
        return;
      }

      const phonePattern = /^[0-9+\s().-]{9,15}$/;

      if (!phonePattern.test(phone)) {
        alert("Số điện thoại chưa đúng định dạng. Vui lòng kiểm tra lại.");
        return;
      }

      if (formMessage) {
        formMessage.textContent =
          "Thông tin đã được kiểm tra trên giao diện demo. Chức năng gửi và lưu dữ liệu sẽ được tích hợp ở giai đoạn tiếp theo.";
      }

      alert("Đây là biểu mẫu demo, chưa gửi dữ liệu đến hệ thống quản trị.");
      contactForm.reset();
    });
  }
});
