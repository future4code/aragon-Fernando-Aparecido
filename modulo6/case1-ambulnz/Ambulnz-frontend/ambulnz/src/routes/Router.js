import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MenuPage from "../pages/MenuPage/MenuPage";
import OrdersPage from "../pages/Orders/OrdersPage";
import SignupPage from "../pages/SignupPage/SignupPage";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/signup"} element={<SignupPage />} />
    <Route path={"/menu"} element={<MenuPage />} />
    <Route path={"/orders"} element={<OrdersPage />} />
        <Route path={"*"} element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
