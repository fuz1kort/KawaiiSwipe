import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {NavBar} from "./components/NavBar";
import {HomePage} from "./pages/HomePage";
import {ProfilePage} from "./pages/ProfilePage";
import {MatchesPage} from "./pages/MatchesPage";
import {MessagesPage} from "./pages/MessagesPage";
import {OneMatchPage} from "./pages/OneMatchPage";
import "./App.css";
import Onboarding from "./pages/OnboardingPage";
import {LoginPage} from "./pages/LoginPage";
import {JSX} from "react";

const AuthWrapper = ({children}: { children: JSX.Element }) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.nickname || !user.avatar) {
        return <Navigate to="/login" replace/>;
    }
    return children;
};

export const App = () => {
    return (
        <Router>
            <Routes>
                {/* Маршрут для Onboarding */}
                <Route path="/onboarding" element={<Onboarding/>}/>

                {/* Маршрут для страницы логина */}
                <Route path="/login" element={<LoginPage/>}/>

                {/* Защищенные маршруты (с проверкой авторизации) */}
                <Route
                    path="/*"
                    element={
                        <AuthWrapper>
                            <>
                                <NavBar/>
                                <Routes>
                                    <Route path="/" element={<HomePage/>}/>
                                    <Route path="/profile" element={<ProfilePage/>}/>
                                    <Route path="/matches" element={<MatchesPage/>}/>
                                    <Route path="/messages" element={<MessagesPage/>}/>
                                    <Route path="/one-match" element={<OneMatchPage/>}/>
                                </Routes>
                            </>
                        </AuthWrapper>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
