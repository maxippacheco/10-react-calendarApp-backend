const jwt = require('jsonwebtoken');

//PARAMETROS = PAYLOAD
const generarJWT = (uid, name) => {

    return new Promise((resolve, reject) =>{

        //genero el JWT
        const payload = {uid,name};

        //private key => second parameter
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            
            //que el token expire en 2 horas
            expiresIn: '2h'
        }, (err, token) => {
            
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve( token );
        })
    })
    
}


module.exports = {
    generarJWT
}


