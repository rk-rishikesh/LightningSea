import React, { useState, useEffect } from 'react';
import '../../src/index.css';

function Loader() {

    const [message, setMessage] = useState("Uploading Metadata on IPFS");


    const changeMessage = () => {
        setInterval(() => {
            setMessage("Generating NFT");
        }, 10000)
    }

    changeMessage();
    
    return (
        <>
            <div className="text-center">
                <div
                    className="spinner-border"
                    role="status"
                    style={{
                        width: '2em',
                        height: '2em',
                        borderColor: 'white',
                        borderTopColor: '#e20074',
                        margin: '250px 0px 0px 0px',
                    }}
                >
                </div>
                <br/>
                <br/>
                <br/>
                
                <h6 >{message}</h6>
            </div>
        </>
    );
};

export default Loader;
