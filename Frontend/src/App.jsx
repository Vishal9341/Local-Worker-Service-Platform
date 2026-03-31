import Nav from "./Components/Nav";
import Hero from "./Components/Hero";
import FeaturesSection from "./Components/FeaturesSection";
import Footer from "./Components/Footer";
import About from './Pages/About1';
import SignUp from "./Pages/SignUp";
import Login from "./Pages/loginTemp";
import ForgotPassword from "./Pages/Forgetpage";
import Professional from "./Pages/Professional";
import Service from "./Pages/Service";
import Contact from "./Pages/Contact";
import Worker from "./Pages/Worker";
import User from "./Pages/User"
import UserDashboard from "./Pages/UserDashboard";
import NotFound from "./Pages/NotFound";

import { Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<>
          <Hero />
          <FeaturesSection />

        </>
        }
        />

        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Forget" element={< ForgotPassword />} />
        <Route path="/Professional" element={<Professional />} />
        <Route path="/Service" element={<Service />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/worker" element={<Worker />} />
        <Route path="/user" element={<User />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/*" element={<NotFound />} />

      </Routes>
      < Footer />

    </>
  );
};

export default App;