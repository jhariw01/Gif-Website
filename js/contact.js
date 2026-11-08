// Frontend-only contact form validation. No email is sent.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("full-name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const formStatus = document.getElementById("form-status");
  document.getElementById("year").textContent = new Date().getFullYear();

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formStatus.textContent = "";
    formStatus.className = "message";

    if (!nameInput.value.trim()) {
      nameError.textContent = "Please enter your name.";
      isValid = false;
    }
    if (!emailInput.value.trim()) {
      emailError.textContent = "Please enter your email address.";
      isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }
    if (!messageInput.value.trim()) {
      messageError.textContent = "Please enter a message.";
      isValid = false;
    }

    if (isValid) {
      formStatus.textContent = "Success! Your form passed validation. (Demo only—no email was sent.)";
      formStatus.className = "message success";
      form.reset();
    } else {
      formStatus.textContent = "Please correct the errors above and try again.";
      formStatus.className = "message error";
    }
  });
});
