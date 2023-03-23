import { createRPCInstance } from ".";
import { NFT_CONTRACT_ADDRESS, MTT_CONTRACT_ADDRESS, SSF_CONTRACT_ADDRESS } from "@/config";
import { ERC20_CONTRACT_ABI, NFT_CONTRACT_ABI, MTT_CONTRACT_ABI } from "@/config/ABIs";

const rpcInstance = createRPCInstance();

async function getMTTBalance(accountAddress){
    const mttContract = new rpcInstance.eth.Contract(MTT_CONTRACT_ABI, MTT_CONTRACT_ADDRESS);
    let balance;
    try{
        balance = await mttContract.methods.balanceOf(accountAddress).call();
        console.log("mtt : "+balance);
    } catch(error){
        console.error(error);
    }

    return balance;
}

async function getSSFBalance(accountAddress){
    const ssfContract = new rpcInstance.eth.Contract(ERC20_CONTRACT_ABI, SSF_CONTRACT_ADDRESS);
    let balance;
    try{
        balance = await ssfContract.methods.balanceOf(accountAddress).call();
        console.log("ssf : "+balance)
    } catch(error){
        console.error(error);
    }

    return balance;
}

async function getNTFList(accountAddress){
    const erc20Contract = new rpcInstance.eth.Contract(NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS);
    let nfts;
    try{
        nfts = await erc20Contract.methods.balanceOf(accountAddress).call();
    } catch(error){
        console.error(error);
    }

    return nfts;
}

export{
    getMTTBalance,
    getNTFList,
    getSSFBalance,
}