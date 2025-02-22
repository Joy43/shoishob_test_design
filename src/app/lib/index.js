export const getData=async (endpoint)=>{
    const response =await fetch (endpoint,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
        }
    });
    const data=await response?.json();
    return data;
}