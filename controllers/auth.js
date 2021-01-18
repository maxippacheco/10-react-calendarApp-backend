const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) =>{

    const { email, password } = req.body;

    try {
        
        //const usuario = new Usuario( req.body );

        //guardo
        //await usuario.save();

        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'El usuario ya existe'
            })
        }

        usuario = new Usuario(req.body);

        //encriptar password

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );


        await usuario.save();

        //crear JWT

        const token = await generarJWT(usuario.id, usuario.name)

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token

        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok:false,
            msg: 'Por favor hable con el administrador'
        })
    }

    //resp.status() => mandamos en la validacion el status, ej: 404 not found

    // Express Validator

    //manejo de errores

}

const loginUsuario = async(req, res = response) => {
    
    const { email, password } = req.body;

    try {
        
        const usuario = await Usuario.findOne({ email });

        if ( !usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'El usuario y contraseña no existen'
            })
        }

        //confirmar los password


        //parametros(password que mandamos, password que esta en la base de datos encriptado)
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ) {
            
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        //Generar nuestro JSON web token

        const token = await generarJWT(usuario.id, usuario.name)


        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok:false,
            msg: 'Por favor hable con el administrador'
        })
    }

}

const revalidarToken = async(req, res = response) => {

    //const uid = req.uid
    //const name = req.name

    const { uid, name } = req;

    const token = await generarJWT(uid, name)

    res.json({
        ok: true,
        uid,
        name,
        token

    })
}

module.exports = {
    crearUsuario,
    revalidarToken,
    loginUsuario

}