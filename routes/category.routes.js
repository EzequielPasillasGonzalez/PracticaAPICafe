const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar_campos.middlewares')
const { validarJWT } = require('../middlewares/validar_jwt.middlewares')


const router = Router()

/**
 * {{url}}/api/categorias
 * 
 */

// Obtener todas las categorias - publico
router.get('/', (req, res) =>{
    res.json({
        ok: true
    })
})

// Obtener una categoria por id - publico
router.get('/:id', (req, res) =>{
    res.json({
        ok: true
    })
})


// Crear una categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT
], )

// Actualizar una categoria - privado - cualquier persona con un token valido
router.put('/:id', (req, res) =>{
    res.json({
        ok: true
    })
})

// Borrar una categoria - Admin - cualquier persona con un token valido
router.delete('/:id', (req, res) =>{
    res.json({
        ok: true
    })
})

module.exports = router