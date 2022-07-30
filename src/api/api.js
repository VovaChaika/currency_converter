import axios from "axios";
export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://api.apilayer.com/fixer/`,
    headers: {
        "apikey": "SrtNawm1Gau96BiHthkdIpr0runoK1Eb"
    }
})

