import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./routes/Home";
import OrderDetails from "./components/OrderDetails";
import AllOrder from "./routes/AllOrder";
import Administration from "./routes/Administration";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import SignupUser from "./components-two/SignupUser";
import Test from "./components/Test";
import { AuthProvider } from "./services/account.service";

function App() {
  useEffect(() => {
    axios
      .get("http://localhost:4000/order")
      .then((data) => data.json())
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/user/file/:id" element={<Test />} />
          <Route path="/signup/user" element={<SignupUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/dashbord/admin/all-order" element={<AllOrder />} />
          <Route
            path="/dashboard/admin/order/details/:id"
            element={<OrderDetails />}
          />
          <Route
            path="/dashboard/admin/order-administration"
            element={<Administration />}
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
