// Obtener eventos



const { Router } = require("express");
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const { validarJWT } = require('../middlewares/validar-jwt');
const { crearEventos, borrarEventos, actualizarEventos, getEventos } = require('../controllers/events')

const router = Router();

//todas tienen que pasar por la validacion del JWT
router.use( validarJWT);

//Obtener eventos
router.get('/', getEventos);

//Crear un nuevo evento
router.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha inicio es obligatoria').custom(isDate),
        check('end', 'Fecha finalizacion es obligatoria').custom(isDate),

        validarCampos
    ] 
    ,
     crearEventos);

//Actualizar evento // put
router.put('/:id', [
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha inicio es obligatoria').custom(isDate),
        check('end', 'Fecha finalizacion es obligatoria').custom(isDate),

        validarCampos
    ] 
] ,actualizarEventos);

//Borrar evento
router.delete('/:id', borrarEventos);

module.exports = router;