const flags = document.querySelector('#flags');
const filter = document.querySelector('#filter');
const country = document.querySelector('#name');
const options = document.querySelectorAll('option');
const modeSwitch = document.querySelector('#modeSwitch');
const root = document.querySelector(':root');
const moon = document.querySelector('header label');
const details = document.querySelector('#details');
const allFlags = document.querySelector('#allFlags');
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
    //create all flags
    flags.innerHTML = "";
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
        flag.addEventListener('click',(e)=>{
            const clickedCountryName = e.target.offsetParent.children[1].children[0].innerHTML
            fetch(`https://restcountries.com/v3.1/name/${clickedCountryName}`)
            .then(response => response.json())
            .then(data=>showDetails(data))
            allFlags.style.display='none';
            details.style.display='flex';
        })
    })

}        

function showDetails(data){
    //fix for USA and China (more than 1 country in API when fetched)
    let count = 0;
    data.length > 1 ? count = 1 : count = 0;
    //flag
    let countryFlag = data[count].flags.png;
    //name
    let countryName = data[count].name.common;
    //native name
    let nativeNames = data[count].name.nativeName
    let nativeName = Object.values(nativeNames)[0].common
    
    //population
    let countryPopulation = data[count].population.toLocaleString('en-GB');
    //region & subregion
    let countryRegion = data[count].region;
    let countrySubregion = data[count].subregion;
    //capital
    let countryCapital = data[count].capital;
    //tld
    let tld = data[count].tld;
    console.log(data)
    //currencies
    let currencies = data[count].currencies;
    let currency = Object.values(currencies);
    let countryCurrency = [];
    currency.forEach(currency=>{
        countryCurrency.push(currency.name);
    })
    console.log(countryCurrency)
    //languages
    let languages = data[count].languages;
    let language = Object.values(languages);
    let countryLanguages =[]
    language.forEach(language=>{
        countryLanguages.push(language);
    })
    details.innerHTML =
    `       <button class="back">
                <i class="fas fa-arrow-left"></i>
                <span>Back</span>
            </button>
            <div class="details-content">
                <div class="details-flag">
                    <img src="${countryFlag}" alt="flag">
                </div>
                <div class="details-data">
                    <div class="details-info">
                        <h2>${countryName}</h2>
                        <div class="country-info">
                            <div class="first-section">
                                <p><span>Native Name: </span>${nativeName}</p>
                                <p><span>Population: </span>${countryPopulation}</p>
                                <p><span>Region: </span>${countryRegion}</p>
                                <p><span>Sub Region: </span>${countrySubregion}</p>
                                <p><span>Capital: </span>${countryCapital}</p>
                            </div>
                            <div class="second-section">
                                <p><span>Top Level Domain: </span> ${tld}</p>
                                <p><span>Currencies: </span> ${countryCurrency}</p>
                                <p><span>Languages: </span> ${countryLanguages}</p>
                            </div>
                        </div>
                    </div>
                    <div class="details-borders">
                        <strong>Border Countries: </strong>
                        <div class="boxes"></div>
                    </div>
                </div>
            </div>`
    //borders
    const bordesBoxes = document.querySelector('.boxes')
    let borders = data[count].borders
    borders.forEach(border=>{
        let borderBox = document.createElement('div')
        borderBox.classList.add('borderBox');
        borderBox.innerHTML = border
        bordesBoxes.appendChild(borderBox)
        borderBox.addEventListener('click',()=>{
            fetch(`https://restcountries.com/v3.1/alpha?codes=${border}`)
            .then(response => response.json())
            .then(data=>showDetails(data))
        })
    })
    //back button
    const back = document.querySelector('button.back')
    back.addEventListener('click',()=>{
            fetch(`https://restcountries.com/v3.1/all`)
            .then(response => response.json())
            .then(data=>show(data))
            allFlags.style.display='block';
            details.style.display='none';
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
