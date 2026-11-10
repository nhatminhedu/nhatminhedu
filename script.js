
document.addEventListener("DOMContentLoaded", function () {

  // MENU TRÊN ĐIỆN THOẠI
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("show");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("show");
      });
    });
  }

  // TÌM KIẾM KHÓA HỌC
  const courseSearch = document.getElementById("courseSearch");
  const courseCards = document.querySelectorAll(".course-card");

  if (courseSearch) {
    courseSearch.addEventListener("input", function () {
      const keyword = this.value
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d");

      courseCards.forEach(function (card) {
        const name = (card.dataset.name + " " + card.innerText)
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/đ/g, "d");

        card.style.display = name.includes(keyword) ? "" : "none";
      });
    });
  }

  // FORM ĐĂNG KÝ TƯ VẤN DEMO
  const consultForm = document.getElementById("consultForm");
  const formMessage = document.getElementById("formMessage");

  if (consultForm) {
    consultForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const fullname = consultForm.elements.fullname.value.trim();
      const phone = consultForm.elements.phone.value.trim();
      const program = consultForm.elements.program.value;

      if (!fullname || !phone || !program) {
        formMessage.textContent = "Vui lòng điền đầy đủ thông tin.";
        return;
      }

      if (!/^[0-9+\s().-]{9,15}$/.test(phone)) {
        formMessage.textContent = "Số điện thoại chưa hợp lệ.";
        return;
      }

      formMessage.textContent =
        "Đăng ký demo đã được ghi nhận trên giao diện. Vui lòng liên hệ hotline 0372.484.382 để được hỗ trợ.";

      consultForm.reset();
    });
  }

});
