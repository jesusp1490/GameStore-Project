
const emailInput = document.getElementById('email');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const genderSelect = document.getElementById('gender');
const registerButton = document.getElementById('registerButton');


registerButton.addEventListener('click', async (event) => {
    event.preventDefault();

    // Collect user data from form inputs
    const userData = {
        email: emailInput.value,
        username: usernameInput.value,
        password: passwordInput.value,
        gender: genderSelect.value,
    };

    try {
        // Send a POST request to your backend registration endpoint
        const response = await fetch('http://localhost:5051/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        // Handle the response from the server
        const data = await response.json();

        if (data.success) {
            
            console.log('Registration successful', data.message);
            
            alert('REGISTRATION SUCCESSFUL!! You can now log in.')
            setTimeout(() => {
                window.location.href = `login.html`
            }, 500);
            
        } else {
            
            console.error('Registration failed', data.message);
            alert('REGISTRATION FAILED! Make sure all fields are correctly filled and try again. REMEMBER THAT YOUR PASSWORD MUST CONTAIN AN UPPERCASE CHARACTER, A LOWERCASE CHARACTER, ONE OF THESE CHARACTERS: $@$!%*?&, AND MUST BE BETWEEN 8 AND 15 CHARACTERS LONG.')
        }
    } catch (error) {
        
        console.error('Error:', error);
    }
});




