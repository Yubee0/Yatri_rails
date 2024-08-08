
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
  
  document.querySelector(".logout").addEventListener("click", function () {
    window.location.href = "yatriknits.html";
  });