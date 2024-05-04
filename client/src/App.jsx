import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Error from "./pages/Error";
import Footer from "./components/Footer";
import Logout from "./pages/Logout";
import Admin_Layout from "./components/layouts/Admin_Layout";
import AdminContacts from "./pages/AdminContacts";
import AdminUsers from "./pages/AdminUsers";
import AdminServices from './pages/AdminServices'
import AdminUsersUpdate from "./pages/AdminUsersUpdate";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="service" element={<Service />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<Error />} />

        <Route path="/admin" element={<Admin_Layout/>} >
          <Route path="users" element={<AdminUsers/>}  />
          <Route path="users/:id" element={<AdminUsersUpdate/>}  />
          <Route path="contacts" element={<AdminContacts/>}  />
          <Route path="services" element={<AdminServices/>} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
