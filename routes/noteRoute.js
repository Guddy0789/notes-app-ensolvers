var express = require('express');
var router = express.Router();
const {editNote,deleteNote, enableNote,archiveNote,createNote,listActive,listArchive} = require('../controllers/noteController')
// List Active notes
    router.get('/list',listArchive);
//List archive notes
    router.get('/archive',listActive);
//Create Notes
    router.post('/add',createNote);
//Disable Notes
    router.put('/down/:id',archiveNote);
//Enble Notes!
    router.put('/up/:id',enableNote);
//Delete Notes
    router.delete('/delete/:id', deleteNote);
//Edit Notes
    router.post('/edit/',editNote)
// Exportar el enrutador
module.exports = router;