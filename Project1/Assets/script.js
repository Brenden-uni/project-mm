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