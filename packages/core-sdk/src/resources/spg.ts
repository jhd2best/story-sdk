import { PublicClient } from "viem";

import { SimpleWalletClient, StoryProtocolGatewayClient } from "../abi/generated";
import {
  SPGCreateIpCollectionRequest,
  SPGCreateIpCollectionResponse,
  SPGMintAndRegisterIpWithSigRequest,
  SPGMintAndRegisterIpWithSigResponse,
} from "../types/resources/spg";

export class SPGClient {
  private readonly wallet: SimpleWalletClient;
  private readonly rpcClient: PublicClient;
  public storyProtocolGatewayClient: StoryProtocolGatewayClient;

  constructor(rpcClient: PublicClient, wallet: SimpleWalletClient) {
    this.rpcClient = rpcClient;
    this.wallet = wallet;
    this.storyProtocolGatewayClient = new StoryProtocolGatewayClient(this.rpcClient, this.wallet);
  }

  /**
   * method createIpCollection for contract StoryProtocolGateway
   *
   * @param request StoryProtocolGatewayCreateIpCollectionRequest
   * @return Promise<SPGCreateIpCollectionResponse>
   */
  public async createIpCollection(
    request: SPGCreateIpCollectionRequest,
  ): Promise<SPGCreateIpCollectionResponse> {
    const txHash = await this.storyProtocolGatewayClient.createIpCollection(request);
    if (request.txOptions?.waitForTransaction) {
      await this.rpcClient.waitForTransactionReceipt({ hash: txHash });
      return { txHash: txHash };
    } else {
      return { txHash: txHash };
    }
  }

  /**
   * method mintAndRegisterIpWithSig for contract StoryProtocolGateway
   *
   * @param request StoryProtocolGatewayMintAndRegisterIpWithSigRequest
   * @return Promise<SPGMintAndRegisterIpWithSigResponse>
   */
  public async mintAndRegisterIpWithSig(
    request: SPGMintAndRegisterIpWithSigRequest,
  ): Promise<SPGMintAndRegisterIpWithSigResponse> {
    const txHash = await this.storyProtocolGatewayClient.mintAndRegisterIpWithSig(request);
    if (request.txOptions?.waitForTransaction) {
      await this.rpcClient.waitForTransactionReceipt({ hash: txHash });
      return { txHash: txHash };
    } else {
      return { txHash: txHash };
    }
  }
}
