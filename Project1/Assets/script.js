
const citiesEl = document.getElementById('country');
const url = 'https://restcountries.com/v2/all';
fetch(url)
  .then(response => response.json())
  .then(data => {
    data.forEach(country => {
      const optionEl = document.createElement('option');
      optionEl.textContent = country.name;
      citiesEl.appendChild(optionEl);
    });
  });

const countryEl = document.getElementById('country');
const dateEl = document.getElementById('dateEl');
const timeEl = document.getElementById('timeEl');

countryEl.addEventListener('change', () => {
  const country = countryEl.value;
  const url = `https://worldtimeapi.org/api/timezone/${country}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const datetime = data.datetime;
      const date = datetime.split('T')[0];
      const time = datetime.split('T')[1].substring(0, 5);
      dateEl.value = date;
      timeEl.value = time;
    })
    .catch(error => console.log(error));
});

function updateTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  timeEl.textContent = formattedTime;
}

setInterval(updateTime, 1000);

// get the element where you want to display the date and time
const dateTimeEl = document.getElementById('dateTimeEl');

// set the interval to update the date and time every second
setInterval(() => {
  // create a new Date object to get the current date and time
  const now = new Date();
  
  // format the date and time as a string
  const dateTimeString = now.toLocaleString();
  
  // display the date and time on the page
  dateTimeEl.innerText = dateTimeString;
}, 1000);

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
submitButtonEl.addEventListener('click', function (event) {
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
  welcomeMsgEl.innerHTML = `Welcome <span>${name}</span>, your remaining balance is <span>$${-(income - budget)}</span>`;
  const informationEl = document.getElementById('information');

  informationEl.innerHTML = `<div>
            <h2>In ${country}</h2>
            <p>Average Income: $999</p>
            <p>Average Expenses: $999</p>
        </div>`;
});

// Get the form and submit button elements
const form = document.querySelector('#container-3 form');
const submitButton = document.querySelector('#submitButtonEl');
// Add an event listener to the submit button
submitButton.addEventListener('click', function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  // Get the values from the form inputs
  const name = document.querySelector('#nameInputEl').value;
  const income = document.querySelector('#incomeInputEl').value;
  const budget = document.querySelector('#budgetInputEl').value;
  const country = document.querySelector('#country').value;
  // Create an object to represent the form data
  const formData = {
    name,
    income,
    budget,
    country
  };
  // Convert the object to a JSON string
  const formDataJson = JSON.stringify(formData);
  // Store the JSON string in local storage
  localStorage.setItem('formData', formDataJson);
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
});

const nameInputEl = document.getElementById('nameInputEl')
const incomeInputEl = document.getElementById('incomeInputEl')
const budgetInputEl = document.getElementById('budgetInputEl')
const addExpenseBtnEl = document.getElementById('addExpenseBtn')
const formEl = document.getElementById('formEl')
const tableEl = document.querySelector('table');
const tbodyEl = document.querySelector('tbody');
const subtotalEl = document.getElementById("subtotal");


document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('.collapsible');
  let instances = M.Collapsible.init(elems, {
    accordion: true
  });
});

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

  function deleteRow(e) {
    if (!e.target.classList.contains('removeBtn')) {
      return
    }

    const btn = e.target;
    btn.closest('tr').remove();
    calculateSubtotal()

  }

  tableEl.addEventListener('click', deleteRow);

  calculateSubtotal()

}

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

  let subtotalSpan = document.getElementById("subtotalSpan");
  subtotalSpan.textContent = "Subtotal: $" + subtotal.toFixed(2);
}

//log out function

document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('selectedProfile');
  window.location.href = './index.html';
});

// get the required elements
const createBtn = document.getElementById("create-btn");
const profileBtn = document.getElementById("profile-btn");
const container3 = document.getElementById("container-3");
const container4 = document.getElementById("container-4");

// create an empty array to store the profiles
let profiles1 = [];

// handle submit button click
submitButtonEl.addEventListener("click", (event) => {
  // prevent the default form submission behavior
  event.preventDefault();
  // get the values entered by the user
  const name = nameInputEl.value.trim();
  const income = incomeInputEl.value.trim();
  const budget = budgetInputEl.value.trim();
  const country = countryEl.value;
  // validate the inputs
  if (!name || !income || !budget || !country) {
    alert("Please enter all the required fields.");
    return;
  }
  if (isNaN(income) || isNaN(budget)) {
    alert("Please enter a valid number for income and budget.");
    return;
  }
  // create a new profile object
  const profiles = {
    name,
    income: +income,
    budget: +budget,
    country,
    expenses: []
  };
  // add the profile to the array of profiles
  profiles.push(profiles1);
  // show the main screen and hide the create profile screen
  container3.style.display = "none";
  document.getElementById("container-n").style.display = "flex";
});

// handle profile button click
profileBtn.addEventListener("click", () => {
  // hide the main screen and show the profile list screen
  document.getElementById("container-n").style.display = "none";
  document.getElementById("container-5").style.display = "block";
});

// handle select profile button click
const selectProfileBtns = document.querySelectorAll(".select");
selectProfileBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    // set the selected profile in local storage
    localStorage.setItem("selectedProfile", JSON.stringify(profiles[index]));
    // show the main screen and hide the profile list screen
    document.getElementById("container-5").style.display = "none";
    container4.style.display = "block";
    // display the name and budget of the selected profile
    document.querySelector("#welcome-msg span").textContent = profiles1[index].name;
    document.querySelector("#welcome-msg span:last-child").textContent = profiles1[index].budget;
  });
});

// Get a reference to the navbar element
const navbar = document.querySelector('nav');

// Get the name of the selected country from the profile form
const country = document.getElementById('country').value;
