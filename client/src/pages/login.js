import './login.css';
import loginImg from '../assets/imgs/transactionMaster.png'
import transaction from '../assets/imgs/logo-up-negro.png'
import React, {useState} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function Login({navigation}) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [passw, setPassw] = useState("");

    // Function that validates the login credentials
    const checkLogin = (event) =>{
        event.preventDefault();
        if(!name || !passw){
            console.info(`[${new Date()}] - An input was left blank`);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill the blanks!',
              })
        }
        else {
            const regex = /[^a-z0-9]/i;
            if(name.match(regex)){
                console.info(`[${new Date()}] - Userame with invalid characters`);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Username can only have alphanumeric characters.',
                });
                return;
            }
            if(passw.length < 5){
                console.info(`[${new Date()}] - Password shorter than required`);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Password must have at least 5 characters.',
                });
                return;    
            }

            const postData = {username: name, password: passw};
            axios.post('http://localhost:5000/api/client/login', postData)
            .then(response => {
                console.info(`[${new Date()}] - Successful login`);
                localStorage.setItem('accountNumber', response.data);
                navigate('/dashboard');
            })
            .catch(error => {
                if (error.response.status === 401) {
                    console.info(`[${new Date()}] - Wrong credentials`);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Wrong credentials!',
                      })
                }
                else{
                    console.error(`[${new Date()}] - ${error}`);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                      })
                } 
            });

        }
    }

    const nameChange = (event) => {
        setName(event.target.value);
    }

    const passwChange = (event) => {
        setPassw(event.target.value);
    }
    
    return (
        <>
            <div className="split left" style={{ backgroundColor: 'white' }}>
                <div className="centered">
                    <img style={{width:'100%'}} src={loginImg} />
                </div>
            </div>
            
            <div className="split right">
                <div className="centered">
                    <img src={transaction} alt="Transaction logo" style={{width:'30%'}}/>
                    <h1 className='title1'>Bank <span className='title2'>UP</span></h1>
                    <form onSubmit={checkLogin}>
                        <label>
                            <input className='input' type="text" name="name" placeholder='Username' onChange={nameChange}/>
                        </label>
                        <br></br>
                        <br></br>
                        <label>
                            <input className='input' type="password" name="passw" placeholder='Password' onChange={passwChange}/>
                        </label>
                        <br></br>
                        <br></br>
                        <input className='button' type="submit" value="LOGIN" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
