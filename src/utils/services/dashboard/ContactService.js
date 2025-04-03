import api from "../../api";

export const getContacts = async() => {
    try{
        const response = await api.get('/contact')
        return response.data.items;
    }
    catch(error){
        console.log(`Error: ${error}`);
        throw error;
    }
}