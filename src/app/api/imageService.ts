import axios from "axios";

const imageInstance = axios.create({
    baseURL: "https://api.escuelajs.co/api/v1/files",
})

export default imageInstance;