import "./App.css";

//Hooks
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Components
import Navbar from "./components/Navbar/Navbar";

//Pages
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MyToDoLists from "./pages/MyToDoLists/MyToDoLists";
import Tasks from "./pages/MyToDoLists/Tasks/Tasks";
import Invite from "./pages/MyToDoLists/Invite/Invite";
import MyInvites from "./pages/MyInvites/MyInvites";

//Contexts
import { UserProvider } from "./contexts/UserContext";
import { CheckerProvider } from "./contexts/CheckerContext";

function App() {
  return (
    <div className="App">
      <CheckerProvider>
        <UserProvider>
          <BrowserRouter>
            <Navbar />
            <div className="container">
              <Routes>
                <Route path="/" element={<MyToDoLists />} />
                <Route path="/:id/tasks" element={<Tasks />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/:id/invite" element={<Invite />} />
                <Route path="/myInvites" element={<MyInvites />} />
              </Routes>
            </div>
          </BrowserRouter>
        </UserProvider>
      </CheckerProvider>
    </div>
  );
}

export default App;
