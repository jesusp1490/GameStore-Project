const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", async (event) => {
  event.preventDefault();

  // Collect user data from form inputs
  const userData = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  try {
    // Send a POST request to your backend registration endpoint
    const response = await fetch("http://localhost:5051/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // Handle the response from the server
    const data = await response.json();

    if (data.success) {
      // Registration was successful, handle the response

      fetch(`http://localhost:5051/users/${userData.email}`)
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          console.log(myJson[0].username);
          console.log(myJson[0].gender);
          console.log(myJson)
          const namesave = myJson[0].username;
          const gendersave = myJson[0].gender
          
          console.log('username to store:', namesave);
          console.log('username to store:', gendersave);
          localStorage.setItem("username", namesave);
          localStorage.setItem("gender", gendersave);
        });

      console.log("Registration successful", data.message);
      localStorage.setItem("loggedIn", "true");
      setTimeout(() => {
        window.location.href = `home.html?login=success`;
      }, 1000);
      
    } else {
      // Registration failed, display an error message
      console.error("Registration failed", data.message);
      alert(
        'The email or password are incorrect, please try again.'
      );
    }
  } catch (error) {
    // Handle any errors that may occur during the request
    console.error("Error:", error);
  }
});
