//Get the first integer from
var id = document.cookie;
id = parseInt(id)
console.log(id);
console.log(isNaN(id));
if(isNaN(id)){
    window.location.replace("https://m-watched.web.app");
}

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

//Query Selectors
const background = document.querySelector('.top-bg');
const posterSpace = document.querySelector('.poster-image');
const overviewSpace = document.querySelector('.overview');
const nameSpace = document.querySelector('.name');
const releaseSpace = document.querySelector('.release');
const homepageSpace = document.querySelector('.homepage');
const downloadButton = document.querySelector('.download');

//variables
let backgroundPic = '';
let title = '';
let overview = '';
let posterPath = '';
let releaseDate = '';
let homepage = ''
  const post = [];

loadDetails();

function loadDetails(){
   fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=1110f193b789d3675a2ba137ac0b6b96&language=en-US`)
   .then(function(res){
       return res.text();
   }).then(data =>{
       console.log(data);
       backgroundPic = JSON.parse(data).backdrop_path;
       title = JSON.parse(data).title;
       overview = JSON.parse(data).overview;
       posterPath = JSON.parse(data).poster_path;
       releaseDate = JSON.parse(data).release_date;
       homepage = JSON.parse(data).homepage
       
       //Backdrop styling
       
       background.innerHTML=`<img class="backdrop" src="https://image.tmdb.org/t/p/w500${backgroundPic}">`;
        nameSpace.innerHTML = `<h1>${title}</h1>`
        releaseSpace.innerHTML = `<p>${releaseDate}</p>`
       posterSpace.innerHTML = `<img class="poster-img" src="https://image.tmdb.org/t/p/w500${posterPath}">`;
       overviewSpace.innerHTML = `<p class="overview-text">${overview}</p>`;
       homepageSpace.innerHTML = `<p><a href='${homepage}' target='_blank'>Movie Homepage</a></p>`
   })

   //Get Data From Firebase
   db.collection("movie").where("id", "==", id)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            post.push(doc.data().link);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    setTimeout(()=>{
        
       const arr = post;
        const length = Object.keys(arr).length;
       

        for(var i=0; i<length; i++)
        {
           
           downloadButton.innerHTML=`<a href="${arr[i]}" target="_blank">Download</a>`

        }
    },2000)
}