import axios from "axios";

const productsInstance = axios.create({
    baseURL: "https://fakestoreapi.com",
})


export default productsInstance;