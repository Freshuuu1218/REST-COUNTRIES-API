const flags = document.querySelector('#flags');
const filter = document.querySelector('#filter');
const country = document.querySelector('#name');
const options = document.querySelectorAll('option');
const modeSwitch = document.querySelector('#modeSwitch');
const root = document.querySelector(':root');
const moon = document.querySelector('header label');
    //display on start
    fetch(`https://restcountries.com/v3.1/all`)
    .then(response => response.json())
    .then(data=>show(data))
    //filter changes
    filter.addEventListener('input',()=>{
        country.value = "";
        if(filter.value ==="all"){
            fetch(`https://restcountries.com/v3.1/all`)
            .then(response => response.json())
            .then(data=>show(data))
        }else{
            fetch(`https://restcountries.com/v3.1/region/${filter.value}`)
            .then(response => response.json())
            .then(data=>show(data))
        }
    
})
    //input changes
    country.addEventListener('input',()=>{
        if(country.value === ''){
            fetch(`https://restcountries.com/v3.1/all`)
            .then(response => response.json())
            .then(data=>show(data)) 
        }else{
            options[0].setAttribute('selected', true)
            console.log(`https://restcountries.com/v3.1/name/${country.value}`)
            fetch(`https://restcountries.com/v3.1/name/${country.value}`)
            .then(response => response.json())
            .then(data=>show(data))
        }
        
    })


// function for create and display country
function show(data) {
    flags.innerHTML = ""
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

// theme switch
modeSwitch.addEventListener('input',()=>{
    if(modeSwitch.checked){
        root.style.setProperty('--element','hsl(209, 23%, 22%)')
        root.style.setProperty('--background','hsl(207, 26%, 17%)')
        root.style.setProperty('--text','hsl(0, 0%, 100%)')
        root.style.setProperty('--input','hsl(0, 0%, 100%)')
        moon.innerHTML = '<i class="fas fa-moon"></i>'

    }else{
        root.style.setProperty('--element','hsl(0, 0%, 100%)')
        root.style.setProperty('--background','hsl(0, 0%, 98%)')
        root.style.setProperty('--text','hsl(200, 15%, 8%)')
        root.style.setProperty('--input','hsl(0, 0%, 52%)')
        moon.innerHTML = '<i class="far fa-moon"></i>'

    }
})