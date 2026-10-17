const menuButton = document.querySelector(".open-menu");
const closeButton = document.querySelector(".close-menu");
const navigation = document.querySelector(".navigation");
const overlay = document.querySelector(".overlay");
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

function setMenuOpen(isOpen) {
  navigation.classList.toggle("is-open", isOpen);
  overlay.classList.toggle("is-visible", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  overlay.setAttribute("aria-hidden", String(!isOpen));
  document.body.classList.toggle("menu-open", isOpen);
}

menuButton.addEventListener("click", () => setMenuOpen(true));
closeButton.addEventListener("click", () => setMenuOpen(false));
overlay.addEventListener("click", () => setMenuOpen(false));

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const isExpanded = toggle.getAttribute("aria-expanded") === "true";
    const dropdown = document.getElementById(
      toggle.getAttribute("aria-controls"),
    );

    dropdownToggles.forEach((otherToggle) => {
      const otherDropdown = document.getElementById(
        otherToggle.getAttribute("aria-controls"),
      );
      otherToggle.setAttribute("aria-expanded", "false");
      otherToggle.closest(".nav-dropdown").classList.remove("link-open");
      otherDropdown.hidden = true;
    });

    if (!isExpanded) {
      toggle.setAttribute("aria-expanded", "true");
      toggle.closest(".nav-dropdown").classList.add("link-open");
      dropdown.hidden = false;
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
    dropdownToggles.forEach((toggle) => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.closest(".nav-dropdown").classList.remove("link-open");
      document.getElementById(
        toggle.getAttribute("aria-controls"),
      ).hidden = true;
    });
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    setMenuOpen(false);
  }
});
