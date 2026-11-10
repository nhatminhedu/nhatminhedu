document.addEventListener("DOMContentLoaded", function () {

  // MENU ĐIỆN THOẠI
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ĐÁNH DẤU MỤC MENU ĐANG ĐƯỢC CHỌN
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.forEach(function (item) {
        item.classList.remove("active");
      });
      link.classList.add("active");
    });
  });

  // HIỂN THỊ THÔNG BÁO CHO BIỂU MẪU TRA CỨU DEMO
  const lookupForm = document.getElementById("lookupForm");

  if (lookupForm) {
    lookupForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const lookupCode = document.getElementById("lookupCode").value.trim();

      if (!lookupCode) {
        alert("Vui lòng nhập mã hồ sơ hoặc số điện thoại.");
        return;
      }

      alert(
        "Chức năng tra cứu hồ sơ hiện đang ở chế độ DEMO.\n\n" +
        "Mã tra cứu: " + lookupCode + "\n\n" +
        "Cần kết nối cơ sở dữ liệu học viên để tra cứu kết quả thực tế."
      );
    });
  }

  // BIỂU MẪU ĐĂNG KÝ TƯ VẤN DEMO
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const fullName = document.getElementById("fullName").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const program = document.getElementById("program").value;

      if (!fullName || !phone) {
        alert("Vui lòng nhập họ tên và số điện thoại.");
        return;
      }

      const phonePattern = /^[0-9+\s().-]{9,15}$/;

      if (!phonePattern.test(phone)) {
        alert("Vui lòng kiểm tra lại số điện thoại.");
        return;
      }

      alert(
        "Cảm ơn bạn đã đăng ký tư vấn!\n\n" +
        "Họ tên: " + fullName + "\n" +
        "Số điện thoại: " + phone + "\n" +
        "Chương trình: " + (program || "Chưa chọn") +
        "\n\nĐây là bản DEMO. Thông tin chưa được lưu vào cơ sở dữ liệu. " +
        "Cần kết nối hệ thống tiếp nhận đăng ký trước khi sử dụng chính thức."
      );

      registerForm.reset();
    });
  }

});
