(function () {
  const list = document.getElementById("facilityList");
  const btn = document.getElementById("toggleFacilities");
  const btnBack = document.getElementById("back");
  const c = document.getElementById("carg");
  const body = document.querySelector("body");

  btn.addEventListener("click", () => {
    c.classList.toggle("hidden");
    if (!c.classList.contains("hidden")) {
      body.style.overflow = "hidden";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      body.style.overflow = "auto";
    }

    btnBack.addEventListener("click", (event) => {
      event.preventDefault();
      c.classList.add("hidden");
      body.style.overflow = "auto";
    });
  });

 

  const items = list.querySelectorAll(".facility-item");
  if (items.length <= 3) {
    btn.style.display = "none";
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  const clamp_btn = document.querySelectorAll(".clamp-btn");
  clamp_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const text = btn.previousElementSibling;
      text.classList.toggle("line-clamp-3");

      if (btn.innerHTML === "Show more") {
        btn.innerHTML = "Show less";
      } else {
        btn.innerHTML = "Show more";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const list = document.getElementById("facilityListDesktop");
  const btn = document.getElementById("toggleBtnDesktop");

  btn.addEventListener("click", function () {
    list.classList.toggle("facility-collapsed");
    btn.textContent = list.classList.contains("facility-collapsed")
      ? "Show all"
      : "Show less";
  });
});

const text = document.querySelectorAll(".review-text");

const msg = document.querySelector(".flash_msg");
setTimeout(function () {
  msg.style.opacity = "0";
  msg.style.transition = "opacity 0.5s ease";
  setTimeout(() => {
    msg.remove();
  }, 500);
}, 2000);
