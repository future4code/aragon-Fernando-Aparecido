import axios from 'axios';
import { goToFeedPage } from '../routes/coordinator';
import { BASE_URL } from "../constants/urls";

export const requestLogin = (form, clear, navigate) => {
    const body = {
        email: form.email,
        password: form.password
    };
    axios.post(`${BASE_URL}/users/login`, body)
        .then((res) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userEmail", form.email);
            alert("Login realizado com sucesso!");
            goToFeedPage(navigate);
        })
        .catch((err) => {
            alert("Email e/ou senha inválidos! Tente novamente");
            clear();
        });
};

export const requestSignUp = (form, clear, navigate) => {

    const body = {
        username: form.name,
        email: form.email,
        password: form.password
    };

    axios.post(`${BASE_URL}/users/signup`, body)
        .then((res) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userEmail", form.email);
            alert("Usuário criado com sucesso! Seja bem-vindo!");
            goToFeedPage(navigate);
        })
        .catch((err) => {
            alert("Algo deu errado! Tente novamente");
            clear();
        })
};
