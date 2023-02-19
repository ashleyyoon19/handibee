import './style.css';
import Webcam from "react-webcam";
import React, { useState, useEffect } from 'react';
import { ImageModel } from 'react-teachable-machine';
import { useNavigate } from "react-router-dom";
import next from '../backgrounds/next.png';
import AppHeader from './AppHeader';

const YourAnswer = () => {
    const btnRef = React.useRef(null);
    const webcamRef = React.useRef(null);
    const [image, setImage] = useState('');
    const [letter, setLetter] = useState('');
    const [countdown, setCountdown] = useState(5);
    const [title, showTitle] = useState(true);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        showTitle(false);
    });

    const takePic = () => {
        capture();
    };

    const startCountdown = () => {
        if(countdown > 0) {
            setInterval(() => {
                if(countdown > 0) {
                    setCountdown(countdown => countdown - 1);
                }
            }, 1000);
        }
    };

    const navigate = useNavigate();

    const nextPage = () => {
        let path = '/your-pictures';
        navigate(path);
    };

    return(
        <>
        <AppHeader />
        <div id="page-1">
            {
                title == false ? <></> : 
                <>
                    <h1 className="body-h1">Taking Pictures</h1>
                    <h2 className="body-h2">letter 1</h2>
                    <h1 className="timer"><b>{ countdown >= 0 ? countdown : 0}</b></h1>
                </>
            }
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
            </div>
            <button type="button" className="button" onClick={startCountdown}>Begin</button>
            { image == '' && countdown == 0 ?
                    <button ref={btnRef} onClick={takePic()} className="webcam-btn">Capture</button> :
                    image == '' ? <></> :
                    <div style={{width: "100%", height: "100vh", backgroundImage: "yellow"}}>
                        <div style={{ position: 'absolute', left: '50%', top: '21%', transform: 'translate(-50%, -50%)' }}>
                            <img style={{width: "213px", height: "120px", textAlign: "center", }} src={image} />
                        </div>
                    </div>
            }
            <button onClick={nextPage} style={{position: "absolute", backgroundColor: "transparent", border: "0px", marginLeft: "77%", marginTop: "25%"}}><img src={next}/></button>
        </div>
        </>
    );
}

export default YourAnswer;