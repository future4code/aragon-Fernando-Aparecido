import React from "react";
import { BrowserRouter, Routes, Route, useNavigate, } from "react-router-dom"
import ErrorPage from "../pages/ErrorPage"
import FeedPage from "../pages/FeedPage"
import LoginPage from "../pages/LoginPage"
import PostDetailsPage from "../pages/PostDetailsPage"
import SignUpPage from "../pages/SignUpPage"
import { goToFeedPage, goToLoginPage, goToSignUpPage } from "./coodinator";
export default function  Header(){
   const navigate=useNavigate()
   return(<header>
<nav>
    <button onClick={()=> goToLoginPage(navigate)}>login</button>
    <button onClick={()=> goToSignUpPage(navigate)}>cadastr-se aqui</button>
    <button onClick={()=> goToFeedPage(navigate)}> página inicial</button>

</nav>

    </header>)
}