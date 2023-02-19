import cat from "../img/cat.jpeg";
import ImgCapture from "./ImgCapture";
import ImgClassifier from "../backend/ImgClassifier";
import './style.css';

export default function Home() {
    return(
        <>
        <header>
        <h1 class="nav-main vertical">handibee</h1>
        </header>
        <body id="page-1">
        <h1 class="body-h1">Try Signing on Camera</h1>
        <div class="media-large">
            <ImgCapture />
        </div>
        <button type="button" class="button">Begin</button>
        </body>
        </>
    );
}