let games = [];
let currentIndex = 0;

const $carusel = document.querySelector(".foto_random");
const $nuevos = document.querySelector(".nuevos");
const $popular = document.querySelector(".populares");

const $login = document.querySelector(".log");
$login.addEventListener("click", clicklogin);

function clicklogin() {
  window.location.href = `login.html`;
}

const $register = document.querySelector(".reg");
$register.addEventListener("click", clickregister);

function clickregister() {
  window.location.href = `register.html`;
}

const $logo = document.querySelector(".logo");
$logo.addEventListener("click", clicklogo);

function clicklogo() {
  window.location.href = `home.html`;
}

const $tienda = document.querySelector(".tienda");
$tienda.addEventListener("click", clickTienda);

function clickTienda() {
  window.location.href = `allGames.html`;
}

//Home
fetch("http://localhost:5051/juegos")
  .then((response) => response.json())
  .then((fetchedGames) => {
    games = fetchedGames;
    setInterval(updateCarusel, 3000);
  });

function updateCarusel() {
  $carusel.setAttribute("src", games[currentIndex].image);

  currentIndex = (currentIndex + 1) % games.length;
}

//Category
function newGames() {
  fetch("http://localhost:5051/juegos/category/new")
    .then((response) => {
      return response.json();
    })
    .then((newCategory) => {
      console.log(newCategory);

      for (let i = 0; i < newCategory.length; i++) {
        const $title = document.createElement("h2");
        $title.textContent = newCategory[i].title;
        const $card = document.createElement("article");
        const $images = document.createElement("img");
        const $desc = document.createElement("p");
        const $price = document.createElement("h3");
        $images.setAttribute("src", newCategory[i].image);
        $nuevos.appendChild($card);
        $card.appendChild($images);
        $card.appendChild($title);
        $card.appendChild($desc);
        $card.appendChild($price);
        $card.classList.add("card-content");
        $images.classList.add("imagesNew");
        // $desc.textContent = newCategory[i].description;
        const maxCharacters = 150; // Adjust as needed
        const descriptionText = newCategory[i].description;

        $card.addEventListener("click", clickJuego);

        function clickJuego() {
          const gameID = newCategory[i]._id;
          window.location.href = `oneGame.html?gameID=${gameID}`;
        }

        if (descriptionText.length > maxCharacters) {
          $desc.textContent =
            descriptionText.substring(0, maxCharacters) + "...";
        } else {
          $desc.textContent = descriptionText;
        }
        $price.textContent = newCategory[i].price + "€";
      }
    });
}

function popularGames() {
  fetch("http://localhost:5051/juegos/category/popular")
    .then((response) => {
      return response.json();
    })
    .then((popularCategory) => {
      console.log(popularCategory);

      for (let i = 0; i < popularCategory.length; i++) {
        const $title = document.createElement("h2");
        $title.textContent = popularCategory[i].title;
        const $card = document.createElement("article");
        const $images = document.createElement("img");
        const $desc = document.createElement("p");
        const $price = document.createElement("h3");

        $images.setAttribute("src", popularCategory[i].image);
        $card.appendChild($images);
        $card.appendChild($title);
        $card.appendChild($desc);
        $card.appendChild($price);
        $popular.appendChild($card);
        $card.classList.add("card-content");
        $images.classList.add("imagesNew");

        const maxCharacters = 150;
        const descriptionText = popularCategory[i].description;

        $card.addEventListener("click", clickJuego);

        function clickJuego() {
          const gameID = popularCategory[i]._id;
          window.location.href = `oneGame.html?gameID=${gameID}`;
        }

        if (descriptionText.length > maxCharacters) {
          $desc.textContent =
            descriptionText.substring(0, maxCharacters) + "...";
        } else {
          $desc.textContent = descriptionText;
        }
        $price.textContent = popularCategory[i].price + "€";
      }
    });
}
popularGames();
newGames();

window.addEventListener("DOMContentLoaded", function () {
  
  

  const loggedIn = localStorage.getItem("loggedIn");
  const usernames = localStorage.getItem("username");
  const genders = localStorage.getItem("gender");
  console.log(usernames);
  console.log(genders)

    

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
