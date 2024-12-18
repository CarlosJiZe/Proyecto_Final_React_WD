const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const cors = require("cors");
const path = require('path');
require("dotenv").config();

const app = express();
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@lago.1tjca.mongodb.net/lago?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error conectando a MongoDB:", err));

// Definición del esquema y modelo
const lagoSchema = new mongoose.Schema({
  clave_sih: { type: String, required: true },
  fecha: { type: Date, required: true },
  nombre_oficial: { type: String, required: true },
  nombre_comun: { type: String, required: true },
  estado: { type: String, required: true },
  municipio: { type: String, required: true },
  almacenamiento_hm3: { type: Number, required: true },
  elevacion_msnm: { type: Number, required: true },
  uso: { type: String, required: true },
  namo_almacenamiento_hm3: { type: Number, required: true },
  namo_elevacion_msnm: { type: Number, required: true },
  porcentaje_llenado: { type: Number, required: true },
  bordo_libre_m: { type: Number, required: true },
  name_almacenamiento_hm3: { type: Number, required: true },
  name_elevacion_msnm: { type: Number, required: true }
});

const Lago = mongoose.model("Lago", lagoSchema);

// Función para cargar datos desde JSON a MongoDB
const loadJSONData = async () => {
    try {
      // Leer datos desde el JSON
      const data = JSON.parse(fs.readFileSync("./data/presas_jal_ldcjl_lago_de_chapala_almacenamiento_historico_2024-08-01.json", "utf8"));
  
      // Procesar las fechas al formato correcto
      const formattedData = data.map((item) => {
        if (item.fecha) {
          // Convertir "DD-MM-YYYY" a "YYYY-MM-DD"
          const [day, month, year] = item.fecha.split("-");
          item.fecha = new Date(`${year}-${month}-${day}`);
        }
        return item;
      });
  
      // Verificar si la colección ya tiene documentos
      const count = await Lago.countDocuments();
      if (count === 0) {
        console.log("No se encontraron documentos en la colección. Cargando datos desde el JSON...");
        await Lago.insertMany(formattedData);
        console.log("Datos cargados exitosamente en MongoDB.");
      } else {
        console.log("Los datos ya están cargados en la base de datos.");
      }
    } catch (err) {
      console.error("Error al cargar los datos desde el JSON:", err);
    }
  };

// Cargar datos al iniciar el servidor
loadJSONData();

// Ruta para obtener datos paginados
app.get("/api/datos", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Página actual
    const limit = 100; // Límites de datos por página
    const skip = (page - 1) * limit;

    const totalRecords = await Lago.countDocuments();
    const totalPages = Math.ceil(totalRecords / limit);

    const data = await Lago.find().skip(skip).limit(limit);

    res.json({ data, currentPage: page, totalPages });
  } catch (err) {
    console.error("Error al obtener los datos:", err);
    res.status(500).json({ error: "Error al obtener los datos." });
  }
});
// Ruta para obtener todos los datos
app.get('/api/datos/all', async (req, res) => {
  try {
    const datos = await Lago.find(); // Obtén todos los registros
    res.json({ data: datos });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los datos', error });
  }
});


app.get('/download/presas-jal', (req, res) => {
  const filePath = path.join(__dirname, 'data/presas_jal_ldcjl_lago_de_chapala_almacenamiento_historico_2024-08-01.json');
  res.download(filePath, 'presas_jal_ldcjl.json'); // Nombre del archivo al descargar
});

// Lista de usuarios autorizados
const authorizedUsers = ["Adam", "Betty", "Charlie", "Daisy", "Eve"];

// Ruta para manejar el login
app.post("/api/login", (req, res) => {
    const user = req.body.user;

    let authentication = {
        user,
        status: "Unauthorized",
        status_code: -1,
    };

    // Verifica si el usuario está autorizado
    if (authorizedUsers.includes(user)) {
        authentication.status = "Authorized";
        authentication.status_code = 1;
    }

    res.json(authentication);
});

// Iniciar servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
