import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Home from "./routes/Home";
import OrderDetails from "./components/OrderDetails";
import AllOrder from "./routes/AllOrder";
import Administration from "./routes/Administration";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import SignupUser from "./components-two/SignupUser";
import { AuthContext, AuthProvider } from "./services/account.service";
import AllUser from "./routes/AllUser";
import ProfileBlog from "./routes/ProfileBlog";
import UserOrder from "./routes/UserOrder";
import Facturation from "./components/Facturation";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="App">
      <Routes>
        <Route path="/signup/user" element={<SignupUser />} />
        {isAuthenticated() ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/signup/admin" element={<Signup />} />
        <Route path="/dashboard/admin/all-order" element={<AllOrder />} />
        <Route
          path="/dashboard/admin/order/details/:id"
          element={<OrderDetails />}
        />
        <Route
          path="/dashboard/admin/order/facturation/:id"
          element={<Facturation />}
        />
        <Route path="/dashboard/user/:id/order" element={<UserOrder />} />
        <Route
          path="/dashboard/admin/order-administration"
          element={<Administration />}
        />
        <Route path="/dashboard/admin/all-user" element={<AllUser />} />
        <Route path="/dashboard/profile" element={<ProfileBlog />} />
        <Route path="/dashboard/user/order" element={<UserOrder />} />
      </Routes>
    </div>
  );
}

function WrappedApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default WrappedApp;
