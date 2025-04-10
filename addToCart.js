

        function addToCart(productName, productPrice, productImage) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
            let existingProduct = cart.find(item => item.name === productName);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }
        
            localStorage.setItem("cart", JSON.stringify(cart));
        
            // Show popup with smooth animation
            showCartPopup(productName);
        }
        
        document.querySelectorAll('.a').forEach(button => {
            button.addEventListener('click', () => {
                const productContainer = button.closest('.c-1');
                const productName = productContainer.querySelector("p:nth-of-type(1)").innerText;
                const productPrice = parseInt(productContainer.querySelector("p:nth-of-type(2)").innerText.replace("Rs.", ""));
                const productImage = productContainer.querySelector("img").src;
        
                addToCart(productName, productPrice, productImage);
            });
        });
        
        function showCartPopup(productName) {
            let popup = document.createElement("div");
            popup.innerHTML = `✅ ${productName} added to cart!`;
            popup.style.position = "fixed";
            popup.style.top = "50%";
            popup.style.left = "50%";
            popup.style.transform = "translate(-50%, -50%)";
            popup.style.background = "#28a745";
            popup.style.color = "#fff";
            popup.style.padding = "15px 20px";
            popup.style.borderRadius = "10px";
            popup.style.fontSize = "18px";
            popup.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.3)";
            popup.style.transition = "all 1s ease-in-out"; // Smooth transition
        
            document.body.appendChild(popup);
        
            // After 2 seconds, start moving to the right corner smoothly
            setTimeout(() => {
                popup.innerHTML = "🛒";
                popup.style.width = "50px";
                popup.style.height = "50px";
                popup.style.borderRadius = "50%";
                popup.style.fontSize = "24px";
                popup.style.display = "flex";
                popup.style.alignItems = "center";
                popup.style.justifyContent = "center";
                popup.style.background = "#f4b400"; // Cart color
                popup.style.bottom = "20px";
                popup.style.right = "20px";
                popup.style.left = "unset";
                popup.style.top = "unset";
                popup.style.transform = "scale(1.2)"; // Slightly enlarge for effect
                popup.style.cursor = "pointer";
                popup.onclick = () => {
                    window.location.href = "My_Carts.html";
                };
            }, 2000); // Wait 2 seconds before moving
        
            // After another 1 second, shrink back to normal size smoothly
            setTimeout(() => {
                popup.style.transform = "scale(1)";
            }, 3000); // 2 sec delay + 1 sec transition
        
            // Remove after 5 seconds (2 seconds in center + 3 seconds on right)
            setTimeout(() => {
                popup.remove();
            }, 5000);
        }
        
        function proceedToCheckout() {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }
            window.location.href = "/payment.html";
        }
        