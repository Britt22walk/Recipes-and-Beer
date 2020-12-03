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
        health: dietFilter
    };
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
    for(let i=0; i<responseJson.hits.length; i++){
        $('#js-results').append(`<div><h3>${responseJson.hits.recipe[i].label}</h3>
        <img src='${responseJson.hits.recipe[i].image}' width='300px'></div>` 
        )};
    $('#js-results').removeClass('hidden');
}

function watchForm(){
    $('form').submit(event =>{
        event.preventDefault();
        let keywordSearchTerm=$('#js-keyword-search').val();
        let dietFilter=$('input[type="checkbox"]').val();
        console.log("Searching for " + dietFilter);
        getRecipes(keywordSearchTerm, dietFilter);
    }) 
}

$(watchForm)