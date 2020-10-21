const nav = document.querySelector(".top-nav");
const navProjects = document.querySelector("#nav-projects");
const navAbout = document.querySelector("#nav-about");
const navContact = document.querySelector("#nav-contact");
const projects = document.querySelector("#projects");
const about = document.querySelector("#about");
const contact = document.querySelector("#contact");

// To account for navbar fixed position
about.style.paddingTop = `${nav.offsetHeight}px`;
projects.style.paddingTop = `${nav.offsetHeight}px`;
contact.style.paddingTop = `${nav.offsetHeight}px`;

const handleAboutHighlight = (e) => {
  if (
    window.scrollY >= about.offsetTop &&
    window.scrollY < about.offsetTop + about.offsetHeight
  ) {
    // navAbout.style.color = "#111";
    // navAbout.parentElement.style.background = "white";
    navAbout.parentElement.classList.add("li-active");
    navAbout.classList.add("a-active");
  } else if (
    window.scrollY >= about.offsetTop + about.offsetHeight ||
    window.scrollY <= about.offsetTop
  ) {
    // navAbout.style.color = "white";
    // navAbout.parentElement.style.background = "";
    navAbout.parentElement.classList.remove("li-active");
    navAbout.classList.remove("a-active");
  }
};

const handleContactHighlight = (e) => {
  if (
    window.scrollY >= contact.offsetTop &&
    window.scrollY < contact.offsetTop + contact.offsetHeight
  ) {
    navContact.parentElement.classList.add("li-active");
    navContact.classList.add("a-active");
  } else if (
    window.scrollY >= contact.offsetTop + contact.offsetHeight ||
    window.scrollY <= contact.offsetTop
  ) {
    navContact.parentElement.classList.remove("li-active");
    navContact.classList.remove("a-active");
  }
};

const handleProjectsHighlight = (e) => {
  // Since project.offsetTop is never less than window.scrollY in mobile browsers
  // This if statement must be run first, and must be in this function, with
  // this event handler last. This ensures Contact nav will be "active" when
  // Scrolled to the bottom in mobile view, and projects won't.
  if (
    window.scrollY >= projects.offsetTop + projects.offsetHeight ||
    document.body.clientHeight - window.innerHeight <= window.scrollY
  ) {
    navProjects.parentElement.classList.remove("li-active");
    navProjects.classList.remove("a-active");
    navContact.parentElement.classList.add("li-active");
    navContact.classList.add("a-active");
  } else if (
    window.scrollY >= projects.offsetTop &&
    window.scrollY < projects.offsetTop + projects.offsetHeight
  ) {
    navProjects.parentElement.classList.add("li-active");
    navProjects.classList.add("a-active");
  } else if (window.scrollY <= projects.offsetTop) {
    navProjects.parentElement.classList.remove("li-active");
    navProjects.classList.remove("a-active");
  }
};

window.addEventListener("scroll", handleAboutHighlight);
window.addEventListener("scroll", handleContactHighlight);
window.addEventListener("scroll", handleProjectsHighlight);

console.log(document.body.clientHeight - window.innerHeight <= window.scrollY);