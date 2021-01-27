//Query Selectors
const showcase = document.querySelector('.showcase');

//Value
let dataId = 0;
//Path of the file
var x = document.URL;

//Firebase configuration
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
  const post = [];
  let data = '';
  var output = '';
  
  fetchData();
function fetchData(){
    db.collection("movie").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      
        post.push(doc.data().id);
      
        
    });
});
}

createHTML();

function createHTML(){
    setTimeout(()=>{
        
       const arr = post;
        const length = Object.keys(arr).length;
        // console.log(length);

        for(var i=0; i<length; i++)
        {
           
            output += `<li class="movie-grid" id="${i}" value="${arr[i]}" onclick="dataId = ${arr[i]}; console.log(dataId); document.cookie = '${arr[i]}'; window.open('${x}play.html','_self');" ></li>`;

        }
        console.log(output);
        
        
            
        
        showcase.innerHTML = output;
       getValue(length);
    },3000)
}

function getValue(len){
    for(let i=0; i<len; i++){
       const id = document.getElementById(`${i}`).getAttribute('value');

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=1110f193b789d3675a2ba137ac0b6b96&language=en-US`).then(res =>{
            return res.text();
        }).then(
            data => {
                let poster = JSON.parse(data).poster_path;
                let title = JSON.parse(data).original_title;
                // console.table(JSON.parse(data).poster_path);

                document.getElementById(`${i}`).innerHTML=`<img class="poster" src="https://image.tmdb.org/t/p/w500${poster}"><p class="name">${title}</p>`;
            }   
        )

        
    }
}


//window.open('http://127.0.0.1:5500/dist/play.html','_self'); localStorage.setItem("Id",${arr[i]})
console.log(location.href.replace(location.origin,''))

