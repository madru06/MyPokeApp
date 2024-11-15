let container = document.getElementById("cardsContainer");

function getAll(page = null) {
    let GETTING_ALL_URL = page === null ? "https://pokeapi.co/api/v2/pokemon/" : page;
    axios.get(`${GETTING_ALL_URL}`)
    .then(function (response) {
        let result = response.data.results;
        container.innerHTML = '';
        result.forEach((x)=>{
            getPokemon(x.url);
        });
        initNavs(response.data.previous, response.data.next)
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
    });  
}
function getPokemon(poke_url) {
    axios.get(`${poke_url}`
    )
    .then(function (response) {
        renderCard(response.data);
    })
    .catch(function (error) {
        console.log(error);
        container.innerHTML =  `
            <div class="s12 card-panel deep-purple lighten-2 white-text ">No results</div>
        `;
    });
}
function renderCard(data) {
    let container = document.getElementById("cardsContainer");
    let title = data.name;
    let types = [];
    let abilities = [];
    let moves = [];

    data.types.forEach((x)=>{
        let template = `
            <div class="chip deep-purple lighten-2 white-text capitalized"> ${x.type.name} </div>
        `;
        types.push(template);
    });

    data.abilities.forEach((x)=>{
        let template = `<div class="chip deep-purple lighten-2 white-text capitalized">${x.ability.name}</div>`;
        abilities.push(template);
    });

    container.innerHTML += `
        <div class=" col s12 m3 l4 xl3">
            <div class="card hoverable z-depth-1 deep-purple lighten-5 rounded">
                <div class="card-image waves-effect waves-block waves-purple white">
                    <span class="badge deep-purple white-text right"># ${data.order}</span>
                    <img src="${data.sprites.front_default}" class="activator" data-id="${data.id} alt="Main ${data.name} picture">
                </div>
                <div class="card-content activator waves-effect waves-block waves-purple">
                    <span class="card-title grey-text text-darken-4 capitalized activator">${title}</span>
                    ${types.join("")}
                </div>
                <div class="card-reveal purple darken-4 white-text" data-id="">
                    <img src="${data.sprites.back_default}" class="rounded deep-purple lighten-2" data-id="${data.id} alt="Main ${data.name} picture">
                    
                    <span class="card-title white-text text-darken-4 capitalized">${title} <i class="fa-solid fa-xmark right"></i> </span>
                    <div class="divider"></div>
                    <p>Height: <span class="badge deep-purple lighten-2 white-text rounded">${data.height}</span> </p>
                    <p>Weight: <span class="badge deep-purple lighten-2 white-text rounded">${data.weight}</span> </p>
                    <p>Abilities:</p>
                    <div>${abilities.join("")}</div>
                    <br/>
            
                </div>
            </div>
        </div>
    `;
}
function initNavs(prev = null, next = null) {
    let btnPrev = document.getElementById("btnPrev");
    let btnNext = document.getElementById("btnNext");

    btnPrev.disabled = prev === null;
    btnPrev.dataset.url = prev;

    btnNext.disabled = next === null;
    btnNext.dataset.url = next;
}
function loadData(el){
    let newUrl = el.dataset.url;
    getAll(newUrl);
}
function getByName(PAGE_URL) {
    let inpSearchBy = document.getElementById("inpPokeSearch").value;

    if(inpSearchBy === null || inpSearchBy === ""){
        alert("error!")
    }     
    else{
        container.innerHTML = '';
        getPokemon(PAGE_URL);
        initNavs(null, null);
    }
}

document.getElementById("fmSearchBy").addEventListener("submit", ((ev)=>{
    ev.preventDefault()
    let self = ev.target;
    let inpSearchBy = document.getElementById("inpPokeSearch").value;
    if(inpSearchBy === null || inpSearchBy === ""){
        getAll();
    }else{
        let newUrl = `https://pokeapi.co/api/v2/pokemon/${inpSearchBy.toLowerCase()}`
        getByName(newUrl);
    }

}), false);
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {preventScrolling: false});
});
function cleanSearch() {
    let inptSearch = document.getElementById("inpPokeSearch");
    inptSearch.value != "" ? getAll() : "" ;
    inptSearch.value = "";
   
}
getAll();
    