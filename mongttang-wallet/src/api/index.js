import axios from "axios";
import { API_BASE_URL } from "../config";
import { BLOCKCHAIN_URL } from "../config";
import Web3 from "web3";

function createAPIInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      "Authorization": ""
    }
  });
  return instance;
}

function createRPCInstance() {
    const web3 = new Web3(new Web3.providers.HttpProvider(`${BLOCKCHAIN_URL}`));
    const account = web3.eth.accounts.privateKeyToAccount("0x55cddb2940646bb95c68c492220375cc1be306eafe111936eaa0d5ceb4b3c03d");
    console.log(account);
    web3.eth.defaultAccount = account.address;
    // web3.eth.accounts.wallet.add(account);
    return web3;
}

export { 
    createAPIInstance,
    createRPCInstance
 };
