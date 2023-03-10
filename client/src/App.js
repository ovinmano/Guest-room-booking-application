import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router , Route , Link,Routes} from 'react-router-dom'
import Homescreen from './screens/Homescreen';
import Bookingscreen from "./screens/Bookingscreen";
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Routes>
          <Route path="/home" exact element={<Homescreen/>}/>
          <Route path="/book/:id/:fromdate/:todate" exact element={<Bookingscreen/>}/>
          <Route path="/register" exact element={<Registerscreen/>}/>
          <Route path="/login" exact element={<Loginscreen/>}/>
          <Route path="/profile" exact element={<Profilescreen/>}/>
          <Route path="/admin" exact element={<Adminscreen/>}/>
          <Route path="/" exact element={<Landingscreen/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
