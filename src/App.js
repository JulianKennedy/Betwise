import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import LandingPage from './Components/LandingPage';
import LoginPage from './Components/LoginScreen';
import SignupPage from './Components/SignupPage';
import MainPage from './Components/MainPage';
import Insert from './Components/Insert';
import GroupBy from './Components/GroupBy';
import Having from './Components/Having';
import GroupByNested from './Components/GroupByNested';
import Division from './Components/Division';
import Update from './Components/Update';
import Delete from './Components/Delete';
import Join from './Components/Join';
import JoinResult from './Components/JoinResult';
import Selection from './Components/Selection';
import Projection from './Components/Projection';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<LandingPage/>} />
    <Route path="/login" element={<LoginPage/>} />
    <Route path="/signup" element={<SignupPage/>} />
    <Route path="/mainpage" element={<MainPage/>} />
    <Route path="/insert" element={<Insert/>} />
    <Route path="/group_bettor" element={<GroupBy/>} />
    <Route path="/having" element={<Having/>} />
    <Route path="/group_avg" element={<GroupByNested/>} />
    <Route path="/division" element={<Division/>} />
    <Route path="/update" element={<Update/>} />
    <Route path="/delete" element={<Delete/>} />
    <Route path="/join" element={<Join/>} />
    <Route path="/select" element={<Selection/>} />
    <Route path="/projection" element={<Projection/>} />
    </Routes> 
    </BrowserRouter>
    </div>
  );
}

export default App;
