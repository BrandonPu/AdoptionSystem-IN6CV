
import User from "../users/user.model.js"
import Appointment from "./appointment.model.js"

//agregar
export const saveAppointment = async (req, res) => {
    try {
        
        const data = req.body
        const user = await User.findOne({ email: data.email })
        

        if (!user) {
            return req.status(404).json({
                success: false,
                message: "Propietario no encontrado"
            })
        }

        const appointment = new Appointment({
            ...data,
            owner: user._id
        })

        await appointment.save();

        res.status(200).json({
            success: true,
            appointment
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al Guardar Cita",
            error
        })
    }
}

export const getAppointment = async (req, res) => {
    
    const { limite = 10, desde = 0} = req.query;
    const query = { status: true };

    try {
        const appointment = await Appointment.find(query)
            .skip(Number(desde))
            .limit(Number(limite));

        const appointmentWithOwnerNames = await Promise.all(appointment.map(async (appointment) => {
            const owner = await User.findById(appointment.owner);
            return {
                ...appointment.toObject(),
                owner: owner ? owner.nombre: "Propietario no encontrado"
            }
        }));

        const total = await Appointment.countDocuments(query);
        
        res.status(200).json({
            success: true,
            total,
            appointment: appointmentWithOwnerNames
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener citas",
            error
        })
    }
}