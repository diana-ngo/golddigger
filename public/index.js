const connectionStatus = document.getElementById("connection-status");
const form = document.querySelector("form");
const dialog = document.querySelector(".outputs");
const closeDialogBtn = dialog.querySelector("button");
const priceDisplay = document.getElementById("price-display");
const investmentInput = document.getElementById("investment-amount");
const investmentSummary = document.getElementById("investment-summary");

let currentLivePrice = null;
let investmentAmt = null;
let ouncesPurchased = null;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // grab entered amount to invest
  investmentAmt = Number(investmentInput.value);
  currentLivePrice = Number(currentLivePrice);

  ouncesPurchased = (investmentAmt / currentLivePrice).toFixed(1);
  investmentSummary.textContent = `You just bought ${ouncesPurchased} ounces (ozt) for £${investmentAmt}. \n You will receive documentation shortly.`;

  // show modal when user clicks "Invest Now!" button
  dialog.showModal();
});

// when user clicks "Okay" on modal, reset input investment amount and close modal
closeDialogBtn.addEventListener("click", async () => { 
  document.getElementById("investment-amount").value = '';

  await fetch("/api/purchases", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      "amount paid": `£${investmentAmt}`,
      "price per oz": `£${currentLivePrice}`,
      "gold sold": `${ouncesPurchased} oz`,
    }),
  });

  dialog.close() 
});

export async function loadLivePrice() {
  const eventSource = new EventSource("/api/live-price");

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);

    currentLivePrice = data.price;

    connectionStatus.textContent = "Live Price 🟢";
    priceDisplay.textContent = data.price;
  }

  eventSource.onerror = () => {
    console.error(`Connection lost... Attemping to reconnect...`);
  }
}

loadLivePrice();