const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "usuario"],
      default: "usuario",
    },
  },
  {
    timestamps: true,
  }
);

// encriptar contraseña
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// comparar contraseñas
userSchema.methods.matchPassword = async function (ContraseñaIngresada) {
  return await bcrypt.compare(ContraseñaIngresada, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
