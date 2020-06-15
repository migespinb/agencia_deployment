const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');
// const Viaje = require('../models').Viajes;

exports.consultasHomePage = async (req, res) => {

    const viajes = await Viaje.findAll({ limit: 3 })

    const testimonios = await Testimonial.findAll({limit: 3 })
    
    res.render('index', {
        pagina: 'Proximos viajes',
        viajes: viajes,
        testimonios: testimonios,
        clase: 'home'
    });
}