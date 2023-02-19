import './style.css';
import { useNavigate } from "react-router-dom";
import AppHeader from './AppHeader';

const YourPictures = () => {
    const navigate = useNavigate();

    const nextPage = () => {
        let path = '/result';
        navigate(path);
    };

    return(
        <>
            <AppHeader />
            <div id="page-6">
                <h1 className="body-h1">Pictures of Your Signs</h1>
                <div className="taken-pictures">
                    <div className="media-small">
                        <img src="" alt="image_letter_spelled" />
                    </div>
                    <div className="media-small">
                        <img src="" alt="image_letter_spelled" />
                    </div>
                    <div className="media-small">
                        <img src="" alt="image_letter_spelled" />
                    </div>
                    <div className="media-small">
                        <img src="" alt="image_letter_spelled" />
                    </div>
                    <div className="media-small">
                        <img src="" alt="image_letter_spelled" />
                    </div>
                </div>
                <button onClick={nextPage} type="button" className="button">Submit</button>
            </div>
        </>
    );
};

export default YourPictures;