const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos, validarArchivoSubir } = require('../middlewares/index.middlewares')
const { cargarArchivos, actualizarImagenUser, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads.controllers')
const { validarJWT } = require('../middlewares/validar_jwt.middlewares')
const { coleccionesPermitidas, existeID } = require('../helpers/db_validators.helpers')


const router = Router()

router.post('/', [
    validarJWT,
    validarArchivoSubir,
    validarCampos
], cargarArchivos)

router.put('/:coleccion/:id', [
    validarJWT,
    validarArchivoSubir,
    check('id', 'Debe de contener un ID para poder actualizar').notEmpty(),
    check('id', 'El ID debe de ser de Mongo').isMongoId(),    
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos']) ),
    validarCampos
], //actualizarImagenUser //** Guardar imagenes en base datos puro */
    actualizarImagenCloudinary) //** Guardar imagenes en base datos y servidor externo */

router.get('/:coleccion/:id', [        
    check('id', 'Debe de contener un ID para poder actualizar').notEmpty(),
    check('id', 'El ID debe de ser de Mongo').isMongoId(),    
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos']) ),
], mostrarImagen)

module.exports = router