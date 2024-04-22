// document.getElementById("flexSwitchCheckDefault").addEventListener("change", function () {
//   let priceElements = document.querySelectorAll(".price b");
//   priceElements.forEach((price) => {
//     let currentPrice = parseFloat(price.innerText.replace("₹", "").replace(",", ""));
//     let gst = (currentPrice * 18) / 100;
//     let newPrice = currentPrice + gst;

//     if (this.checked) {
//       price.innerText = "₹" + newPrice.toLocaleString("en-IN") + " / night";
//     } else {
//       price.innerText = "₹" + currentPrice.toLocaleString("en-IN") + " / night";
//     }
//   });
// });
