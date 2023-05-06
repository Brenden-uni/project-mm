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
      welcomeMsgEl.innerHTML = `Welcome <span>${name}</span>, your remaining budget is <span>$${budget - income}</span>`;
    
      const informationEl = document.getElementById('information');
      informationEl.innerHTML = `<div>
            <h2>In ${country}</h2>
            <p>Average Income: $999</p>
            <p>Average Expenses: $999</p>
        </div>`;
    });