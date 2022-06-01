import "./App.css";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./components/LogIn/LogIn";
import Dashboard from "./components/DashBoard/Dashboard";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Settings from "./components/Settings/Settings";
import InfoCard from "./components/InfoCard/InfoCard";
import EditPassword from "./components/EditPassword/EditPassword";
import PasswordGenerator from "./components/PasswordGenerator/PasswordGenerator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/card" element={<InfoCard />} />
        <Route path="/editPassword" element={<EditPassword />} />
        <Route path="/generatePassword" element={<PasswordGenerator />}/>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <h3>
                Sorry! We couldn't find that page. Try searching or go to{" "}
                <a href="/">Password Manager's home page</a>.
              </h3>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
