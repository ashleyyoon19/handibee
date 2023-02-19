import './style.css';
import cat from "../img/cat.jpeg";
import { useNavigate } from "react-router-dom";
import AppHeader from './AppHeader';

const YourWordIs = () => {
    const navigate = useNavigate();

    const nextPage = () => {
        let path = '/your-answer';
        navigate(path);
    };

    return(
        <>
            <AppHeader />
            <div id="page-3" style={{backgroundImage: 'url("../backgrounds/page-3.png")'}}>
                <h1 className="body-h1">Your word is</h1>
                <div className="media-large">
                    <img src={cat} alt="image_word_given" style={{position: 'absolute', left: '50%', top: '21%', transform: 'translate(-50%, -50%)'}} />
                </div>
                <button onClick={nextPage} type="button" className="button">Next</button>
            </div>
        </>
    );
};

export default YourWordIs;