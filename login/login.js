const signUpButton = document.getElementById('signUp'),
    signInButton = document.getElementById('signIn'),
    container = document.getElementById('container'),
    formRegister = document.getElementById('form-register'),
    formLogin = document.getElementById('form-login'),
    usernameLogin = document.getElementById('usernameLogin'),
    passwordLogin = document.getElementById('passwordLogin'),
    usernameRegister = document.getElementById('usernameLogin'),
    passwordRegister = document.getElementById('passwordLogin');

formRegister.addEventListener("submit", (e) => {
    e.preventDefault()
    container.classList.remove("right-panel-active");
    alert("cuenta creada")
})
formLogin.addEventListener("submit", async (e) => {
    e.preventDefault()
    const options = {
        method: "POST",
        body: JSON.stringify({ username: usernameLogin.value, password: passwordLogin.value })
    }
    const responde = await fetch("http://localhost:5299/api/auth/login", options)
    const data = await responde.json()
    console.log(data)
    window.location.href = `./chat/chat.html?username=${usernameLogin.value}`;
    alert("logeado exitosamente")
})

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});