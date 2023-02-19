import Home from './frontend/Home';
import Begin from './frontend/Begin';
import YourWordIs from './frontend/YourWordIs';
import YourAnswer from './frontend/YourAnswer';
import YourPictures from './frontend/YourPictures';
import Result from './frontend/Result';
// import ImgClassifier from './backend/ImgClassifier';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Begin />} />
          <Route path="/start" element={<YourWordIs />} />
          <Route path="/your-answer" element={<YourAnswer />} />
          <Route path="/your-pictures" element={<YourPictures />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
