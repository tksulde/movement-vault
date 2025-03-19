import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const config = new AptosConfig({
  network: Network.CUSTOM,
  fullnode: "https://testnet.bardock.movementnetwork.xyz/v1",
});
const aptos = new Aptos(config);

export function aptosAction() {
  return aptos;
}
