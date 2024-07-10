const PDFDocument = require('pdfkit')
const path = require('path')


const buildPDF = async (dataCallback, endCallback, usuario) => {

    const titulo = 'Carta de Aceptación';
    const lorem = "El Centro de Coordinación, Comando, Control, Comunicaciones y Cómputo del Estado de Jalisco, comúnmente conocido como “Escudo Urbano C5”, es el responsable del uso y protección de sus datos personales y al respecto le informamos lo siguiente:Los datos personales se refieren a la información concerniente a una persona física identificada o identificable, y por datos personales sensibles, aquellos que afecten a la esfera más íntima de su titular o cuya utilización indebida puedan dar origen a discriminación o conlleve un riesgo grave para éste."


    try {
        // Create a document
        const doc = new PDFDocument();


        doc.on("data", dataCallback);
        doc.on("end", endCallback);        

        const logoC5 = path.join(__dirname, '../assets/logo.png')   
        //? Agegar imagen     
        doc.image(logoC5, 45, 50, {
            fit: [100, 100],    //? Tamaño de la imagen        
        });

        doc.fontSize(25);
        doc.text(`${titulo}`, {
            align: 'center',            
            paragraphGap: 20
        } ).stroke()

        doc.fontSize(12);
        doc.text(`${lorem}`, {
            align: 'left',
            baseline: 'ideographic',
            paragraphGap: 5
        })

        doc.text(`${lorem}`, {
            align: 'left',     
            paragraphGap: 5 //? Espacio despues del parrafo
        })

        const logoJalisco = path.join(__dirname, '../assets/rombo.png')

        //? Agegar imagen
        doc.image(logoJalisco, 490, 20, {
            fit: [90, 90],//? Tamaño de la imagen
        });


        const firmaUsuario = path.join(__dirname, '../assets/firma.jpeg')   
        //? Agegar imagen     
        doc.image(firmaUsuario, 70, 620, {
            fit: [100, 100],    //? Tamaño de la imagen                    
        })


        //? Dibujar una linea
        doc.rect(70, 680, 110, 0).stroke();

        //? Texto debajo de la primera linea
        doc.text(`Firma de ${usuario.usuario}`, 70, 695,)

        const firmaEncargado = path.join(__dirname, '../assets/firma2.jpeg')   
        //? Agegar imagen     
        doc.image(firmaEncargado, 400, 620, {
            fit: [100, 100],    //? Tamaño de la imagen        
        });

        doc.rect(400, 680, 110, 0).stroke();

        doc.text(`Firma de ${usuario.encargado}`, 400, 695,)

        //? Agergar otra pagina
        doc.addPage()

        doc.fontSize(12);
        doc.text(`${lorem}`, {
            align: 'left'
        })        

        doc.end();

    } catch (error) {        
        return ({
            ok: false,
            body: `${error}`
        })
    }


}

module.exports = {
    buildPDF
}