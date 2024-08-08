import { handleApiRequest } from "./apihandler.js";

function formHandler(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const formObject = {};

  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  console.log("Form Submitted", JSON.stringify(formObject));
  alert("Form submitted successfully!");
  form.reset();
}

function showErrors(errors) {
  const nameInput = document.getElementById("signupName");
  const emailInput = document.getElementById("signupEmail");
  const passwordInput = document.getElementById("signupPassword");
  const loginEmailInput = document.getElementById("loginEmail");
  const loginPasswordInput = document.getElementById("loginPassword");

  if (errors.name) {
    nameInput.classList.add("error");
    nameInput.placeholder = errors.name;
  }
  if (errors.email) {
    emailInput.classList.add("error");
    emailInput.placeholder = errors.email;
    loginEmailInput.classList.add("error");
    loginEmailInput.placeholder = errors.email;
  }
  if (errors.password) {
    passwordInput.classList.add("error");
    passwordInput.placeholder = errors.password;
    loginPasswordInput.classList.add("error");
    loginPasswordInput.placeholder = errors.password;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const joinUs = document.querySelector('nav ul li a[href="#"]');
  const signupModal = document.getElementById("signupModal");
  const closeBtns = document.querySelectorAll(".close");
  const signupBtn = document.getElementById("signupBtn");
  const loginBtn = document.getElementById("loginBtn");
  const toggleLoginBtn = document.getElementById("toggleLoginBtn");
  const toggleSignupBtn = document.getElementById("toggleSignupBtn");
  const nameField = document.getElementById("nameField");
  const title = document.getElementById("title");

  joinUs.addEventListener("click", function () {
    signupModal.style.display = "block";
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  window.addEventListener("click", function (event) {
    if (event.target === signupModal) {
      closeModal();
    }
  });

  toggleLoginBtn.addEventListener("click", function () {
    toggleForm("Log In");
  });

  toggleSignupBtn.addEventListener("click", function () {
    toggleForm("Sign Up");
  });

  signupBtn.addEventListener("click", handleSignup);
  loginBtn.addEventListener("click", handleLogin);

  async function handleSignup() {
    const nameInput = document.getElementById("signupName");
    const emailInput = document.getElementById("signupEmail");
    const passwordInput = document.getElementById("signupPassword");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let errors = {};

    if (!name) {
      errors.name = "Name is required!";
    }
    if (!email) {
      errors.email = "Email is required!";
    } else if (!emailPattern.test(email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!password) {
      errors.password = "Password is required!";
    }

    clearFormErrors();

    if (Object.keys(errors).length > 0) {
      showErrors(errors);
    } else {
      const userData = {
        name: name,
        email: email,
        password: password,
      };

      fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => {
          if (res.ok) {
            alert("Registration Successful");
          } else {
            alert("Registration Invalid");
          }
          return res.json();
        })
        .then((data) => {
          localStorage.setItem("userData", JSON.stringify(data));
          console.log(localStorage.getItem("userData"));
        })
        .catch((error) => alert("Error"));

      const data = await handleApiRequest("signup", userData);
      alert(data);

      resetForm();
      closeModal();
    }
  }

  async function handleLogin() {
    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let errors = {};

    if (!email) {
      errors.email = "Email is required!";
    } else if (!emailPattern.test(email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!password) {
      errors.password = "Password is required!";
    }

    clearFormErrors();

    if (Object.keys(errors).length > 0) {
      showErrors(errors);
    } else {
      const loginData = { email: email, password: password };
      const data = await handleApiRequest("login", loginData);
      if (data?.error) alert(data.error);
      window.location.href = "login.html";

      console.log(data);
      resetForm();
      closeModal();
    }
  }
});

function closeModal() {
  signupModal.style.display = "none";
  clearFormErrors();
  resetForm();
}

function toggleForm(formType) {
  if (formType === "Sign Up") {
    nameField.style.maxHeight = "60px";
    title.innerHTML = "Sign Up";
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
  } else {
    nameField.style.maxHeight = "0";
    title.innerHTML = "Log In";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
  }
}

function clearFormErrors() {
  const inputs = document.querySelectorAll(".error");
  inputs.forEach((input) => {
    input.classList.remove("error");
    input.placeholder = input.getAttribute("data-placeholder") || "";
  });
}

function resetForm() {
  document.getElementById("signup-form").reset();
  document.getElementById("login-form").reset();
}
