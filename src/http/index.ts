
import axios from "axios";

const httpClient = axios.create({
    baseURL: "https://localhost:7025/"
})

export default httpClient