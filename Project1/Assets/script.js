
const nameInputEl = document.getElementById('nameInputEl')
const citiesEl = document.getElementById('citiesEl')
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



