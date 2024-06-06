import {Schema, model} from "mongoose";

const clientSchema = new Schema({
    name:{
        type: String
    },
    lastname:{
        type: String
    },
    username:{
        type: String
    },
    password:{
        type: String
    },
    account_number:{
        type: String
    },
    account_balance:{
        type: String
    }
});

export default model('Client', clientSchema, 'Client');