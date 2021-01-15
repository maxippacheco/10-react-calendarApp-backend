const { Schema, model} = require('mongoose');

const EventoSchema = Schema({
    
    //requerido si o si
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    }
    

});

EventoSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object; 
})


module.exports = model('Evento', EventoSchema);