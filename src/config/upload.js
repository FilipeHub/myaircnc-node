const multer = require('multer');
const path = require('path');

module.exports = {
    storage : multer.diskStorage({
        destination : path.resolve(__dirname, "..", "..", "uploads" ), // ../../uploads no unix e ..\..\uploads no windows
        filename : (req, file, cb) => { //tem o req mas nao tem o res. O cb é o call back, é uma função que deve ser chamada assim que o nme do arquivo estiver pronto
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext); //o ext no segundo parametro é pra retirar a extencao do nome do arquivo

            cb(null, `${name}-${Date.now()}${ext}`)
        },
    }),
}