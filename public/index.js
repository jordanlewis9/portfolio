const nav = document.querySelector(".top-nav");
const navProjects = document.querySelector("#nav-projects");
const navAbout = document.querySelector("#nav-about");
const navContact = document.querySelector("#nav-contact");
const home = document.querySelector('#home');
const projects = document.querySelector("#projects");
const about = document.querySelector("#about");
const contact = document.querySelector("#contact");
const contactForm = document.querySelector("#form");
const contactName = document.querySelector("#name");
const contactEmail = document.querySelector("#email");
const contactSubject = document.querySelector("#subject");
const contactMessage = document.querySelector("#message");
const contactSubmit = document.querySelector("#submit");

// To account for navbar fixed position
about.style.paddingTop = `${nav.offsetHeight}px`;
projects.style.paddingTop = `${nav.offsetHeight}px`;
contact.style.paddingTop = `${nav.offsetHeight}px`;

const removeInvalidEmail = (e) => {
  contactEmail.classList.remove("required-input");
  contactEmail.removeEventListener("input", removeInvalidEmail)
};

const handleContactSubmit = async (e) => {
  e.preventDefault();
  console.log(contactEmail.value, contactSubject.value, contactMessage.value);
  console.log("success");
  contactForm.removeEventListener("submit", handleContactSubmit);
  try {
    const info = await axios.post("/contact", {
    name: contactName.value,
    subject: contactSubject.value,
    message: contactMessage.value,
    email: contactEmail.value
  });
    if (info.status === 201) {
      window.open('/thank-you')
      window.location.reload();
    }
  } catch (error) {
    alert(error.response.data.message);
    contactEmail.classList.add("required-input");
    contactEmail.focus();
  }
};

const handleContactSubmitPush = () => {
  contactSubmit.classList.add("submit-pushed");
}

const handleContactSubmitDepush = () => {
  contactSubmit.classList.remove("submit-pushed");
}

const removeIfRequiredAndSubmit = (field) => {
  if (field.classList.contains("required-input")) {
    field.classList.remove("required-input");
    field.parentNode.removeChild(field.parentNode.querySelector(".required"));
    field.removeEventListener("input", removeRequiredElements);
  };
  return;
}

const handleRequiredInvalid = (e) => {
  e.preventDefault();
  removeIfRequiredAndSubmit(e.target);
  e.target.insertAdjacentHTML('afterend', '<p class="required required-show">Required</p>');
  e.target.classList.add("required-input");
  e.target.addEventListener("input", removeRequiredElements);
}

const removeRequiredElements = (e) => {
  e.target.classList.remove("required-input");
  e.target.parentNode.removeChild(e.target.parentNode.querySelector(".required"));
  e.target.removeEventListener("input", removeRequiredElements);
}

contactForm.addEventListener("invalid", handleRequiredInvalid, true);
contactForm.addEventListener("submit", handleContactSubmit);
contactSubmit.addEventListener("mousedown", handleContactSubmitPush);
contactSubmit.addEventListener("mouseup", handleContactSubmitDepush);
contactSubmit.addEventListener("mouseout", handleContactSubmitDepush);
