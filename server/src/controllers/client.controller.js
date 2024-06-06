import Client from '../models/Client.js'

// Function that returns all the loged client data from the database
export const getClientInfo = async (req,res)=>{
    //test -: curl -X POST -H "Content-Type: application/json" -d "{\"account_number\":\"239413087210\"}" http://localhost:3000/api/client
    //test +: curl -X POST -H "Content-Type: application/json" -d "{\"account_number\":\"149429081264\"}" http://localhost:3000/api/client
    const {account_number} = req.body; 
    console.debug(`[${new Date()}] - ${account_number}`);
    var query = { account_number: account_number}
    try {
        const data = await Client.find(query);
        console.info(`[${new Date()}] - Successful query`);
        res.json(data);
    } catch (error) {
        console.error(`[${new Date()}] - ${error}`);
        res.status(500).json({ message: error.message });
    }
};

// Function that validates username and password for the login
export const login = async (req, res) => {
    //test -: curl -X POST -H "Content-Type: application/json" -d "{\"username\":\"a0236887\",\"password\":\"abc123\"}" http://localhost:3000/api/client/login
    //test +: curl -X POST -H "Content-Type: application/json" -d "{\"username\":\"a0236887\",\"password\":\"abc123\"}" http://localhost:3000/api/client/login
    const {username, password} = req.body;
    console.debug(`[${new Date()}] - ${username}`);
    var query = {username: username, password: password}
    try {
        const response = await Client.findOne(query);
        if(!response){
            console.info(query);
            console.info(response);
            console.info(`[${new Date()}] - Invalid username or password`);
            return res.status(401).send('Invalid username or password');
        }
        else res.send(response.account_number);
    } catch (error) {
        console.error(`[${new Date()}] - ${error}`);
        res.status(500).json({ message: error.message });
    }
};

