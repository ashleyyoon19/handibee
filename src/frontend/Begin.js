import './style.css';
import Webcam from "react-webcam";
import React, { useState, useEffect } from 'react';
import { ImageModel } from 'react-teachable-machine';
import { useNavigate } from "react-router-dom";
import AppHeader from './AppHeader';

const Begin = () => {
    const webcamRef = React.useRef(null);
    const [letter, setLetter] = useState('');

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const navigate = useNavigate();

    const nextPage = () => {
        let path = '/start';
        navigate(path);
    };

    return(
        <>
        <AppHeader />
        <div id="page-1">
            <h1 className="body-h1">Try Signing on Camera</h1>
            <h2 className="body-h2">You're signing the letter: {letter}</h2>
            <div className="media-large" style={{backgroundImage: 'url("../backgrounds/page-1.png")'}}>
                <Webcam
                    mirrored={true}
                    audio={false}
                    height={"100%"}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={"100%"}
                    videoConstraints={videoConstraints}
                    style={{
                        marginTop: "-30px"
                    }}
                />
                <ImageModel 
                    preview={false}
                    onPredict={(prediction) => {
                        let maxNum=Number.MIN_VALUE, maxLetter='';
                        for(let i=0; i<prediction.length; i++) {
                            if(prediction[i].probability.toFixed(20) > maxNum) {
                                maxNum=prediction[i].probability;
                                maxLetter=String.fromCharCode(65+i);
                            }
                        }
                        setLetter(maxLetter);
                    }}
                    model_url="https://teachablemachine.withgoogle.com/models/6cNfAiX0t/"></ImageModel>
            </div>
            <button type="button" className="button" onClick={nextPage}>Begin</button>
        </div>
        </>
    );
}

export default Begin;