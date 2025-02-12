import axios from 'axios';

export default class edsuite{
    static instance = null; //singletoning it!
    constructor(){
        
        axios.defaults.withCredentials = true;
    }
    static GetAxios(){
        if (edsuite.instance == null){
            
            edsuite.instance = new edsuite();
            
        }
        return edsuite.instance;
    }
    
    async sendPost(objData){

        let params = new URLSearchParams();
        for (let key in objData){
            params.append(key, objData[key]);
        }

        const response = axios.post("https://mclainonline.com/EdSuite/service.php",params)
         .then((response) => {
            
            console.log("in edsuite:" + response.data);
            return response.data;
         });
        
    }
}