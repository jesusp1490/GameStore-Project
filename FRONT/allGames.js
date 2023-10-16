
allGames();
const gamesContainer = document.querySelector('.derecha');
const searchInput = document.getElementById('searchInput'); 

let allGamess = []; 

function allGames() {
    fetch('http://localhost:5051/juegos')
        .then((response) => {
            return response.json();
        })
        .then((games) => {
            allGamess = games; 
            displayGames(allGamess); 
            console.log(allGamess)

            searchInput.addEventListener('input', () => {
                const query = searchInput.value.toLowerCase();
                const filteredTitle = allGamess.filter(function(game){
                    return game.title.toLowerCase().includes(query)
                    
                });
            
                displayGames(filteredTitle); 
                
            });

            searchGenre.addEventListener('input', () => {
                const query = searchGenre.value.toLowerCase();
                const filteredGenre = allGamess.filter(function(game){
                    return game.genre.toLowerCase().includes(query) 
                    
                });
            
                
                displayGames(filteredGenre)
            });
            
            
        });
} 
const $five = document.querySelector('.five');
let underFive = []
  fetch('http://localhost:5051/juegos/priceUnderFive')
      .then((response) => {
          return response.json();
      })
      .then((gamesCinco) => {
          underFive = gamesCinco;

            $five.addEventListener('click', function(){ 
              displayGames(underFive)
            });

      });

      const $ten = document.querySelector('.ten');
let underTen = []
  fetch('http://localhost:5051/juegos/priceUnderTen')
      .then((response) => {
          return response.json();
      })
      .then((gamesdiez) => {
          underTen = gamesdiez;

            $ten.addEventListener('click', function(){ 
              displayGames(underTen)
            });

      });
      
      const $rich = document.querySelector('.rich');
let underRich = []
  fetch('http://localhost:5051/juegos/priceUnderTwenty')
      .then((response) => {
          return response.json();
      })
      .then((gamesRich) => {
          underRich = gamesRich;

            $rich.addEventListener('click', function(){ 
              displayGames(underRich)
            });

      });
      
      

            const $twenty = document.querySelector('.rich');
            $twenty.addEventListener('click', function(){
              let gamesTwenty = allGamess.filter(game => game.price < 20);
              displayGames(gamesTwenty)
            });

          

function displayGames(games) {
    gamesContainer.innerHTML = ''; 

    for (const juego of games) {
        
        const $card = document.createElement('div');
        $card.classList.add('card');

        const $image = document.createElement('img');
        $image.src = juego.image;

        $card.classList.add('card-content');

        const $title = document.createElement('h2');
        $title.textContent = juego.title;

        const $description = document.createElement('p');
        $description.textContent = juego.description;

        const $price = document.createElement('h3');
        $card.appendChild($image);
        $card.appendChild($title);
        $card.appendChild($description);
        $card.appendChild($price);

        const maxCharacters = 150;
        const descriptionText = juego.description;

        $card.addEventListener('click', clickJuego);

        function clickJuego() {
            const gameID = juego._id;
            window.location.href = `oneGame.html?gameID=${gameID}`;
        }

        if (descriptionText.length > maxCharacters) {
            $description.textContent = descriptionText.substring(0, maxCharacters) + '...';
        } else {
            $description.textContent = descriptionText;
        }
        $price.textContent = juego.price + '€';

        gamesContainer.appendChild($card);
    }
}


const $logo = document.querySelector('.logo');
$logo.addEventListener('click', clicklogo);

function clicklogo(){
  window.location.href = `home.html`
}

const $login = document.querySelector('.log');
$login.addEventListener('click', clicklogin);

function clicklogin(){
  window.location.href = `login.html`
}

const $register = document.querySelector('.reg');
$register.addEventListener('click', clickregister);

function clickregister(){
  window.location.href = `register.html`
}

window.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const loginSuccess = urlParams.get("login");
  
    const loggedIn = localStorage.getItem("loggedIn");
  
  
      
  
    if (loggedIn === "true") {
      const contentToChange = document.getElementById("contentToChange");
      contentToChange.innerHTML = "";
      const $userInfo = document.createElement("div");
      const $userAvatar = document.createElement("img");
      const $showname = document.createElement("h3");
      $userInfo.appendChild($userAvatar);
      $userInfo.appendChild($showname);
      const $logoutdiv = document.createElement("div");
      const $logout = document.createElement("h3");
      $logoutdiv.appendChild($logout);
      contentToChange.appendChild($userInfo);
      contentToChange.appendChild($logoutdiv);
  
      $userInfo.classList.add("userInfo");
      $logoutdiv.classList.add("logout");
  
      $logout.textContent = "Log out";
  
      $logoutdiv.addEventListener('click', clearUserData)
  
      function clearUserData(){
        localStorage.clear();
        location.reload();
      }
  
      const usernames = localStorage.getItem("username");
      const genders = localStorage.getItem("gender");
      console.log(usernames);
      console.log(genders)
      $showname.textContent = usernames;
      if (genders == "Female") {
        $userAvatar.setAttribute(
          "src",
          "https://res.cloudinary.com/dizd9f3ky/image/upload/v1697206194/imageFemale_hcrk1j.png"
        );
      } else if (genders == "Male") {
        $userAvatar.setAttribute(
          "src",
          "https://res.cloudinary.com/dizd9f3ky/image/upload/v1697206175/imageMale_mqwzhf.png"
        );
      }
    }
    
  });