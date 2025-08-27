const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Rutas
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const sedeRoutes = require("./routes/sedeRoutes");
const salonRoutes = require("./routes/salonRoutes");
const programacionRoutes = require("./routes/programacionRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/sedes", sedeRoutes);
app.use("/api/salones", salonRoutes);
app.use("/api/programacion", programacionRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});