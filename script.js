/* ==================================================
   GIÁO DỤC NHẬT MINH
   Các tương tác của website DEMO
================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // -----------------------------------------------
  // 1. MENU TRÊN ĐIỆN THOẠI
  // -----------------------------------------------

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Đóng menu" : "Mở menu"
      );
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Mở menu");
      });
    });

    document.addEventListener("click", function (event) {
      const clickedInsideMenu = mainNav.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle) {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // -----------------------------------------------
  // 2. ĐÁNH DẤU MENU THEO VỊ TRÍ TRANG
  // -----------------------------------------------

  const sections = document.querySelectorAll("main section[id]");

  function updateActiveMenu() {
    let currentSection = "home";

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 150;

      if (window.scrollY >= sectionTop) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(function (link) {
      const target = link.getAttribute("href");

      link.classList.toggle(
        "active",
        target === "#" + currentSection
      );
    });
  }

  window.addEventListener("scroll", updateActiveMenu, {
    passive: true
  });

  updateActiveMenu();

  // -----------------------------------------------
  // 3. TÌM KIẾM VÀ LỌC KHÓA HỌC
  // -----------------------------------------------

  const courseSearch = document.getElementById("courseSearch");
  const courseFilters = document.getElementById("courseFilters");
  const courseCards = document.querySelectorAll(".course-card");
  const emptyState = document.getElementById("emptyState");

  let selectedCategory = "all";

  function filterCourses() {
    const keyword = courseSearch
      ? courseSearch.value.trim().toLowerCase()
      : "";

    let visibleCount = 0;

    courseCards.forEach(function (card) {
      const category = card.dataset.category || "";
      const searchText = (
        card.dataset.search + " " + card.innerText
      ).toLowerCase();

      const matchesCategory =
        selectedCategory === "all" ||
        category === selectedCategory;

      const matchesKeyword =
        keyword === "" || searchText.includes(keyword);

      const isVisible = matchesCategory && matchesKeyword;

      card.hidden = !isVisible;

      if (isVisible) {
        visibleCount++;
      }
    });

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }
  }

  if (courseSearch) {
    courseSearch.addEventListener("input", filterCourses);
  }

  if (courseFilters) {
    courseFilters.addEventListener("click", function (event) {
      const button = event.target.closest(".filter-btn");

      if (!button) return;

      selectedCategory = button.dataset.filter;

      courseFilters.querySelectorAll(".filter-btn").forEach(
        function (filterButton) {
          filterButton.classList.remove("active");
        }
      );

      button.classList.add("active");
      filterCourses();
    });
  }

  // -----------------------------------------------
  // 4. HỘP XEM CHI TIẾT KHÓA HỌC
  // -----------------------------------------------

  const courseModal = document.getElementById("courseModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById(
    "modalDescription"
  );
  const modalClose = document.getElementById("modalClose");
  const modalRegister = document.getElementById("modalRegister");

  const detailButtons = document.querySelectorAll(".detail-link");

  function openCourseModal(title, description) {
    if (!courseModal) return;

    modalTitle.textContent = title;
    modalDescription.textContent = description;

    courseModal.classList.add("open");
    courseModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (modalClose) {
      modalClose.focus();
    }
  }

  function closeCourseModal() {
    if (!courseModal) return;

    courseModal.classList.remove("open");
    courseModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  detailButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      openCourseModal(
        button.dataset.title || "Thông tin chương trình",
        button.dataset.description || ""
      );
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeCourseModal);
  }

  if (courseModal) {
    courseModal.addEventListener("click", function (event) {
      if (event.target.hasAttribute("data-close-modal")) {
        closeCourseModal();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeCourseModal();
    }
  });

  if (modalRegister) {
    modalRegister.addEventListener("click", function () {
      closeCourseModal();
    });
  }

  // -----------------------------------------------
  // 5. BIỂU MẪU ĐĂNG KÝ TƯ VẤN DEMO
  // -----------------------------------------------

  const registerForm = document.getElementById("registerForm");
  const formNotice = document.getElementById("formNotice");

  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const fullName = document
        .getElementById("fullName")
        .value.trim();

      const phone = document
        .getElementById("phone")
        .value.trim();

      const email = document
        .getElementById("email")
        .value.trim();

      const program = document
        .getElementById("program")
        .value;

      // Kiểm tra họ tên
      if (fullName.length < 2) {
        showFormMessage("Vui lòng nhập họ và tên hợp lệ.", false);
        document.getElementById("fullName").focus();
        return;
      }

      // Kiểm tra số điện thoại Việt Nam
      const phonePattern = /^(0|\+84)[0-9]{9,10}$/;

      if (!phonePattern.test(phone.replace(/\s/g, ""))) {
        showFormMessage(
          "Vui lòng kiểm tra lại số điện thoại.",
          false
        );
        document.getElementById("phone").focus();
        return;
      }

      // Kiểm tra email nếu người dùng nhập
      if (email !== "") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
          showFormMessage(
            "Địa chỉ email chưa đúng định dạng.",
            false
          );
          document.getElementById("email").focus();
          return;
        }
      }

      // Chỉ là DEMO: không gửi dữ liệu đi đâu
      showFormMessage(
        "Thông tin đã được kiểm tra trên bản demo. " +
        "Website chưa kết nối máy chủ nên chưa lưu hoặc gửi đăng ký thật. " +
        "Vui lòng gọi 0372.484.382 để được tư vấn.",
        true
      );

      console.log("Thông tin thử nghiệm trên trình duyệt:", {
        fullName: fullName,
        phone: phone,
        email: email,
        program: program
      });
    });
  }

  function showFormMessage(message, success) {
    if (!formNotice) return;

    formNotice.textContent = message;
    formNotice.classList.toggle("success", success);
  }

  // -----------------------------------------------
  // 6. NĂM HIỆN TẠI Ở FOOTER
  // -----------------------------------------------

  const footerYear = document.querySelector(".footer-bottom");

  if (footerYear) {
    footerYear.innerHTML =
      '<div class="container">© ' +
      new Date().getFullYear() +
      ' GIÁO DỤC NHẬT MINH. Nội dung website đang trong giai đoạn demo.</div>';
  }

});
