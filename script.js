
// Menu trên điện thoại
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Lọc khóa học
const filterButtons = document.querySelectorAll(".filter-btn");
const courseCards = document.querySelectorAll(".course-card");
const courseSearch = document.getElementById("courseSearch");

let activeCategory = "all";

function filterCourses() {
  const keyword = (courseSearch?.value || "").trim().toLowerCase();

  courseCards.forEach(card => {
    const category = card.dataset.category || "";
    const searchableText = (
      card.dataset.search + " " + card.textContent
    ).toLowerCase();

    const matchesCategory =
      activeCategory === "all" || category === activeCategory;
    const matchesKeyword = searchableText.includes(keyword);

    card.classList.toggle(
      "hidden",
      !(matchesCategory && matchesKeyword)
    );
  });
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    activeCategory = button.dataset.filter;
    filterCourses();
  });
});

courseSearch?.addEventListener("input", filterCourses);

// Biểu mẫu tư vấn DEMO: không gửi dữ liệu lên máy chủ
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
    formMessage.textContent = "Vui lòng kiểm tra lại số điện thoại.";
    return;
  }

  formMessage.textContent =
    "Biểu mẫu DEMO đã kiểm tra thông tin. Website chưa kết nối hệ thống nhận đăng ký.";
});

// Năm hiện tại ở chân trang
const currentYear = document.getElementById("currentYear");
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Đánh dấu mục menu đang xem
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
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach(section => observer.observe(section));
}
