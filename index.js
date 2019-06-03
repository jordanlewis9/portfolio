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
    navAbout.style.color = "#111";
    navAbout.parentElement.style.background = "white";
  } else if (
    window.scrollY >= about.offsetTop + about.offsetHeight ||
    window.scrollY <= about.offsetTop
  ) {
    navAbout.style.color = "white";
    navAbout.parentElement.style.background = "";
  }
};

const handleContactHighlight = (e) => {
  if (
    window.scrollY >= contact.offsetTop &&
    window.scrollY < contact.offsetTop + contact.offsetHeight
  ) {
    navContact.style.color = "#111";
    navContact.parentElement.style.background = "white";
  } else if (
    window.scrollY >= contact.offsetTop + contact.offsetHeight ||
    window.scrollY <= contact.offsetTop
  ) {
    navContact.style.color = "white";
    navContact.parentElement.style.background = "";
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
    navProjects.style.color = "white";
    navProjects.parentElement.style.background = "";
    navContact.style.color = "#111";
    navContact.parentElement.style.background = "white";
  } else if (
    window.scrollY >= projects.offsetTop &&
    window.scrollY < projects.offsetTop + projects.offsetHeight
  ) {
    navProjects.style.color = "#111";
    navProjects.parentElement.style.background = "white";
  } else if (window.scrollY <= projects.offsetTop) {
    navProjects.style.color = "white";
    navProjects.parentElement.style.background = "";
  }
};

window.addEventListener("scroll", handleAboutHighlight);
window.addEventListener("scroll", handleContactHighlight);
window.addEventListener("scroll", handleProjectsHighlight);

console.log(document.body.clientHeight - window.innerHeight <= window.scrollY);
