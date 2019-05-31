const nav = document.querySelector(".top-nav");
const navProjects = document.querySelector("#nav-projects");
const projects = document.querySelector("#projects");
const about = document.querySelector("#about");
projects.style.paddingTop = `${nav.offsetHeight}px`;

const handleHighlight = (e) => {
  if (window.scrollY >= projects.offsetTop) {
    navProjects.parentElement.style.background = "gray";
  } else if (window.scrollY <= projects.offsetTop) {
    navProjects.parentElement.style.background = "";
  }
};

window.addEventListener("scroll", handleHighlight);
