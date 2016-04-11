var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var partySchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required:true},
    location: {type: String, required:true},
    start_date: {type: String, required: true},
    start_time: {type: String, required: true},
    end_date: {type: String, required: true},
    end_time: {type: String, required: true},
    ticket_price: {type: String, required: true},
    likes: {type: String, required: true}
})

mongoose.model('Party', partySchema);
