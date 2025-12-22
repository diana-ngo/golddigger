const connectionStatus = document.getElementById("connection-status");
const form = document.querySelector("form");
const dialog = document.querySelector(".outputs");
const closeDialogBtn = dialog.querySelector("button");
const priceDisplay = document.getElementById("price-display");
const investmentInput = document.getElementById("investment-amount");
const investmentSummary = document.getElementById("investment-summary");

let currentLivePrice = null;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // grab entered amount to invest
  const investmentAmt = Number(investmentInput.value);
  currentLivePrice = Number(currentLivePrice);

  const ouncesPurchased = (investmentAmt / currentLivePrice).toFixed(1);
  investmentSummary.textContent = `You just bought ${ouncesPurchased} ounces (ozt) for £${investmentAmt}. \n You will receive documentation shortly.`;



  // show modal when user clicks "Invest Now!" button
  dialog.showModal();
});

// when user clicks "Okay" on modal, reset input investment amount and close modal
closeDialogBtn.addEventListener("click", () => { 
  document.getElementById("investment-amount").value = '';
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