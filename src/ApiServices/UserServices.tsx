import axios from "axios"
const url = "http://10.0.2.2:5000"

export const registerApi = async (data: any) => {
    try {
        const result = await axios.post(`${url}/posts/userRegService`,data)
        console.log('------rslt: --', result.data);
        return result
    }
    catch(err){
       return {error:"4"}
    }
    
}
export const loginApi = async (data: any) => {
    try {
        const result = await axios.post(`${url}/posts/userLogService`,data)
        console.log('------rslt: --', result.data);
        return result
    }
    catch(err){
       return {error:"4"}
    }
    
}
export const forgotPasswordApi = async (data: any) => {
    try {
        const result = await axios.post(`${url}/posts/forgetPassService`,data)
        console.log('------rslt: --', result.data);
        return result
    }
    catch(err){
       return {error:"4"}
    }
    
}
export const resetPasswordApi = async (data: any) => {
    try {
        const result = await axios.post(`${url}/posts/resetPassService`,data)
        console.log('------rslt: --', result.data);
        return result
    }
    catch(err){
       return {error:"4"}
    }
    
}