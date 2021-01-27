//Firebase
var firebaseConfig =  firebase.initializeApp({
    apiKey: "AIzaSyDc4VjSl4nLZLSGXFmCv5dexb2fMhoAlBI",
    authDomain: "m-watched.firebaseapp.com",
    projectId: "m-watched",
    storageBucket: "m-watched.appspot.com",
    messagingSenderId: "166964432210",
    appId: "1:166964432210:web:d07ce3c347a30ca6663e8b",
    measurementId: "G-F14RV1X9LY"
  });

  var db = firebase.firestore();
  //
  let id = '';
  //Query Selectors
const searchTerm = document.querySelector('.movie-search');
const outputArea = document.querySelector('.movie-list');
const movieId = document.querySelector('.movie-id');
const submitButton = document.querySelector('.submit-button')

//Event Listeners
searchTerm.addEventListener('keyup', getResult);
submitButton.addEventListener('click', pushData);

//Get Data From API
function getResult(e){


    const xhr = new XMLHttpRequest();

    xhr.open('GET',`https://api.themoviedb.org/3/search/movie?api_key=1110f193b789d3675a2ba137ac0b6b96&language=en-US&query=${e.target.value}&page=1&include_adult=false`,true);

    xhr.onload = function(){
        if(this.status === 200){
            // console.log(this.responseText);

            const result = JSON.parse(this.responseText);
            // console.log(result.results[0]);
            const movieName = result.results[0].original_title;
            const image = result.results[0].poster_path;
             id = result.results[0].id;
            movieId.setAttribute('value',id);
            outputArea.innerHTML = `<li class="movie-display"><p class="movie-name">${movieName}</p> <img class="poster" src="https://image.tmdb.org/t/p/w500/${image}"></li> `
        }
        else{
            if(e.target.value != '')alert('Something went wrong')
        }
    }
    xhr.send();
}

var today = new Date();

//Push Data To Database
function pushData(e){
    e.preventDefault();
    //Values
    const link = document.querySelector('.movie-link').value;
    if(link != '' && id != ''){
        db.collection("movie").add({
            link: link,
            id: id,
            timestamp:today
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
    else console.log('Missing')
    
    
    

}