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
        "West Bengal": ["Kolkata", "Howrah", "Darjeeling"],
        "Bihar": ["Patna", "Gaya", "Muzaffarpur"],
        "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"]
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
