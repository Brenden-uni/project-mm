
const nameInputEl = document.getElementById('nameInputEl')
const citiesEl = document.getElementById('citiesEl')
const incomeInputEl = document.getElementById('incomeInputEl')
const budgetInputEl = document.getElementById('budgetInputEl')
const addExpenseBtnEl = document.getElementById('addExpenseBtn')
const formEl = document.getElementById('formEl')


// fetch("https://restcountries.com/v3.1/all")
//   .then(res => {
//     return res.json();
//   })
//   .then(data =>{
//     data.forEach(country =>{
//       const markup = `<option>${country.name.official}</option>`;
//       citiesEl.insertAdjacentHTML('beforeend', markup)
//     });
//     console.log(data)
//   })
//   .catch(error=> console.log (error));

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems, {
    accordion: true
  });
});

// Create Function to add user input to a table

function addTable(e) {

  e.preventDefault();
  const tbodyEl = document.querySelector('tbody');
  const tableEl = document.querySelector('table');

  const date = document.getElementById('dateEl').value;
  const category = document.getElementById('categoryEl').value;
  const amount = document.getElementById('amountEl').value;

  tbodyEl.innerHTML += `
  <tr>
      <td>${date}</td>
      <td>${category}</td>
      <td>$${amount}</td>
      <td><button class="removeBtn">remove</button></td>
  </tr>
  `;

  function deleteRow(e){
    if (!e.target.classList.contains('removeBtn')){
      return
    }
    
    const btn = e.target;
    btn.closest('tr').remove();

  }

  tableEl.addEventListener('click', deleteRow);
}

//Add event when user clicks add it will add into table

formEl.addEventListener("submit", addTable)


