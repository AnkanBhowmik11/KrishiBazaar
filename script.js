document.addEventListener("DOMContentLoaded", function () {
  const stateDropdown = document.getElementById("state");
  const districtDropdown = document.getElementById("district");
  const cropSelect = document.getElementById("crop");
  const cropRate = document.getElementById("cropRate");
  
  // State and District Data
  const data = {
      "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"],
      "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
      "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela-Kharsawan", "Simdega", "West Singhbhum"]
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
