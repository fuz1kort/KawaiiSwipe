import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { MatchesPage } from "./pages/MatchesPage";
import { MessagesPage } from "./pages/MessagesPage";
import { OneMatchPage } from "./pages/OneMatchPage";
import "./App.css";
import Onboarding from "./pages/OnboardingPage";

export const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/one-match" element={<OneMatchPage />} />
      </Routes>
    </Router>
  );
};

export default App;
