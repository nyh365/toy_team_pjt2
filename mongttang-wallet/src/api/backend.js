import { createAPIInstance } from ".";
import store from "@/store";

const apiInstance = createAPIInstance();

function getUser(userId){
    //사용자 정보 받아오는 api 존재하지 않음.
    apiInstance.get("/api/"+userId)
    .then((res)=>{
        store.commit(`SET_USER`, res);
    }).catch((err)=>{
        console.error(err);
    })
}

export{
    getUser,
}