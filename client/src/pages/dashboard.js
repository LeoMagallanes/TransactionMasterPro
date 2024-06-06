import './dashboard.css';
import usuarioImg from '../assets/imgs/usuario.png'
import { useState, useEffect } from 'react';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import Transactions from '../components/transactions';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const [currentMoney, setCurrentMoney] = useState("2500.90");
    const [cardData, setCardData] = useState({
        number: '239413087210',
        expiry: '11/2025',
        cvc: '000',
        name: 'Leonardo Magallanes',
        focus: '',
    });
    const [currentTransactions, setTransactions] = useState([]);
    const clientAccountNumber = localStorage.getItem('accountNumber');
    
    // Function that obtains all the transactions made by the loged client
    const getTransactions = () => {
        const postData = {client_account:clientAccountNumber};
        axios.post('http://localhost:5000/api/transactions', postData)
        .then(response => {
            const transactionsJSON = JSON.stringify(response.data);
            const info = JSON.parse(transactionsJSON);
            console.debug(`[${new Date()}] - ${transactionsJSON}`);
            setTransactions(info);
        })
        .catch(error => {
            console.error(`[${new Date()}] - ${error}`);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
                })
        });
    };

    // Function that obtains the client info
    const getClientInfo = () => { 
        const postData = {account_number:clientAccountNumber};
        axios.post('http://localhost:5000/api/client', postData)
        .then(response => {
            console.info(`[${new Date()}] - Data successfully obtained`);
            const clientJSON = JSON.stringify(response.data[0]);
            const info = JSON.parse(clientJSON);
            console.debug(`[${new Date()}] - ${info}`);
            localStorage.setItem('clientInfo', info);
            console.debug(`[${new Date()}] - ${info.account_number}`);
            setCardData({
                number: info.account_number,
                name: info.name +" "+info.lastname,
                expiry:'',
                cvc: '',
                focus:''
            });

            setCurrentMoney(info.account_balance);
        })
        .catch(error => {
            console.error(`[${new Date()}] - ${error}`);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
                })
        });
      };

    // Function that gives a format to the date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: "2-digit", minute: "2-digit"};
        return date.toLocaleDateString(undefined, options);
    }

    function handleClick() {
        navigate('/transfer');
    }

    useEffect(() => {
        getClientInfo();
        getTransactions();
    }, []);

      
    return(
        <>
            {/* <div className='navbar'></div> */}
            <div className="split left">
                <div className="centered">
                    <img src={usuarioImg} alt="Usuario" style={{ width: '100px', height: '100px' }} />
                    <h1 style={{color:'#000000', fontSize:'3rem'}}>Personal Account</h1>
                    <div style={{fontSize:'1.3rem', color:'#000000  '}}>
                    <div style={{ fontSize: '1.2rem' }}>Account Number: {cardData.number}</div>
                        <div style={{ fontSize: '1.2rem' }}>Name: {cardData.name}</div>
                    </div>
                    <p style={{fontSize:'2rem', color:'#000000  '}}> ${currentMoney}</p>
                </div>
            </div>
            
            <div className="split right">
                <div className='centered transactions'>
                        <div className='sticky_'><h1 style={{color:'#00BF63'}}>Transactions</h1></div>
                        <div className=" container_">
                            {
                                setTransactions.length && 
                                currentTransactions.map((transaction,index) => {
                                    return <div key={index}>
                                        <Transactions account={transaction.To_account_number} status={"done"} date={formatDate(transaction.Time)} descr={ transaction.From_account_number == clientAccountNumber ? "To "+transaction.To_account_number :"From "+transaction.To_account_number} type={ transaction.From_account_number == clientAccountNumber ? "-" : "+"} cant={transaction.quantity}/>
                                    </div>
                                })

                            }
                            
                        </div>
                        &nbsp;
                        <button className='button' style={{ marginTop: '2.5rem' }}  onClick={handleClick}>Make new transfer</button>
                </div>
                
            </div>

            

        </>
    )
}

export default Dashboard;