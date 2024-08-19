import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    NombreUsuario: {
      type: String,
      required: true,
    },
    ApellidoUsuario: {
      type: String,
      required: true,
    },
    Genero: {
      type: String,
      required: true,
    },
    FechaNacimiento: {
      type: Date,
      required: true,
    },
    Pais: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Contrasenia: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const userModel = model('User', userSchema);
