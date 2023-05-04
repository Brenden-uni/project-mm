
const nameInputEl = document.getElementById('nameInputEl')
const citiesEl = document.getElementById('citiesEl')
const incomeInputEl = document.getElementById('incomeInputEl')
const budgetInputEl = document.getElementById('budgetInputEl')

fetch("https://restcountries.com/v3.1/all")
  .then(res => {
    return res.json();
  })
  .then(data =>{
    data.forEach(country =>{
      const markup = `<option>${country.name.official}</option>`;
      citiesEl.insertAdjacentHTML('beforeend', markup)
    });
    console.log(data)
  })
  .catch(error=> console.log (error));


