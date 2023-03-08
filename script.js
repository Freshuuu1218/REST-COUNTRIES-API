const flags = document.querySelector('#flags');
fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data=>show(data))


function show(data) {
    console.log(data[0])
    data.forEach(country =>{
        let flag = document.createElement('div');
        let countryFlag = country.flags.png;
        let countryName = country.name.common;
        let countryPopulation = country.population.toLocaleString('en-GB');
        let countryRegion = country.region;
        let countryCapital = country.capital;
        flag.classList.add('flag');
        flag.innerHTML = 
        `<div class="top">
                        <img src="${countryFlag}" alt="flag">
                    </div>
                    <div class="bottom">
                        <h2>${countryName}</h2>
                        <p><strong>Population:</strong> ${countryPopulation}</p>
                        <p><strong>Region:</strong> ${countryRegion}</p>
                        <p><strong>Capital:</strong> ${countryCapital}</p>
                    </div>`;
        flags.appendChild(flag);

    })
}