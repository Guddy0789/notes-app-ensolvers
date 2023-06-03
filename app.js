require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || '4000';
const dataBase = process.env.DB_DATABASE;
const notes = require('./routes/noteRoute');
const sequelize = require('./database/db');
const Note = require('./models/Notes');
const cors = require('cors');
const path = require('path');
app.use(express.json());


// 👇️ configure CORS
app.use(cors());

// Inicio servidor
app.listen(port, () => {
  console.log(`Servidor BackEnd corriendo en el puerto: ${port} base de datos: ${dataBase}`)
// force:true hace un drop de todas las tablas
 //  sequelize.sync({ force: true}) NO USAR
  
  //  sequelize.sync({ alter: true })
  //  sequelize.sync({ force: false})

})
app.listen(port, "0.0.0.0", function () {
  // ...
});

app.get('/indextest', (req, res) => {
    const data = {
        message: '¡Hola, raiz!',
      };
    
      // Enviar respuesta JSON
      res.json(data);
   
  })

 app.use('/api/note/',notes); 


 
// Hacer que node sirva los archivos de nuestro app React
app.use(express.static(path.resolve(__dirname, './client/public')));

// Manejar las peticiones GET en la ruta /api
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Todas las peticiones GET que no hayamos manejado en las líneas anteriores retornaran nuestro app React
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/public', 'index.html'));
});

