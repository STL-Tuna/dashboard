import api from "../../api";

export const getSubscriber = async() => {
    try{
        const response = await api.get('/subscriber')
        return response.data.items;
    }
    catch(error){
        console.log(`Error: ${error}`);
        throw error;
    }
}