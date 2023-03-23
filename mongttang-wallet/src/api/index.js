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
    return web3;
}

export { 
    createAPIInstance,
    createRPCInstance
 };
