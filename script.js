let recipeUrl='https://api.edamam.com/search'
let appId='4368d7f2'
let apiKey='05ecbbc4506fdc8681ed7f7c905b3064'
let totalResults=10

function getRecipes(query, dietFilter){
    let params={
        q: query,
        app_id: appId,
        app_key: apiKey,
        to: totalResults,
    
    };

    if(dietFilter){
        params.health = dietFilter

    }
    let queryString=formatQuery(params)
    let url=recipeUrl + '?' + queryString;
    console.log(url);

    fetch(url)
    .then(response=>{
        if (response.ok){
            return response.json();
        }
        throw new Error (response.statusText);
    })
    .then(responseJson=>displayRecipes(responseJson))
    .catch (err => alert(`Something went wrong`));
}


function formatQuery(params){
    let queryItems=Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&')

}

function displayRecipes(responseJson){
    console.log(responseJson)
    let ingredients=responseJson.hits[i].recipe.ingredientLines.map((a)=>{
        return`<div>
        <h3>Ingredients</h3>
        <ul id="js-ingredients">
        <li>${a}</li>
        </ul>
        < /div>`;
    })
    for(let i=0; i<responseJson.hits.length; i++){
        $('#js-results').append(`<div><h3>${responseJson.hits[i].recipe.label}</h3>
        <img src="${responseJson.hits[i].recipe.image}" class="child"> 
        <div>
          <ul>
          <li>Serving Size:</li>
          <li>Diet Labels:${responseJson.hits[i].recipe.healthLabels}</li>
          </ul>
        </div>
        <div>
        ${ingredients.join('')}
        </div>` 
        )};
    $('#js-results').removeClass('hidden');
}

/*
      <section class="child">
        <h3>Beer Recomendations based of your recipe....</h3>
        <div>
          <h4>Beer Rec #1</h4>
          <img src="gnocchi.jpg" alt="gnocchi" width="50%">
          <p>"This straight-up US style pale ale uses some of our <br>
              favourite hops against a toasty malt base. We brewed this <br>
            with Sir Tom Hunter at our Fraserburgh brewery - to add a <br>
            charitable element to your own version, feel free to share <br>
            this citrusy pale ale with your friends. Or don't, it's your choice."</p>
        </div>
        <div>
          <h4>Beer Rec #2</h4>
          <img src="gnocchi.jpg" alt="gnocchi" width="50%">
          <p>"This straight-up US style pale ale uses some of our <br>
            favourite hops against a toasty malt base. We brewed this <br>
            with Sir Tom Hunter at our Fraserburgh brewery - to add a <br>
            charitable element to your own version, feel free to share <br>
            this citrusy pale ale with your friends. Or don't, it's your choice."</p>
        </div>
        <div>
          <h4>Beer Rec #3</h4>
          <img src="gnocchi.jpg" alt="gnocchi" width="50%">
          <p>"This straight-up US style pale ale uses some of our <br>
            favourite hops against a toasty malt base. We brewed this <br>
            with Sir Tom Hunter at our Fraserburgh brewery - to add a <br>
            charitable element to your own version, feel free to share <br>
            this citrusy pale ale with your friends. Or don't, it's your choice."</p>
        </div>`)
    })
}*/

function watchForm(){
    $('form').submit(event =>{
        event.preventDefault();
        $('#js-results').empty();
        let keywordSearchTerm=$('#js-keyword-search').val();
        let dietFilter=$('input[type="checkbox"]:checked').val();
        console.log("Searching for " + keywordSearchTerm);
        getRecipes(keywordSearchTerm, dietFilter);
    }) 
}

$(watchForm)