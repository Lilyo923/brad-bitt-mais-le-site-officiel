const toggle = document.getElementById("theme-toggle");
const body = document.body;

toggle.addEventListener("click", () => {
  const current = body.getAttribute("data-theme");
  body.setAttribute("data-theme", current === "light" ? "dark" : "light");
});
