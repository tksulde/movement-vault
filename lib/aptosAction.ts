import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const config = new AptosConfig({
  network: Network.CUSTOM,
  fullnode: "https://aptos.testnet.bardock.movementlabs.xyz/v1",
  faucet: "https://faucet.testnet.bardock.movementnetwork.xyz/",
});
const aptos = new Aptos(config);

export function aptosAction() {
  return aptos;
}
