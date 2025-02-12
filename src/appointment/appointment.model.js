import { Schema, model } from "mongoose";

const AppointmentSchema = Schema({
    animalName: {
        type: String,
        required: [true, "El nombre del animal es obligatorio"]
    },
    animalType: {
        type: String,
        uppercase: true,
        required: [true, "El tipo de animal es obligatorio"]
    },
    age: {
        type: Number,
        required: [true, "La edad del animal es obligatoria"],
        min: [0, "La edad debe ser un número positivo"]
    },
    appointmentDate: {
        type: Date,
        required: [true, "La fecha de la cita es obligatoria"],
        validate: {
            validator: function (v) {
                return v > new Date();
            },
            message: "La fecha de la cita debe ser en el futuro"
        }
    },
    vet: {
        type: String,
        required: [true, "El nombre del veterinario es obligatorio"],
        maxLength: [50, "El nombre del veterinario no puede exceder los 50 caracteres"]
    },
    reason: {
        type: String,
        required: [true, "El motivo de la cita es obligatorio"],
        maxLength: [150, "El motivo de la cita no puede exceder los 150 caracteres"]
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true,
    versionKey: false
});

export default model('Appointment',AppointmentSchema);