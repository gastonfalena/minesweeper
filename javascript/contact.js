"use strict";

function initContactForm() {
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  var name = document.getElementById("contact-name").value.trim();
  var email = document.getElementById("contact-email").value.trim();
  var message = document.getElementById("contact-message").value.trim();

  var isValid = validateForm(name, email, message);

  if (isValid) {
    sendEmail(name, email, message);
  }
}

function validateForm(name, email, message) {
  var isValid = true;
  var nameError = document.getElementById("name-error");
  var emailError = document.getElementById("email-error");
  var messageError = document.getElementById("message-error");

  // Reset errors
  nameError.style.display = "none";
  emailError.style.display = "none";
  messageError.style.display = "none";

  // Validate name
  if (name.length < 3 || !/^[a-zA-Z0-9 ]+$/.test(name)) {
    nameError.textContent =
      "The name must have at least 3 alphanumeric characters";
    nameError.style.display = "block";
    isValid = false;
  }

  // Validate email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.textContent =
      "Please enter a valid email address (e.g., yourname@example.com)";
    emailError.style.display = "block";
    isValid = false;
  }

  if (message.length < 5) {
    messageError.textContent = "Message must be at least 5 characters long";
    messageError.style.display = "block";
    isValid = false;
  }

  return isValid;
}

function sendEmail(name, email, message) {
  var subject = "Contact from Minesweeper";
  var body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
  window.location.href = `mailto:gaston@gmail.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

document.addEventListener("DOMContentLoaded", initContactForm);
