const { response } = require("express")

const validarArchivoSubir = (req, res = response, next) => {

    console.log(req.files.archivo);
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            ok: false,
            body: 'No files were uploaded.'
        });
                
    }

    console.log('paso');

    next()
}

module.exports = {
    validarArchivoSubir
}