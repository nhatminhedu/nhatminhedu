
// MENU ĐIỆN THOẠI
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const opened = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(opened));
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// TÌM KIẾM VÀ LỌC KHÓA HỌC
const filterButtons = document.querySelectorAll(".filter-btn");
const courseCards = document.querySelectorAll(".course-card");
const courseSearch = document.getElementById("courseSearch");

let selectedCategory = "all";

function filterCourses() {
  const keyword = (courseSearch?.value || "").trim().toLowerCase();

  courseCards.forEach(card => {
    const category = card.dataset.category || "";
    const content = (
      (card.dataset.search || "") + " " + card.textContent
    ).toLowerCase();

    const categoryMatch =
      selectedCategory === "all" || category === selectedCategory;
    const keywordMatch = content.includes(keyword);

    card.classList.toggle(
      "hidden",
      !(categoryMatch && keywordMatch)
    );
  });
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    selectedCategory = button.dataset.filter;
    filterCourses();
  });
});

courseSearch?.addEventListener("input", filterCourses);

// BIỂU MẪU DEMO
// Không gửi thông tin lên máy chủ và không lưu dữ liệu.
const consultForm = document.getElementById("consultForm");
const formMessage = document.getElementById("formMessage");

consultForm?.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("fullName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const program = document.getElementById("program").value;

  const phonePattern = /^(0|\+84)[0-9\s.-]{8,13}$/;

  if (!name || !phone || !program) {
    formMessage.textContent = "Vui lòng điền đầy đủ thông tin.";
    return;
  }

  if (!phonePattern.test(phone)) {
    formMessage.textContent = "Số điện thoại chưa đúng định dạng.";
    return;
  }

  formMessage.textContent =
    "Thông tin đã được kiểm tra trên bản DEMO. Website chưa kết nối hệ thống nhận đăng ký.";
});

// HIỂN THỊ NĂM HIỆN TẠI
const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// ĐÁNH DẤU MENU THEO KHU VỰC ĐANG XEM
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".main-nav a[href^='#']");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      }
    });
  }, {
    rootMargin: "-30% 0px -60% 0px"
  });

  sections.forEach(section => observer.observe(section));
}
