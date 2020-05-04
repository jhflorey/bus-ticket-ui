import axios from "axios";


const api = axios.create({
  baseURL: "https://bus-ticket-api.herokuapp.com/api"
});

export default api;