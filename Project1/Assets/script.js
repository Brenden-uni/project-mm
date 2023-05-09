function displayDateTime() {
  const now = new Date();
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  const date = now.toLocaleDateString('en-GB', options);
  const time = now.toLocaleTimeString();
  const datetime = `${date} ${time}`;
  return datetime;
}

const datetimeContainer = document.getElementById("dateandtime");
datetimeContainer.textContent = displayDateTime();

setInterval(() => {
  datetimeContainer.textContent = displayDateTime();
}, 1000);


function getCountryInfo() {
  var country = document.getElementById("country").value;

  var currencyUrl = "https://restcountries.com/v2/name/" + encodeURI(country) + "?fullText=true";
  fetch(currencyUrl)
    .then(response => response.json())
    .then(data => {
      var currency = data[0].currencies[0].name;
      document.getElementById("currency").innerHTML = "Your are from " + country + " and your currency is " + currency;
    });
}

function getCountryList() {
  var countryListUrl = "https://restcountries.com/v2/all";
  fetch(countryListUrl)
    .then(response => response.json())
    .then(data => {
      var select = document.getElementById("country");
      for (var i = 0; i < data.length; i++) {
        var option = document.createElement("option");
        option.value = data[i].name;
        option.text = data[i].name;
        select.add(option);
      }
    });
}

// Call the getCountryList() function when the page is loaded
window.onload = getCountryList;


const mainLink = document.getElementById('main-link');
mainLink.addEventListener('click', () => {
  location.reload();
});




const createButton = document.getElementById('create-btn');
const containerMain = document.getElementById('container-n');
const containerForm = document.getElementById('container-3');
createButton.addEventListener('click', function () {
  containerMain.style.display = 'none';
  containerForm.style.display = 'block';
});
const profileButton = document.getElementById('profile-btn');
const containerProfile = document.getElementById('container-5');
profileButton.addEventListener('click', function () {
  containerMain.style.display = 'none';
  containerProfile.style.display = 'block';
});
const submitButtonEl = document.getElementById('submitButtonEl');
submitButtonEl.addEventListener('click', getInformation);

//Create Function so submit button and select button do the same purpose
function getInformation(event) {
  event.preventDefault();
  const nameInputEl = document.getElementById('nameInputEl');
  const incomeInputEl = document.getElementById('incomeInputEl');
  const budgetInputEl = document.getElementById('budgetInputEl');
  const countryEl = document.getElementById('country');
  const name = nameInputEl.value;
  const income = incomeInputEl.value;
  const budget = budgetInputEl.value;
  const country = countryEl.value;
  const container3El = document.getElementById('container-3');
  container3El.style.display = 'none';
  const container4El = document.getElementById('container-4');
  container4El.style.display = 'block';
  const welcomeMsgEl = document.getElementById('welcome-msg');
  welcomeMsgEl.innerHTML = `Welcome <span><b>${name}</b></span>, <br> Your income is <span><b>${income}</b></span> <br>Your budget  is <span><b>${budget}</b></span>`;
  const informationEl = document.getElementById('information');
}

