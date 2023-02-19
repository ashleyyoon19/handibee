import './style.css';
import AppHeader from './AppHeader';
import { useNavigate } from "react-router-dom";

const Result = () => {
    const navigate = useNavigate();

    const nextPage = () => {
        let path = '/';
        navigate(path);
    };

    return(
        <>
            <AppHeader />
            <div id="page-7" style={{margin: "0px"}}>
                <h1 className="body-h1">Correct!</h1>
                <div className="results">
                    <div className="result-box">
                        <p className="result-description">Your word is</p>
                        <p className="result-word">word_given</p>
                    </div>
                    <div className="result-box">
                        <p className="result-description">You spelled</p>
                        <p className="result-word">word_spelled</p>
                    </div>
                </div>
                <button onClick={nextPage} type="button" className="button">Replay</button>
            </div>
        </>
    );
};

export default Result;