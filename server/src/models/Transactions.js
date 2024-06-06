import {Schema, model} from "mongoose";

const transactionSchema = new Schema({
    From_account_number:{
        type: String
    },
    To_account_number:{
        type: String
    },
    quantity:{
        type: String
    },
    Time:{
        type: Date
    }
});

export default model('Transaction', transactionSchema, 'Transactions');