import Nav from "./Components/Nav";
import Hero from "./Components/Hero";
import FeaturesSection from "./Components/FeaturesSection";
import Footer from "./Components/Footer";
import About from './Pages/About1';
import SignUp from "./Pages/SignUp";  
import Login from  "./Pages/loginTemp";
import ForgotPassword from "./Pages/Forgetpage";
import Professional from "./Pages/Professional";

import { Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <>
      <Nav />

      <Routes>
        <Route
          path="/"
          element={ <>
              <Hero />
              <FeaturesSection />
              < Footer />
               </>
               }
             />

        <Route path="/about" element={<About />} />
         <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Forget" element={< ForgotPassword />} />
          <Route path="/Professional" element={<Professional />} />

      </Routes>

    
    </>
  );
};

export default App;