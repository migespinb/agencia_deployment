const Testimonial = require('../models/Testimoniales');


exports.mostrarTestimoniales = async (req, res) => {
    const testimonios = await Testimonial.findAll();
    res.render('testimoniales', {
        pagina: 'Testimonios',
        testimonios: testimonios
    })
}

exports.agregarTestimonial = async (req, res) => {
    // Validar que todos los campos esten llenos
    let {nombre, correo, mensaje} = req.body;

    let errores = [];

    if(!nombre){
        errores.push({'mensaje': 'Falta nombre'});
    }
    if(!correo){
        errores.push({'mensaje': 'Falta correo'});
    }
    if(!mensaje){
        errores.push({'mensaje': 'Falta mensaje'});
    }
    // revisar por errores
    if(errores.length > 0){
        // muestra vista con errores
        const testimonios = await Testimonial.findAll();
        res.render('testimoniales', {
            errores,
            nombre,
            correo,
            mensaje,
            pagina: 'Testimonios',
            testimonios: testimonios
        })
    }else{
        // guardar en BD
        Testimonial.create({
            nombre: nombre,
            correo: correo,
            mensaje: mensaje
        })
        .then(testimonial => res.redirect('/testimoniales'))
        .catch(error => console.log(error));
    }
}