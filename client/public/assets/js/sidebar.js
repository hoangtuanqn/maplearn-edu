document.addEventListener("DOMContentLoaded", () => {
    const submenuParents = document.querySelectorAll(".has-submenu");

    submenuParents.forEach((parent) => {
        const btn = parent.querySelector("button");
        btn.addEventListener("click", () => {
            parent.classList.toggle("open");
        });
    });
});
