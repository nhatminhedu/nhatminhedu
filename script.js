
document.addEventListener("DOMContentLoaded", function () {

  // 1. MENU ĐIỆN THOẠI
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  menuToggle.addEventListener("click", function () {
    mainNav.classList.toggle("open");
    menuToggle.textContent = mainNav.classList.contains("open")
      ? "×"
      : "☰";
  });

  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      document.querySelectorAll(".nav-link").forEach(function (item) {
        item.classList.remove("active");
      });

      link.classList.add("active");
      mainNav.classList.remove("open");
      menuToggle.textContent = "☰";
    });
  });

  // 2. TÌM KIẾM VÀ LỌC KHÓA HỌC
  const courseSearch = document.getElementById("courseSearch");
  const courseCategory = document.getElementById("courseCategory");
  const courseCards = document.querySelectorAll(".course-card");
  const noCourse = document.getElementById("noCourse");

  function filterCourses() {
    const keyword = courseSearch.value.trim().toLowerCase();
    const category = courseCategory.value;

    let visibleCount = 0;

    courseCards.forEach(function (card) {
      const content = card.textContent.toLowerCase();
      const cardCategory = card.dataset.category;

      const matchKeyword = content.includes(keyword);
      const matchCategory =
        category === "all" || cardCategory === category;

      if (matchKeyword && matchCategory) {
        card.style.display = "";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    noCourse.hidden = visibleCount !== 0;
  }

  courseSearch.addEventListener("input", filterCourses);
  courseCategory.addEventListener("change", filterCourses);

  // 3. MODAL CHI TIẾT KHÓA HỌC
  const modal = document.getElementById("detailModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalClose = document.getElementById("modalClose");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalConsult = document.getElementById("modalConsult");

  function openModal(title, description) {
    modalTitle.textContent = title;
    modalDescription.textContent = description;

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".detail-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      openModal(
        button.dataset.title,
        button.dataset.desc
      );
    });
  });

  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);

  modalConsult.addEventListener("click", function () {
    closeModal();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  // 4. THÔNG BÁO
  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 3500);
  }

  // 5. TRA CỨU HỒ SƠ DEMO
  const lookupForm = document.getElementById("lookupForm");

  lookupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const code = document.getElementById("lookupCode").value.trim();

    if (!code) {
      showToast("Vui lòng nhập mã hồ sơ hoặc số điện thoại.");
      return;
    }

    showToast(
      "Chức năng tra cứu sẽ hoạt động sau khi kết nối cơ sở dữ liệu."
    );
  });

  // 6. ĐĂNG KÝ TƯ VẤN DEMO
  const consultForm = document.getElementById("consultForm");
  const formMessage = document.getElementById("formMessage");

  consultForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const interest = document.getElementById("interest").value;

    if (!name || !phone || !interest) {
      showToast("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const phonePattern = /^[0-9+\s().-]{9,15}$/;

    if (!phonePattern.test(phone)) {
      showToast("Vui lòng kiểm tra lại số điện thoại.");
      return;
    }

    // Chưa có máy chủ lưu dữ liệu.
    formMessage.textContent =
      "Đây là biểu mẫu demo. Chưa gửi hoặc lưu thông tin.";

    showToast(
      "Giao diện đã nhận thông tin thử nghiệm. Chưa có dữ liệu được lưu."
    );

    consultForm.reset();
  });

  // 7. NĂM HIỆN TẠI Ở CHÂN TRANG
  const footerText = document.querySelector(".footer-bottom .container");

  if (footerText) {
    footerText.textContent =
      "© " + new Date().getFullYear() +
      " GIÁO DỤC NHẬT MINH. All rights reserved.";
  }

});
