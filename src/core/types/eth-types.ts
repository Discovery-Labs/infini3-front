import {
  JsonRpcProvider,
  StaticJsonRpcProvider,
  Web3Provider,
  Provider,
  JsonRpcSigner,
} from "@ethersproject/providers";
import { ethers, Signer, VoidSigner, Wallet, Event } from "ethers";
import { Result } from "ethers/lib/utils";
/**
 * #### Summary
 * A union of various ethers providers for ease of use and maximum flexiblity
 *
 * #### Notes
 * Used by eth-hooks, eth-components and scaffold-eth-typescript
 *
 * @category Type Definition
 */
export type TEthersProvider =
  | JsonRpcProvider
  | Web3Provider
  | StaticJsonRpcProvider;

/**
 * #### Summary
 * A union of various providers and signers in ethers to give maximum flexibility
 *
 * @category Type Definition
 */
export type TEthersProviderOrSigner =
  | JsonRpcProvider
  | Web3Provider
  | StaticJsonRpcProvider
  | Signer
  | JsonRpcSigner
  | Wallet
  | VoidSigner;

/**
 * #### Summary
 * A union of various providers in ethers to give maximum flexibility
 *
 * @category Type Definition
 */
export type TEthersSigner = Signer | JsonRpcSigner | Wallet | VoidSigner;

/**
 * #### Summary
 * A union of abstract, non initalizable providers, used by some functions
 *
 * @category Type Definition
 */
export type TAbstractProvider = Provider;

/**
 * #### Summary
 * Essentially a provider and signer and network information for ease of use.
 *
 * @category Type Definition
 */
export type TEthersUser = {
  signer: Signer | undefined;
  provider: TEthersProvider | undefined;
  providerNetwork: ethers.providers.Network | undefined;
  address: string | undefined;
};

export interface TypedEvent<EventArgs extends Result> extends Event {
  args: EventArgs;
}
