import axios from "axios";

export default abstract class ApiService{
    client(){
        return axios.create({
            baseURL: 'https://fakestoreapi.com',
            headers: {
                Authorization: 'apiToken'
            }
        })
    }
}