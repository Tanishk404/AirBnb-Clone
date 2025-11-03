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