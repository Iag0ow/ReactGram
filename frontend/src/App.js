import "./App.css";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { useAuth } from "./Hooks/useAuth";
import EditProfile from "./pages/EditProfile/EditProfile";
import Profile from "./pages/Profile/Profile";
import Photo from "./pages/Photo/Photo";
import Search from "./pages/Search/Search";
function App() {
  const { auth, loading } = useAuth();
  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={auth ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={auth ? <EditProfile /> : <Navigate to="/login" />}
            />
            <Route
              path="/users/:id"
              element={auth ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!auth ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/search"
              element={auth ? <Search /> : <Navigate to="/login" />}
            />
            <Route
              path="/photos/:id"
              element={auth ? <Photo /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
