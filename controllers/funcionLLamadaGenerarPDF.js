const generatePDF = async (req, res = response) => {
    try {

        const stream = res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=carta_aceptacion.pdf",
        });

        const usuario = {
            usuario: 'Ezequiel',
            encargado: 'Raul'
        }

        buildPDF(
            (data) => stream.write(data),
            () => stream.end(),
            usuario
        );

    } catch (error) {
        res.json({
            ok: false,
            body: `Error al acceder a la base de datos ${error}`
        })
    }
}
