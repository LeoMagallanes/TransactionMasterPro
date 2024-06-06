import Client from '../models/Client.js'
import Transaction from '../models/Transactions.js'

// Function that make the required changes in the accounts involved in the transaction and save the transaction info into the database
export const transfer = async (req, res) => {
    const {client_account, to_account_number, amount} = req.body;
    console.debug(`[${new Date()}] - ${client_account, to_account_number, amount}`);
    try {
      const recipient = await Client.findOne({ account_number: to_account_number });
      if (!recipient){
        console.info(`[${new Date()}] - Invalid account number`);
        return res.status(401).json({ message: 'Invalid account number!' });
      }

      const sender = await Client.findOne({ account_number: client_account });
      if (parseFloat(sender.account_balance) < amount){
        console.info(`[${new Date()}] - Insuficient funds`);
        return res.status(402).json({ message: 'insufficient funds!' });
      } 

      if(parseFloat(recipient.account_balance) + Number(amount) > 20000){
        console.info(`[${new Date()}] - Transfer not possible due to recipient account restrictions`);
        return res.status(403).json({ message: 'Transfer not possible due to recipient account restrictions!' });
      }

      sender.account_balance = parseFloat(sender.account_balance) - Number(amount);
      recipient.account_balance = parseFloat(recipient.account_balance) + Number(amount);

      await sender.save();
      await recipient.save();

      Transaction.create({
        From_account_number: client_account,
        To_account_number: to_account_number,
        quantity: amount,
        Time: new Date()
      })
      .then(small => {
        console.info(`[${new Date()}] - Transfer saved successfully`);
      })
      .catch(err => {
          return res.status(500).json({message: err.message});
      });

      console.info(`[${new Date()}] - Successful transfer`);
      return res.status(200).json({ message: 'Successful transfer!' });
    } catch (error) {
      console.error(`[${new Date()}] - ${error}`);
      res.status(500).json({ message: error.message });
    }
};

// Function that get all the transactions made by the loged client from the database
export const getAccountTransactions = async (req,res) =>{
  const {client_account} = req.body;
  console.debug(`[${new Date()}] - ${client_account}`);
  var query = {
    $or: [
        { From_account_number: client_account },
        { To_account_number: client_account }
    ]
  };
  try {
    const data = await Transaction.find(query);
    console.info(`[${new Date()}] - Successful query`);
    res.json(data);
  } catch (error) {
    console.error(`[${new Date()}] - ${error}`);
    res.status(500).json({ message: error.message });
  }
};