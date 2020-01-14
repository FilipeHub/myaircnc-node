const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    date: String,
    approved : Boolean, // { type: Boolean, default : false } pode fazer assim se quiser colocar um valor default
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    spot : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Spot'
    }
});

module.exports = mongoose.model( 'Booking', BookingSchema);