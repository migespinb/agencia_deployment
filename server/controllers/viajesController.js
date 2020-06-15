const Viaje = require('../models/Viajes');

exports.mostrarViajes = async (req, res) => {
    const viajes = await Viaje.findAll()
    res.render('viajes', {
        pagina: 'Proximos viajes',
        viajes: viajes
    });
}

exports.mostrarViaje = async (req, res) => {
    const viaje = Viaje.findByPk(req.params.id)
    res.render('viaje', {
        viaje: viaje
    });
}