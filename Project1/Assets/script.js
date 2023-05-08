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
      const createButton = document.getElementById('create-btn');
      const containerMain = document.getElementById('container-n');
      const containerForm = document.getElementById('container-3');
      createButton.addEventListener('click', function() {
        containerMain.style.display = 'none';
        containerForm.style.display = 'block';
      });
      const profileButton = document.getElementById('profile-btn');
      const containerProfile = document.getElementById('container-5');
      profileButton.addEventListener('click', function() {
        containerMain.style.display = 'none';
        containerProfile.style.display = 'block';
      });
    const submitButtonEl = document.getElementById('submitButtonEl');
    submitButtonEl.addEventListener('click', function(event) {
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
      welcomeMsgEl.innerHTML = `Welcome <span>${name}</span>, your remaining balance is <span>$${-(income-budget)}</span>`;
      const informationEl = document.getElementById('information');

      informationEl.innerHTML = `<div>
            <h2>In ${country}</h2>
            <p>Average Income: $999</p>
            <p>Average Expenses: $999</p>
        </div>`;
    });


  // const mainLink = document.getElementById('main-link');
  // mainLink.addEventListener('click', () => {
  //   location.reload();
  // });


  // Get the form and submit button elements
const form = document.querySelector('#container-3 form');
const submitButton = document.querySelector('#submitButtonEl');
// Add an event listener to the submit button
submitButton.addEventListener('click', function(event) {
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