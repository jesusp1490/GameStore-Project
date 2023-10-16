const $header = document.querySelector('.foto_random');
const $desc = document.querySelector('.gameDesc');
const $titulo = document.querySelector('.titulo');
const $genre = document.querySelector('.genre');
const $dev = document.querySelector('.dev');
const $date = document.querySelector('.date');
const $player = document.querySelector('.player');
const $button = document.querySelector('button')


const urlParams = new URLSearchParams(window.location.search);
const gameID = urlParams.get('gameID');

fetch(`http://localhost:5051/juegos/${gameID}`)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    console.log(myJson);

    $header.setAttribute('src', myJson.image)
    $button.textContent = "Comprar por " + myJson.price + "€"
    $desc.textContent = myJson.description
    $titulo.textContent = myJson.title
    $genre.textContent = myJson.genre
    $dev.textContent = myJson.developer
    $date.textContent = myJson.releaseDate
    if (myJson.playerNumber){
    $player.textContent = myJson.playerNumber
    } else if (!myJson.playerNumber){
        $player.textContent = "Unlimited"
    }
  });

  $button.addEventListener('click', clickCompra);

  function clickCompra(){
    window.location.href = 'compra.html'
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
  
  const $logo = document.querySelector('.logo');
  $logo.addEventListener('click', clicklogo);
  
  function clicklogo(){
    window.location.href = `home.html`
  }

  const $tienda = document.querySelector('.tienda');
$tienda.addEventListener('click', clickTienda);

function clickTienda(){
  window.location.href = `allGames.html`
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
