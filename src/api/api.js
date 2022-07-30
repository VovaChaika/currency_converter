import axios from "axios";
export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://api.apilayer.com/fixer/`,
    headers: {
        "apikey": "0emquFaiJaYOE2wfU38Kq4oy2xLkHWta"
    }
})

