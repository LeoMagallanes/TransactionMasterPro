import './details.css';
import dataImg from '../assets/imgs/Data.png';
import { Navigate } from "react-router-dom";
import { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import {AiFillCheckCircle} from 'react-icons/ai'
import {MdPendingActions} from 'react-icons/md'
import { useLocation } from "react-router-dom";
import {FcMoneyTransfer} from 'react-icons/fc'


function Details() {
    const location = useLocation();
    let data = location.state
    console.debug(`[${new Date()}] - ${data}`);
    return(
        <>
            <div className='navbar'>
                <h1 className='centered' style={{margin:0, color:'white'}}>Details</h1>
            </div>
                <div className="centered container_" style={{width:'40vh', height:'60vh',padding:'2rem', }}>
                    
                    <div className='centered'>                        
                        <img src={dataImg} alt="Transaction Icon" style={{ width: '120px', margin: 0 }} />
                        <h2 style={{fontSize:'2rem', color:'#00BF63'}}>USD ${data?.cant}</h2>
                        <p style={{color: 'grey', fontSize:'0.7rem', margin:0}}>{data?.date}</p>
                        <hr/>
                        <p style={{color: 'grey', fontSize:'0.7rem'}}>{data?.descr}</p>
                        <p style={{color: 'grey', fontSize:'0.7rem'}}>{data?.bank}</p>
                        {/* <p style={{color: 'grey', fontSize:'0.7rem'}}> {data?.account}</p> */}

                        <div className='div'>
                            <p style={{color: 'grey'}}> 
                                {data?.status == "done" && (
                                    <>
                                        <AiFillCheckCircle size={40} style={{color:'green', width:'2rem'}}/>
                                        {/* Done */}
                                    </>
                                )}
                                {data?.status == "pending" && (
                                    <>
                                        <MdPendingActions size={40} style={{color:'#DFC91D'}}/>
                                        {/* Pending  */}
                                    </> 
                                )}
                                
                            </p>
                        </div>
                    </div>
                </div>  
            {/* </div> */}
        </>
    )

}
export default Details;