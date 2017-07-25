const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];   //tworzymy pusty array

fetch(endpoint)      //fetch to nowa funkcja pomagająca w obsłudze json
    .then(blob => blob.json())   // przypisujemy do blob json
    .then(data => cities.push(...data)); // następnie do pustego naszego array dodajemy dane z endpoin 


function findMatches(wordToMatch, cities) {  //funkcja służąca do wyszukiwania miast z cities pasujących do wpisanych liter
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');    // regularne wyrażenie, które będzie używane do wyszukiwania (wordToMatch)
        return place.city.match(regex) || place.state.match(regex);  // wyszukanie po dopasowaniu do miasta lub stanu
    });
}

function displayMatches(){
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        return `
        <li>
            <span class="name">${place.city}, ${place.state}</span>
            <span class="population">${place.population}</span>
        </li> 
`;
    }).join(''); //dzięki temu cała wyszukana tablica zostanie zamieniona w jeden string
    sugestions.innerHTML = html;  // czyli do sugestions dodajemy html który zdefiniowaliśmy wczesniej
}

const searchInput = document.querySelector('.search');
const sugestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);  // nasłuch po odkliknięciu okna
searchInput.addEventListener('keyup', displayMatches);   // nasłuch i wyszukiwanie zawsze kiedy wpisana litera