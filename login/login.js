const signUpButton = document.getElementById('signUp'),
    signInButton = document.getElementById('signIn'),
    container = document.getElementById('container'),
    formRegister = document.getElementById('form-register'),
    formLogin = document.getElementById('form-login'),
    usernameLogin = document.getElementById('usernameLogin'),
    passwordLogin = document.getElementById('passwordLogin'),
    usernameRegister = document.getElementById('usernameRegister'),
    passwordRegister = document.getElementById('passwordRegister');

formRegister.addEventListener("submit", async(e) => {
    e.preventDefault()
    const options = {
        method: "POST",
        headers: {
            "accept": "*",
            "access-control-allow-origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: usernameRegister.value, password: passwordRegister.value })
    };
    const responde = await fetch("https://localhost:7299/api/Auth/Register", options)
    const data = await responde.json()
    if(data.errors){
        return alert("No pudimos seguir con el registro intentelo mas tarde")
    }
    container.classList.remove("right-panel-active");
    alert("Cuenta creada exitosamente, logeate")
})
formLogin.addEventListener("submit", async (e) => {
    e.preventDefault()
    console.log(usernameLogin.value, passwordLogin.value)
    const options = {
        method: "POST",
        headers: {
            "accept": "*",
            "access-control-allow-origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: usernameLogin.value, password: passwordLogin.value })
    };
    const responde = await fetch("https://localhost:7299/api/Auth/Login", options)
    const data = await responde.json()
    if(data.errors){
        return alert("Credenciales incorrectas")
    }
    console.log(data)
    window.location.href = `./chat/chat.html?username=${usernameLogin.value}&token=${data?.data}`;
    alert("logeado exitosamente")
})

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});