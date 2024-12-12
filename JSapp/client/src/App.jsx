import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login'; // Your existing Login component
import IssuingDashboard from './components/IssuingDashboard';
import IndividualApplications from './components/IndividualApplications';
import VerifyingDashboard from './components/VerifyingDashboard';
import IndividualDashboard from './components/IndividualDashboard';
import VerificationHome from './components/VerificationHome';
import IndividualHome from './components/IndividualHome';
import Passport from './components/passport/passport';
import Aadhar from './components/aadhar/aadhar';
import DrivingLicense from './components/drivinglicense/drivingLicense';
import NewRegistration from './components/aadhar/NewRegistration';
import NameChange from './components/aadhar/NameChange';
import AddressChange from './components/aadhar/AddressChange';
import AdminHome from './AdminAuthority/AdminHome';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Set Home as the initial route */}
        <Route path="/" element={<Home />} />

        {/* Route for Login page */}
        <Route path="/login" element={<Login />} />

        {/* Existing dashboard routes */}
        <Route path="/IssuingDashboard" element={<IssuingDashboard />} />
        <Route path="/VerifyingHome" element = {<VerificationHome/>}/>
        <Route path="/VerifyingApplication" element={<VerifyingDashboard />} />
        <Route path="/IndividualDashboard" element={<IndividualDashboard />} />
        <Route path = "/IndividualHome" element= {<IndividualHome/>}/>
        <Route path = "/IndividualApplications" element = {<IndividualApplications/>}/>
        <Route path = "/Aadhar" element= {<Aadhar/>}/>
        <Route path = "/Passport" element= {<Passport/>}/>
        <Route path = "/Driving License" element = {<DrivingLicense/>} />
        <Route path = "/aadhar/new-registration" element = {<NewRegistration/>} />
        <Route path = "/aadhar/name-change" element = {<NameChange/>} />
        <Route path="/aadhar/address-update" element = {<AddressChange/>}/>
        <Route path = "/ServiceAuthority/Admin Home" element = {<AdminHome/>}/>

      </Routes>
    </Router>
  );
};

export default App;
