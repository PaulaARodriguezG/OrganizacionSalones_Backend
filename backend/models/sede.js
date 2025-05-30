const mongoose = require("mongoose");

const sedeSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre de la sede es obligatorio"],
      enum: ["sur", "norte"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
const Sede = mongoose.model("sede", sedeSchema);
module.exports = Sede;
