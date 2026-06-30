let amtInput = document.querySelector("#amount");
let fromSelect = document.querySelector("#from-select");
let toSelect = document.querySelector("#to-select");
let button = document.querySelector("#btn");
let flagFrom = document.querySelector("#from-flag");
let flagTo = document.querySelector("#to-flag");
let errorMsg = document.querySelector("#error");
let convertedMsg = document.querySelector(".msg");
let swapButton = document.querySelector("#swap-btn");

button.addEventListener("click", async (e) => {
  errorMsg.innerText = "";
  e.preventDefault();
  let enteredAmt = amtInput.value;
  if (enteredAmt < 0 || enteredAmt === "" || enteredAmt === "0") {
    errorMsg.innerText = "Please Enter a valid amount and try again.";
    return;
  }
  let fromCountry = fromSelect.value.toLowerCase();
  let toCountry = toSelect.value.toLowerCase();

  const FROM_URL = `https://latest.currency-api.pages.dev/v1/currencies/${fromCountry}.json`;

  let response = await fetch(FROM_URL);
  let data = await response.json();
  let exchangeRate = data[fromCountry][toCountry];

  let convertedAmt = parseFloat(enteredAmt) * exchangeRate;
  convertedMsg.innerText = `${enteredAmt}  ${fromCountry.toUpperCase()} = ${convertedAmt.toFixed(2)} ${toCountry.toUpperCase()}`;
});

for (currencyCode of Object.keys(countryList)) {
  let fromOption = document.createElement("option");

  fromOption.value = currencyCode;
  fromOption.innerText = currencyCode;
  fromSelect.append(fromOption);
}
for (currencyCode of Object.keys(countryList)) {
  let toOption = document.createElement("option");

  toOption.value = currencyCode;
  toOption.innerText = currencyCode;
  toSelect.append(toOption);
}

function updateFlag(selectElement, imageElement) {
  let currencyCode = selectElement.value;
  let countryCode = countryList[currencyCode];

  const newFlagURL = `https://flagsapi.com/${countryCode}/flat/64.png`;
  imageElement.src = newFlagURL;
}

fromSelect.addEventListener("change", (e) => {
  updateFlag(fromSelect, flagFrom);
});

toSelect.addEventListener("change", (e) => {
  updateFlag(ToSelect, flagTo);
});

swapButton.addEventListener("click", () => {
  let tempFrom = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = tempFrom;
  updateFlag(fromSelect, flagFrom);
  updateFlag(toSelect, flagTo);
});

fromSelect.value = "USD";
toSelect.value = "INR";
