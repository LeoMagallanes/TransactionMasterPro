// import logo from './logo.svg';
import './App.css';
import Login from './pages/login.js'
import Dashboard from './pages/dashboard';
import { BrowserRouter as Router,
          Switch,
          Route,
          Link, Routes } from "react-router-dom";
import Details from './pages/details';
import TransferScreen from './pages/transfer';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/details" element={<Details />} />
        <Route path="/transfer" element={<TransferScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
