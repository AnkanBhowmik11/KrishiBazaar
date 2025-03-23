document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartTable = document.getElementById("cart-items");
    let totalAmount = 0;

    function updateCart() {
        cartTable.innerHTML = "";
        totalAmount = 0;

        cart.forEach((item, index) => {
            let row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.name}</td>
                <td>₹${item.pricePerKg}</td>
                <td>
                    <button onclick="updateQty(${index}, -1)" class="qty-btn">-</button>
                    <span class="qty">${item.quantity}</span>
                    <button onclick="updateQty(${index}, 1)" class="qty-btn">+</button>
                </td>
                <td>₹${(item.pricePerKg * item.quantity).toFixed(2)}</td>
                <td><button onclick="removeItem(${index})" class="remove-btn">Remove</button></td>
            `;

            cartTable.appendChild(row);
            totalAmount += item.pricePerKg * item.quantity;
        });

        document.getElementById("total-amount").innerText = `₹${totalAmount.toFixed(2)}`;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    window.updateQty = function (index, change) {
        if (cart[index].quantity + change > 0) {
            cart[index].quantity += change;
        } else {
            cart.splice(index, 1); // Remove item if qty becomes 0
        }
        updateCart();
    };

    window.removeItem = function (index) {
        cart.splice(index, 1);
        updateCart();
    };

    window.checkout = async function () {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
    
        let orderID = "KBZ-" + Date.now(); // Generate Unique Order ID
        let orderDetails = cart.map(item => `${item.name} x ${item.qty}`).join(", ");
        let amount = totalAmount.toFixed(2); // Ensure amount is formatted properly
    
        try {
            let response = await fetch("https://www.instamojo.com/api/1.1/payment-requests/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Api-Key": "efe95f1oid688aa5oiug9d0efad",  // 🔹 Replace with your API Key
                    "X-Auth-Token": "b45b3f969ijh89649deb5644" // 🔹 Replace with your Auth Token
                },
                body: JSON.stringify({
                    purpose: orderDetails, // 🛒 Product Names & Quantity
                    amount: amount, // 💰 Total Price
                    buyer_name: "Customer Name", // You can fetch this from a form
                    email: "customer@example.com", // Fetch email from form input
                    phone: "9999999999", // Fetch phone number from form input
                    redirect_url: "https://krishi-bazaar-sepia.vercel.app/krishibazaar.html", // ✅ After payment success
                    send_email: true,
                    allow_repeated_payments: false
                })
            });
    
            let data = await response.json();
            if (data.success) {
                window.location.href = data.payment_request.longurl; // ✅ Redirect to payment page
            } else {
                alert("Payment request failed! Try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again!");
        }
    };
    

    updateCart();
});
