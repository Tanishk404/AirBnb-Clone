const homesTab = document.getElementById("homesTab");
const houseIdle = document.getElementById("houseIdle");
const houseActive = document.getElementById("houseActive");
const wrapper = document.getElementById("balloonWrapper");
const balloonIdle = document.getElementById("balloonIdle");
const balloonActive = document.getElementById("balloonActive");

// Homes Tabs (LG, MD, SM sabko pakdo)
["lg", "md", "sm"].forEach((size) => {
  const tab = document.getElementById(`homesTab-${size}`);
  const idle = document.getElementById(`houseIdle-${size}`);
  const active = document.getElementById(`houseActive-${size}`);

  if (tab) {
    tab.addEventListener("click", (e) => {
      e.preventDefault();

      idle.classList.add("hidden");
      active.classList.remove("hidden");
      active.currentTime = 0;
      active.play();

      setTimeout(() => {
        window.location.href = "/";
      }, 800);
    });
  }
});

// Page load hone ke baad agar URL "/" hai
window.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname === "/") {
    ["lg", "md", "sm"].forEach((size) => {
      const houseIdle = document.getElementById(`houseIdle-${size}`);
      if (houseIdle) {
        houseIdle.src =
          "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/4aae4ed7-5939-4e76-b100-e69440ebeae4.png?im_w=240";
      }
    });
  }
});

wrapper.addEventListener("click", (e) => {
  e.preventDefault();

  balloonIdle.classList.add("hidden");
  balloonActive.classList.remove("hidden");
  balloonActive.currentTime = 0;
  balloonActive.play();

  setTimeout(() => {
    window.location.href = "/listings";
  }, 800);
});

servicesTab.addEventListener("click", (e) => {
  e.preventDefault();

  servicesIdle.classList.add("hidden");
  servicesActive.classList.remove("hidden");
  servicesActive.currentTime = 0;
  servicesActive.play();

  setTimeout(() => {
    window.location.href = "/host/user";
  }, 800);
});

window.addEventListener("scroll", () => {
  const cons = document.querySelector(".cons");

  if (window.scrollY > 50) {
    cons.classList.add("-translate-y-full", "opacity-0", "hidden");
    cons.classList.remove("translate-y-0", "opacity-100");
  } else {
    cons.classList.remove("-translate-y-full", "opacity-0", "hidden");
    cons.classList.add("translate-y-0", "opacity-100");
  }
});

let option = document.getElementById("options");
let bars = document.querySelectorAll(".bars");
bars.forEach((bar) => {
  bar.addEventListener("click", () => {
    option.classList.toggle("lg:flex");
    option.classList.toggle("md:flex");
    option.classList.toggle("xl:flex");
  });
});

document.addEventListener("click", (e) => {
  if (
    !option.contains(e.target) &&
    !Array.from(bars).some((bar) => bar.contains(e.target))
  ) {
    option.classList.remove("lg:flex", "md:flex", "xl:flex");
  }
});

const Search_card = document.getElementById("search_card");
const Search_box = document.getElementById("search_page");
const x_mark = document.getElementById("x_mark");
const img_box = document.getElementById("img_box");
const nav_bar = document.getElementById("navbar");

const body = document.querySelector("body");

Search_card.addEventListener("click", () => {
  Search_box.classList.toggle("hidden");
  Search_card.classList.add("hidden");
  img_box.classList.remove("top-16");
  img_box.classList.add("fixed", "top-0");
  body.classList.add("overflow-hidden", "overflow-y-hidden");
  nav_bar.classList.add("fixed", "top-0", "z-50");
  Search_box.classList.add("animate__animated", "animate__fadeInDownBig");
});



x_mark.addEventListener("click", () => {
  Search_box.classList.remove("animate__animated", "animate__fadeInDownBig");

  Search_box.classList.add("animate__animated", "animate__fadeOutUp");

  setTimeout(() => {
    Search_box.classList.add("hidden");
    Search_card.classList.remove("hidden");
    img_box.classList.remove("fixed", "top-0");
    body.classList.remove("overflow-hidden", "overflow-y-hidden");
    nav_bar.classList.remove("fixed", "top-0", "z-50");
    Search_box.classList.remove("animate__animated", "animate__fadeOutUp");
  }, 500);
});







