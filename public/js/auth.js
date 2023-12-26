const miformulario = document.querySelector('form')

miformulario.addEventListener('submit', ev => {

  // Obtener la URL completa del navegador
  const baseUrl = window.location.href;

  
  // Eliminar la última parte de la URL
  const nuevaURL = baseUrl.slice(0, baseUrl.lastIndexOf('/'));

  // Concatenar la ruta de la API
  const apiUrl = `${nuevaURL}/api/auth/`;
  
  ev.preventDefault()

  const formData = {}  

  for( let el of miformulario.elements ) {
    if(el.name.length > 0){
      formData[el.name] = el.value
    }
  }    

  fetch( apiUrl + 'login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData)
  })
    .then( resp => resp.json())
    .then( (data) => {
      const token = data.token
      
      localStorage.setItem('token', token)

      window.location = 'chat.html'

    })
    .catch( err => {
      console.log(err);
    })

})


async function handleCredentialResponse(response) {
  // Obtener la URL completa del navegador
  const baseUrl = window.location.href;

    // Eliminar la última parte de la URL
    const nuevaURL = baseUrl.slice(0, baseUrl.lastIndexOf('/'));

  // Concatenar la ruta de la API
  const apiUrl = `${nuevaURL}/api/auth/`;

  const body = { id_token: response.credential };

  const validar = await fetch(apiUrl + 'google', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then((resp) => {            
      localStorage.setItem("email", resp.usuario.correo);      //? guardar en el local storage

      token = resp.token

      localStorage.setItem('token', token) //? guardar en el local storage

      window.location = 'chat.html'
    })
    .catch((error) => console.error(error));
}

const button = document.getElementById("google_signout");

button.onclick = () => {
  console.log(google.accounts.id);
  google.accounts.id.disableAutoSelect();

  google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
    localStorage.clear();
    location.reload();
  });
};