// Get the form and submit button elements
const form = document.querySelector('#container-3 form');
const submitButton = document.querySelector('#submitButtonEl');
// Add an event listener to the submit button
submitButton.addEventListener('click', function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  // Retrieve the time and date for the selected country
  const apiUrl = `https://timezoneapi.io/api/timezone/?apikey=${aWwymuIZdzpBFAcEvmrJ}&zone=${country}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Display the time and date to the user
      const time = data.data.datetime.time_24;
      const date = data.data.datetime.date;
      alert(`Current time and date in ${country}: ${time}, ${date}`);
    })
    .catch(error => {
      console.error('Error retrieving time and date:', error);
      alert('Error retrieving time and date. Please try again later.');
    });
>>>>>>> b1352b454e84e065a6420470765d14b36a913970
});

const nameInputEl = document.getElementById('nameInputEl');
const incomeInputEl = document.getElementById('incomeInputEl');
const budgetInputEl = document.getElementById('budgetInputEl');
const addExpenseBtnEl = document.getElementById('addExpenseBtn');
const formEl = document.getElementById('formEl');
const tableEl = document.querySelector('table');
const tbodyEl = document.querySelector('tbody');
const subtotalEl = document.getElementById("subtotal");
const countryEl = document.getElementById('country')

>>>>>>> b1352b454e84e065a6420470765d14b36a913970
// Create Function to add user input to a table

function addTable(e) {

  e.preventDefault();

  let date = document.getElementById('dateEl').value;
  let category = document.getElementById('categoryEl').value;
  let amount = document.getElementById('amountEl').value;

  tbodyEl.innerHTML += `
  <tr>
      <td>${date}</td>
      <td>${category}</td>
      <td>${amount}</td>
      <td><button class="removeBtn">remove</button></td>
  </tr>
  `;

  const profilesLocal = JSON.parse(localStorage.getItem("Profiles")) || [];

  // get the index of the selected profile
  const index = localStorage.getItem("SelectedProfileIndex");

  // add the expense to the selected profile
  profilesLocal[index].expenses.push({ date, category, amount });

  // save the profiles to local storage
  localStorage.setItem("Profiles", JSON.stringify(profilesLocal));

  tableEl.addEventListener('click', deleteRow);

  calculateSubtotal()
}

// function calculateSubtotal() {
//   let subtotal = 0;
//   let tableRows = document.querySelectorAll("#tableEl tr");
//   for (let i = 0; i < tableRows.length; i++) {
//     let amountCell = tableRows[i].querySelectorAll("td")[2];
//     let amount = parseFloat(amountCell.textContent);
//     subtotal += amount;
//   }
//   let budgetJson = localStorage.getItem('Profile');
//   let budgetData = JSON.parse(budgetJson);
//   let budget = parseFloat(budgetData.budget);
//   let remainingBudget = budget - subtotal;
//   let remainingBudgetEl = document.getElementById("remainingBudget");
//   remainingBudgetEl.textContent = "Your remaining budget is " + remainingBudget.toFixed(2);
//   let subtotalEl = document.getElementById("subtotal");
//   subtotalEl.textContent = "Subtotal: " + subtotal.toFixed(2);
// }

calculateSubtotal();

function deleteRow(e) {
  if (!e.target.classList.contains('removeBtn')) {
    return;
  }

  const btn = e.target;
  btn.closest('tr').remove();
  window.calculateSubtotal();

  const profilesLocal = JSON.parse(localStorage.getItem("Profiles")) || [];

  // get the index of the selected profile
  const index = localStorage.getItem("SelectedProfileIndex");

  // remove the expense from the selected profile
  const tableRows = tableEl.querySelectorAll("tr");
  const expenseIndex = Array.from(tableRows).indexOf(btn.closest("tr"));

  profilesLocal[index].expenses.splice(expenseIndex, 1);

  // save the profiles to local storage
  localStorage.setItem("Profiles", JSON.stringify(profilesLocal));
}

tableEl.addEventListener('click', deleteRow);

//Add event when user clicks add it will add into table

formEl.addEventListener("submit", addTable)

//Create a function for table row to dynamically add cost of expenses 

function calculateSubtotal() {
  let subtotal = 0;
  let tableRows = document.querySelectorAll("#tableEl tr");

  for (let i = 0; i < tableRows.length; i++) {
    let amountCell = tableRows[i].querySelectorAll("td")[2];
    let amount = parseFloat(amountCell.textContent);
    subtotal += amount;
  }

  let budgetJson = localStorage.getItem('formData');
  let budgetData = JSON.parse(budgetJson);
  let budget = parseFloat(budgetData.budget);
  let remainingBudget = budget - subtotal;

  let remainingBudgetEl = document.getElementById("remainingBudget");
  remainingBudgetEl.textContent = "Your remaining budget is " + remainingBudget.toFixed(2);

  let subtotalEl = document.getElementById("subtotal");
  subtotalEl.textContent = "Subtotal: " + subtotal.toFixed(2);
}

// get the required elements
const createBtn = document.getElementById("create-btn");
const profileBtn = document.getElementById("profile-btn");
const container3 = document.getElementById("container-3");
const container4 = document.getElementById("container-4");

// create an empty array to store the profiles
let profiles1 = [];

// handle form submission
submitButtonEl.addEventListener("click", (event) => {
  // prevent the default form submission behavior
  event.preventDefault();

  // get the values entered by the user
  const name = nameInputEl.value.trim();
  const income = incomeInputEl.value.trim();
  const budget = budgetInputEl.value.trim();
  const country = countryEl.value;

  // create a new profile object
  const profiles = {
    name,
    income: +income,
    budget: +budget,
    country,
    expenses: [],
  };

  const profilesLocal = JSON.parse(localStorage.getItem("Profiles")) || [];

  // add the profile to the array of profiles

  profilesLocal.push(profiles);


  localStorage.setItem("Profiles", JSON.stringify(profilesLocal));

  // show the main screen and hide the create profile screen
  container3.style.display = "none";
  document.getElementById("container-n").style.display = "none";

});
// handle profile button click
profileButton.addEventListener("click", () => {
  // hide the main screen and show the profile list screen
  document.getElementById("container-n").style.display = "none";
  document.getElementById("container-5").style.display = "block";
});

// Get a reference to the navbar element
const navbar = document.querySelector('nav');

// Get the name of the selected country from the profile form
const country = document.getElementById('country').value;

const profileTable = document.querySelector("#profile-table");
const tbody = profileTable.querySelector("tbody");
let profiles = JSON.parse(localStorage.getItem("Profiles")) || [];

function renderProfiles() {
  tbody.innerHTML = "";
  profiles.forEach((profile, index) => {
    const tr = document.createElement("tr");
    const name = document.createElement("td");
    const income = document.createElement("td");
    const budget = document.createElement("td");
    const country = document.createElement("td");
    const selectBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const actionsCell = document.createElement("td");

    name.innerText = profile.name;
    income.innerText = profile.income;
    budget.innerText = profile.budget;
    country.innerText = profile.country;

    selectBtn.innerText = "Select";
    selectBtn.addEventListener("click", () => {
      selectProfile(index);
    });

    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => {
      deleteProfile(index);
    });

    actionsCell.appendChild(selectBtn);
    actionsCell.appendChild(deleteBtn);

    tr.appendChild(name);
    tr.appendChild(income);
    tr.appendChild(budget);
    tr.appendChild(country);
    tr.appendChild(actionsCell);

    tbody.appendChild(tr);
  });
}

function selectProfile(index) {
  // save the index of the selected profile to local storage
  localStorage.setItem("SelectedProfileIndex", index);

  // Get the selected profile from local storage
  const data = JSON.parse(localStorage.getItem('Profiles'));
  const selectedProfile = data[index];

  // Get the input elements
  const nameInputEl = document.getElementById('nameInputEl');
  const incomeInputEl = document.getElementById('incomeInputEl');
  const budgetInputEl = document.getElementById('budgetInputEl');
  const countryEl = document.getElementById('country');

  // Get the values from the selected profile
  const name = selectedProfile.name;
  const income = selectedProfile.income;
  const budget = selectedProfile.budget;
  const country = selectedProfile.country;

  // Update the input elements with the retrieved values
  nameInputEl.value = name;
  incomeInputEl.value = income;
  budgetInputEl.value = budget;
  countryEl.value = country;

  // Render the expenses for the selected profile
  renderExpenses(selectedProfile.expenses);

  // Hide container 3 and show container 4
  const container3El = document.getElementById('container-3');
  container3El.style.display = 'none';
  const container4El = document.getElementById('container-4');
  container4El.style.display = 'block';

  // Update the welcome message with the retrieved values
  const welcomeMsgEl = document.getElementById('welcome-msg');
  welcomeMsgEl.innerHTML = `Welcome <span><b>${name}</b></span>, <br> Your income is <span><b>${income}</b></span> <br>Your budget  is <span><b>${budget}</b></span>`;

  // Get the information element
  const informationEl = document.getElementById('information');
  calculateSubtotal();
  document.getElementById("container-5").style.display = "none";
}

function deleteProfile(index) {
  profiles.splice(index, 1);
  localStorage.setItem("Profiles", JSON.stringify(profiles));
  renderProfiles();
}

renderProfiles();

function renderExpenses(expenses) {
  tbodyEl.innerHTML = "";
  expenses.forEach((expense) => {
    tbodyEl.innerHTML += `
      <tr>
        <td>${expense.date}</td>
        <td>${expense.category}</td>
        <td>${expense.amount}</td>
        <td><button class="removeBtn">remove</button></td>
      </tr>
    `;
  });
}

// Define a function to add a new expense to the specified profile
function addExpense(profile, expense) {
  // If the profile doesn't exist, create a new one
  if (!budget[profile]) {
    budget[profile] = {
      income: 0,
      expenses: [],
      balance: 0
    };
  }
  // Add the expense to the profile
  budget[profile].expenses.push(expense);
  // Update the balance for the profile
  budget[profile].balance = budget[profile].income - budget[profile].expenses.reduce((total, expense) => total + expense.amount, 0);
}

// Define a function to remove an expense from the specified profile
function removeExpense(profile, expenseIndex) {
  // If the profile doesn't exist or doesn't have any expenses, do nothing
  if (!budget[profile] || budget[profile].expenses.length === 0) {
    return;
  }
  // Remove the expense from the profile
  budget[profile].expenses.splice(expenseIndex, 1);
  // Update the balance for the profile
  budget[profile].balance = budget[profile].income - budget[profile].expenses.reduce((total, expense) => total + expense.amount, 0);
}