import React, { useState, useEffect } from 'react';
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
// import { getWrapperStyle, timeStyle } from '@countdown/shared'
import { useCountdown } from 'react-countdown-circle-timer';
// import ImgClassifier from "../backend/ImgClassifier";
import $ from 'jquery';
import cat from "../img/cat.jpeg";
import * as tmImage from '@teachablemachine/image';
// import sharp from 'sharp';
// import base64toFile from 'node-base64-to-file';
import {Buffer} from 'buffer';
// import Base64Downloader from 'react-base64-downloader';

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

const ImgCapture = () => {
    const navigate = useNavigate();
    const btnRef = React.useRef(null);
    const webcamRef = React.useRef(null);
    const [image,setImage] = useState('');

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc)
    });

    const toClassifier = () => {
        let path = '/classifier';
        navigate(path);
    };

    const {
        remainingTime,
        elapsedTime,
    } = useCountdown({ isPlaying: true, duration: 3, colors: '#abc' })
    console.log("remainingTime: "+remainingTime)
    console.log("elapsedTime: "+elapsedTime)

    const takePic = () => {
        capture();
    };

    useEffect(() => {
        setTimeout(() => {
            if(btnRef != null) btnRef.current.click();
            console.log("STRINGIFY: "+JSON.stringify(dataURLtoFile(JSON.stringify(image), 'filename.png')));
        }, 5000);
    }, []);

    /************ CLASSIFYING IMAGE USING TEACHABLE MACHINE */
    const url = "https://teachablemachine.withgoogle.com/models/6cNfAiX0t/";
    let model, labelContainer, maxPredictions;

    async function init() {
        console.log("INIT");
        const modelURL = url + 'model.json';
        const metadataURL = url + 'metadata.json';
        model = await tmImage.load(modelURL, metadataURL);
        console.log("model: "+JSON.stringify(model));
        maxPredictions = model.getTotalClasses();
        labelContainer = document.getElementById('label-container');
        for (let i = 0; i < maxPredictions; i++) {
        // and class labels
        labelContainer.appendChild(document.createElement('div'));
        }
    }

    async function predict() {
        // predict can take in an image, video or canvas html element
        console.log("PREDICT");
        var image = document.getElementById('imagePreview');
        const prediction = await model.predict(image, false);
        console.log("prediction: "+prediction);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }

    const readImage = (image) => {
        console.log("IMAGE.FILES: "+image.files);
        if (image.files && image.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
            $('#imagePreview').attr('src', e.target.result);
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
          };
          console.log("test");
          reader.readAsDataURL(image.files[0]);
          init().then(() => {
            predict();
          });
        } else {
          console.log("false");
        }
      }

    //   const decode = (dataurl, filename) => {
    //         var arr = dataurl.split(','),
    //             mime = arr[0].match(/:(.*?);/)[1],
    //             bstr = atob(arr[1]), 
    //             n = bstr.length, 
    //             u8arr = new Uint8Array(n);
                
    //         while(n--){
    //             u8arr[n] = bstr.charCodeAt(n);
    //         }
            
    //         return new File([u8arr], filename, {type:mime});
    //     }

    //   const decode = (base64File) => {
    //     const i = base64File.indexOf('base64,');
    //     console.log("i: "+i);
    //     const buffer = Buffer.from(base64File.slice(i + 7), 'base64');
    //     console.log("buffer: "+buffer);
    //     const name = `${Math.random().toString(36).slice(-5)}.png`
    //     console.log("name: "+name);
    //     const file = new Blob(buffer, { type: 'image/png' });
    //     return file;
    //   };

    const decode = (file) => {
        const image=new Image()
        image.src=file;
        document.body.appendChild(image);

        return image;
    };
      
    function dataURLtoFile(dataurl, filename) {
        console.log(dataurl.value);
        if(dataurl.value !== undefined) {
            console.log("NOT NULL");
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            console.log("u8arr: "+u8arr);
            return new File([u8arr], filename, {type:mime});
        } else {
            console.log("NULL");
        }
    }
    return (
        <>
        <div className="webcam-container">
            <h1 style={{marginTop: "-70px", paddingBottom: "20px"}}>{ remainingTime }</h1>
            <Webcam
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
            <div className="webcam-img">
                {/* { 
                image == '' ? 
                    (remainingTime == 0 && elapsedTime == 3 ?
                        <button ref={btnRef} onClick={takePic()} className="webcam-btn">Capture</button> 
                        :
                        <img src={image} />)
                :
                    <button onClick={(e) => {
                        e.preventDefault();
                        setImage('')
                    }} className="webcam-btn">Retake Image</button>
                } */}
                { image == '' && remainingTime == 0 && elapsedTime == 3 ?
                    <button ref={btnRef} onClick={takePic()} className="webcam-btn">Capture</button> :
                    <>
                        <img src={image} />
                        {/* <button onClick={toClassifier}>Check</button> */}
                        {/* <ImgClassifier /> */}
                        {/* <ImgClassifier 
                            img={image} 
                            onPredict={(prediction) => {
                               console.log("prediction probability: "+prediction[0].probability);
                            }}
                        />  */}
                    </>
                    // TODO: get image path and pass it into ImgClassifier class
                }
            </div>
        </div>
        <h1>test</h1>
        <img id="imagePreview"/>
        {/* <input id="imageUpload" type="file" onChange={this.readImage} /> */}
        <div id="label-container"></div>
        {console.log("IMAGE: "+image)}
        {/* {console.log(dataURLtoFile(JSON.stringify(image), 'filename.png'))} */}
        {/* {decode(image)} */}
        {/* {readImage(decode(image))} */}
        {/* {readImage("file://"+cat)} */}
    </>
    );
  };

  export default ImgCapture;