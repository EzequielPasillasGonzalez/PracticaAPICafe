 // Obtener la URL completa del navegador
const baseUrl = window.location.href;

// Eliminar la última parte de la URL
const nuevaURL = baseUrl.slice(0, baseUrl.lastIndexOf('/'));

 // Concatenar la ruta de la API
const apiUrl = `${nuevaURL}/api/auth/`;


let usuario = null
let socket = null

// Referencias html
const txtUid     = document.querySelector('#txtUid')
const txtMensaje = document.querySelector('#txtMensaje')
const ulUsuarios = document.querySelector('#ulUsuarios')
const ulMensajes = document.querySelector('#ulMensajes')
const btnSalir   = document.querySelector('#btnSalir')

const validarJWT = async () => {

    const token = localStorage.getItem('token') || ''

    if(token.length <= 10){

        window.location = 'index.html' 

        throw new error('No hay token en el servidor')
    }

    const resp = await fetch( apiUrl, {
        headers: { 'awt_token': token }
    })    

    const {body} = await resp.json()    

    const {usuario: usuarioDB, token: tokenDB} = body

    localStorage.setItem('token', tokenDB) // Renovar el token

    usuario = usuarioDB

    document.title = usuario.nombre

    await conectarSocket()

}

const conectarSocket = async () => {

    socket = io({
        'extraHeaders': {
            'awt_token': localStorage.getItem('token')
        }
    })

    socket.on('connect', () => {
        console.log('Socket online');
    })

    socket.on('disconnect', () => {
        console.log('Socket offline');        
    })

    socket.on('recibir_mensajes', (payload) => {
        // Todo
        
        dibujarMensajes(payload)
    })

    socket.on('usuarios_activos', dibujarUsarios)

    socket.on('mensaje_privado', (payload) => {
        // Todo
        console.log('Privado:', payload);
    })

}

const dibujarUsarios = (usuarios = []) => {
    let userHTML = ''

    usuarios.forEach( ({nombre, uID}) => {
        userHTML += `

            <li>        
                <p>
                    <h5 class="text-success"> ${nombre}   </h5>
                    <span class="fs-6 text-muted">${uID}</span>
                </p>
            </li>
        `
    })

    ulUsuarios.innerHTML = userHTML
}

const dibujarMensajes = (mensajes = []) => {
    let mensajesHTML = ''

    mensajes.forEach( ({nombre, mensaje}) => {
        mensajesHTML += `

            <li>        
                <p>
                    <span class="text-primary"> ${nombre}:   </span>
                    <span>${mensaje}</span>
                </p>
            </li>
        `
    })

    ulMensajes.innerHTML = mensajesHTML
}

txtMensaje.addEventListener('keyup', ({keyCode}) => {
    
    const mensaje = txtMensaje.value
    const uid = txtUid.value
    
    if(keyCode !== 13){
        return 
    }

    if(mensaje.length === 0){
        return
    }

    socket.emit('enviar_mensaje', {mensaje, uid})

    txtMensaje.value = ''
})

const main = async () =>{

    // Validar JWT
    await validarJWT()

}

main()