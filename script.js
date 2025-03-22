document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("sell-stubble-form");
    const cropSelect = document.getElementById("crop");
    const cropRate = document.getElementById("cropRate");
    const stateDropdown = document.getElementById("state");
    const districtDropdown = document.getElementById("district");
    const popup = document.getElementById("popupMessage");
  
    // 🌾 Crop rates
    const rates = {
      "Rice": "₹1500 per Quintal",
      "Wheat": "₹1800 per Quintal",
      "Sugarcane": "₹2500 per Quintal"
    };
  
    // 📌 Update rate on crop change
    cropSelect.addEventListener("change", function () {
      if (cropSelect.value in rates) {
        cropRate.textContent = `Our Rate: ${rates[cropSelect.value]}`;
        document.getElementById("rates-info").classList.remove("hidden");
      } else {
        document.getElementById("rates-info").classList.add("hidden");
      }
    });
  
    // 🌍 State and District Data
    const data = {
        "West Bengal": ["Kolkata", "Howrah", "Darjeeling", "Siliguri", "Asansol"],
        "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Begusarai"],
        "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"]  
    };
  
    // 🏛️ Populate states dynamically
    stateDropdown.innerHTML = "<option value='' disabled selected>Select your state</option>";
    Object.keys(data).forEach(state => {
      let option = document.createElement("option");
      option.value = state;
      option.textContent = state;
      stateDropdown.appendChild(option);
    });
  
    // 📌 Populate districts dynamically
    stateDropdown.addEventListener("change", function () {
      const selectedState = this.value;
      districtDropdown.innerHTML = "<option value='' disabled selected>Select your district</option>";
  
      if (selectedState && data[selectedState]) {
        data[selectedState].forEach(district => {
          let option = document.createElement("option");
          option.value = district;
          option.textContent = district;
          districtDropdown.appendChild(option);
        });
      }
    });
  
    // 📄 Handle form submission
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent actual submission
      const fullName = document.getElementById("fullName").value.trim();
  
      if (fullName === "") {
        alert("Please enter your full name before submitting.");
        return;
      }
  
      // 🏷️ Show popup message
      popup.textContent = "We will get back to you soon...";
      popup.classList.remove("hidden");
  
      // ⏳ Hide popup after 2 seconds
      setTimeout(() => {
        popup.classList.add("hidden");
      }, 2000);
  
      // 🧹 Clear form fields
      form.reset();
      document.getElementById("rates-info").classList.add("hidden"); // Hide rate info
    });
  });
  
  import axios from "axios";
  import { API_URL } from "./config.js"; // Ensure your API URL is in config.js
  import CryptoJS from "crypto-js"; // Ensure you've installed crypto-js
  
  // Hash the password before sending
  const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString();
  };
  
  // 📝 Signup Functionality
  export async function signup(name, mobile, email, password) {
    try {
      const response = await axios.post(API_URL, {
        action: "signup", // Specify action for the backend
        name: name,
        mobile: mobile,
        email: email,
        password: hashPassword(password), // Hash the password
      });
  
      if (response.data.status === "success") {
        console.log("Signup successful:", response.data.message);
        alert("Signup successful! Welcome, " + name + "!");
      } else {
        console.error("Signup error:", response.data.message);
        alert(response.data.message); // Display error message from backend
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again later.");
    }
  }
  
  // 🔑 Login Functionality
  export async function login(email, password) {
    try {
      const response = await axios.post(API_URL, {
        action: "login", // Specify action for the backend
        email: email,
        password: hashPassword(password), // Hash the password
      });
  
      if (response.data.status === "success") {
        console.log("Login successful:", response.data.message);
        alert("Login successful! Welcome back!");
      } else {
        console.error("Login error:", response.data.message);
        alert(response.data.message); // Display error message from backend
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again later.");
    }
  }
  
  // Example integration for Signup and Login forms
  document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");
  
    // 📄 Handle Signup Form Submission
    if (signupForm) {
      signupForm.addEventListener("submit", function (event) {
        event.preventDefault();
  
        const name = document.getElementById("name").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
  
        signup(name, mobile, email, password);
      });
    }
  
    // 🔑 Handle Login Form Submission
    if (loginForm) {
      loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
  
        const email = document.getElementById("email-login").value.trim();
        const password = document.getElementById("password-login").value.trim();
  
        login(email, password);
      });
    }
  });