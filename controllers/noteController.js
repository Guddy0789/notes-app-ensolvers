const note = require('../models/Notes');
const editNote = async(req, res)=>{
    // Obtener el ID del parámetro de la ruta
    console.log("----------------------:"+JSON.stringify(req.body))
    try {
      const { title, content, category } = req.body;
  
      // Crea una nueva nota en la base de datos utilizando Sequelize
   
      const result = await note.update(
        {   title: title,
            content: content,
            categories: category,
            state:1
         }, // Nombre del parámetro y su nuevo valor
        { where: { id: req.body.id } } // Condición para seleccionar la fila con el ID proporcionado
      );

  
      console.log('Note created:', result);
  
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear la nota' });
    }

}
const deleteNote = async(req, res)=>{
    console.log("delete FUNCIOTIOOOOOOOON")
   
    try {
            // Obtener el ID del parámetro de la ruta
        const itemId = req.params.id;
          // Find the item with the specified ID
    const item = await note.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Delete the item
    await item.destroy();
   
    // Enviar una respuesta de éxito
    res.status(200).json({ message: 'Item deleted successfully' });
} catch (error) {
    // Handle any errors that occur
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
const enableNote = async(req, res)=>{
 // Obtener el ID del parámetro de la ruta
 console.log("uppp FUNCIOTIOOOOOOOON")
 const itemId = req.params.id;
 try {
     const result = await note.update(
       { state: 1 }, // Nombre del parámetro y su nuevo valor
       { where: { id: itemId } } // Condición para seleccionar la fila con el ID proporcionado
     );
 
     console.log(result); // Número de filas actualizadas
 
     if (result[0] > 0) {
       console.log('Nota actualizada correctamente');
     } else {
       console.log('No se encontró ninguna fila con el ID proporcionado');
     }
   } catch (error) {
     console.error('Error al actualizar el parámetro:', error);
   }

 // Enviar una respuesta de éxito
 res.status(200).json({ message: 'Item unachived successfully' });
}
const archiveNote = async(req, res)=>{
   // Obtener el ID del parámetro de la ruta
   console.log("DOWNN FUNCIOTIOOOOOOOON")
   const itemId = req.params.id;
   try {
       const result = await note.update(
         { state: 0 }, // Nombre del parámetro y su nuevo valor
         { where: { id: itemId } } // Condición para seleccionar la fila con el ID proporcionado
       );
   
       console.log(result); // Número de filas actualizadas
   
       if (result[0] > 0) {
         console.log('Nota actualizada correctamente');
       } else {
         console.log('No se encontró ninguna fila con el ID proporcionado');
       }
     } catch (error) {
       console.error('Error al actualizar el parámetro:', error);
     }
  
   // Enviar una respuesta de éxito
   res.status(200).json({ message: 'Item archived successfully' });
}
const createNote = async(req, res)=>{
    console.log("----------------------:"+JSON.stringify(req.body))
    try {
      const { title, content, category } = req.body;
  
      // Crea una nueva nota en la base de datos utilizando Sequelize
      const createdNote = await note.create({
        title: title,
        content: content,
        categories: category,
        state:1
      });
  
      console.log('Note created:', createdNote);
  
      res.status(201).json(createdNote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear la nota' });
    }
}
const listActive = async(req, res)=>{
 // Crear el objeto JSON de respuesta
 try {
    const data = await note.findAll({ where: { state:0 } });
    // console.log("data:"+data)
    res.json(data);
  } catch (error) {
    console.log("error select all notes:"+error)
  }
    // Enviar respuesta JSON
}
const listArchive = async(req, res)=>{
    try {
        const data = await note.findAll({ where: { state:1 } });
        // console.log("data:"+data)
        res.json(data);
      } catch (error) {
        console.log("error select all notes:"+error)
      }
      
}
module.exports = {
    
    editNote:editNote,
    deleteNote:deleteNote,
    enableNote:enableNote,
    archiveNote:archiveNote,
    createNote:createNote,
    listActive:listActive,
    listArchive:listArchive
}