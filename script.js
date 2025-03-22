document.addEventListener("DOMContentLoaded", function () {
  const stateDropdown = document.getElementById("state");
  const districtDropdown = document.getElementById("district");
  const cropSelect = document.getElementById("crop");
  const cropRate = document.getElementById("cropRate");
  
  // State and District Data
  const data = {
      "West Bengal": ["Kolkata", "Howrah", "Darjeeling", "Bardhaman", "Siliguri"],
      "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Purnia"],
      "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"]
  };

  // Crop rates
  const rates = {
      "Rice": "₹1500 per Quintal",
      "Wheat": "₹1800 per Quintal",
      "Sugarcane": "₹2500 per Quintal"
  };

  // Populate states dynamically
  stateDropdown.innerHTML = "<option value=''>--Select State--</option>";
  Object.keys(data).forEach(state => {
      let option = document.createElement("option");
      option.value = state;
      option.textContent = state;
      stateDropdown.appendChild(option);
  });

  // Populate districts based on selected state
  stateDropdown.addEventListener("change", function () {
      const selectedState = this.value;
      districtDropdown.innerHTML = "<option value=''>--Select District--</option>";

      if (selectedState && data[selectedState]) {
          data[selectedState].forEach(district => {
              let option = document.createElement("option");
              option.value = district;
              option.textContent = district;
              districtDropdown.appendChild(option);
          });
      }
  });

  // Update crop rate on selection
  cropSelect.addEventListener("change", function () {
      if (cropSelect.value in rates) {
          cropRate.textContent = `Our Rate: ${rates[cropSelect.value]}`;
          document.getElementById("rates-info").classList.remove("hidden");
      } else {
          document.getElementById("rates-info").classList.add("hidden");
      }
  });
});
