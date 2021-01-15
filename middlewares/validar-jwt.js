const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, resp, next = response) => {
    
    //como voy a recibir el JWT => X-TOKEN

    const token = req.header('x-token');

    if ( !token ) {
        return resp.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });

    }

    try {
        
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = payload.uid
        req.name = payload.name;    

        console.log(payload);

    } catch (error) {

        return resp.status(401).json({
            ok: false.valueOf,
            msg: 'Token no valido'
        })
    }

    next();
}


module.exports = {
    validarJWT
}