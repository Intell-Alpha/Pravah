import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';

// Static Pages
import About from './components/About';
// import Team from './components/Team';
import Home from './components/Home';
import Login from './components/Login';

// Dashboards
import IssuingDashboard from './components/IssuingDashboard';
import VerifyingDashboard from './components/VerifyingDashboard';
import IndividualDashboard from './components/IndividualDashboard';
import VerificationHome from './components/VerificationHome';
import IndividualHome from './components/IndividualHome';
import IndividualApplications from './components/IndividualApplications';

// Services
import Passport from './components/passport/passport';
import Aadhar from './components/aadhar/aadhar';
import DrivingLicense from './components/drivinglicense/drivingLicense';

// Aadhar Sub-services
import NewRegistration from './components/aadhar/NewRegistration';
import NameChange from './components/aadhar/NameChange';
import AddressChange from './components/aadhar/AddressChange';

// Admin Authority
import AdminHome from './AdminAuthority/AdminHome';

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  const location = useLocation();
  const excludedPages = [
    '/IndividualDashboard',
    '/IssuingDashboard',
    '/VerifyingDashboard',
    '/IndividualApplications',
    '/ServiceAuthority/Admin Home',
    '/VerifyingHome',
    '/VerifyingApplication',
  ];

  const shouldHideHeaderFooter = excludedPages.includes(location.pathname);

  return (
    <div>
      {/* Conditionally render Header */}
      {/* {!shouldHideHeaderFooter && <Header />} */}

      {/* Main Content Area */}
      <div className="main-content">
        <Routes>
          {/* Set Home as the initial route */}
          <Route path="/" element={<Home />} />

          {/* Static Content Routes */}
          <Route path="/about" element={<About />} />
          {/* <Route path="/team" element={<Team />} /> */}
          <Route path="/login" element={<Login />} />

          {/* Dashboards */}
          <Route path="/IssuingDashboard" element={<IssuingDashboard />} />
          <Route path="/VerifyingHome" element={<VerificationHome />} />
          <Route path="/VerifyingApplication" element={<VerifyingDashboard />} />
          <Route path="/IndividualDashboard" element={<IndividualDashboard />} />
          <Route path="/IndividualHome" element={<IndividualHome />} />
          <Route path="/IndividualApplications" element={<IndividualApplications />} />
          <Route path="/Aadhar" element={<Aadhar />} />
          <Route path="/Passport" element={<Passport />} />
          <Route path="/Driving License" element={<DrivingLicense />} />
          <Route path="/aadhar/new-registration" element={<NewRegistration />} />
          <Route path="/aadhar/name-change" element={<NameChange />} />
          <Route path="/aadhar/address-update" element={<AddressChange />} />
          <Route path="/ServiceAuthority/Admin Home" element={<AdminHome />} />
        </Routes>
      </div>

      {/* Conditionally render Footer */}
      {/* {!shouldHideHeaderFooter && <Footer />} */}
    </div>
  );
};

export default App;
