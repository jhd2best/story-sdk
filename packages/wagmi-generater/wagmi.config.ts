import {defineConfig} from '@wagmi/cli'
import {blockExplorer, react} from '@wagmi/cli/plugins'
import {sdk} from './sdk'
import type {Evaluate} from "@wagmi/cli/src/types";
import type {ContractConfig} from "@wagmi/cli/src/config";
import {resolveProxyContracts} from "./resolveProxyContracts";
import {sepolia} from "viem/chains";

const storyTestnetId = 1513

export default defineConfig(async () => {
    const contracts: Evaluate<Omit<ContractConfig, 'abi'>>[] = [
        {
            name: "AccessController", address: {
                // [sepolia.id]: "0xad64a4b2e18FF7D2f97aF083E7b193d7Dd141735",
                [storyTestnetId]: "0x7e253Df9b0fC872746877Fa362b2cAf32712d770",
            }
        },
        {
            name: "DisputeModule", address: {
                // [sepolia.id]: "0x6157B19CBc151af2b36e0a2581001d32a22b2661",
                [storyTestnetId]: "0x6d54456Ae5DCbDC0C9E2713cC8E650fE4f445c7C",
            }
        },
        {
            name: "IPAccountImpl", address: {
                // [sepolia.id]: "0x79792DccC6C58C303510fc1F7649e481C431aFb1",
                [storyTestnetId]: "0x38cAfD16502B1d61c6399A18d6Fa1Ea8CEca3678",
            }
        },
        {
            name: "IPAssetRegistry", address: {
                // [sepolia.id]: "0x292639452A975630802C17c9267169D93BD5a793",
                [storyTestnetId]: "0x862de97662a1231FFc14038eC1BE93aB129D2169",
            }
        },
        {
            name: "IpRoyaltyVaultImpl", address: {
                // [sepolia.id]: "",
                [storyTestnetId]: "0x8Be22cc2D13ADF496a417D9C616dA4a253c68Af8",
            }
        },
        {
            name: "LicenseRegistry", address: {
                // [sepolia.id]: "0xc2BC7a2d5784768BDEd98436f2522A4931e2FBb4",
                [storyTestnetId]: "0x0c3D467537FAd845a78728CEdc3D9447338c5422",
            }
        },
        {
            name: "StoryProtocolGateway", address: {
                // [sepolia.id]: "0xf82EEe73c2c81D14DF9bC29DC154dD3c079d80a0",
                // [storyTestnetId]: "0x2EcdB5bD12a037dCb9De0Ab7957f35FEeF758eA6",
            }
        },
    ]

    return {
        out: '../core-sdk/src/abi/generated.ts',
        contracts: [],
        plugins: [
            blockExplorer({
                baseUrl: 'https://story-network.explorer.caldera.xyz/api',
                name: 'StoryScan',
                getAddress: await resolveProxyContracts({
                    baseUrl: 'https://story-network.rpc.caldera.xyz/http',
                    contracts: contracts,
                    chainId: storyTestnetId,
                }),
                contracts: contracts,
            }),
            sdk({
                permissionLessSDK: true,
                whiteList: {
                    "AccessController": [
                        "PermissionSet",
                        "setPermission",
                    ],
                    "DisputeModule": [
                        "DisputeCancelled",
                        "DisputeRaised",
                        "DisputeResolved",
                        "cancelDispute",
                        "raiseDispute",
                        "resolveDispute",
                    ],
                    "IPAccountImpl": [
                        "execute",
                        "executeWithSig",
                    ],
                    "IPAssetRegistry": [
                        "IPRegistered",
                        "ipId",
                        "isRegistered",
                        "register",
                    ],
                    "IpRoyaltyVaultImpl": [
                        "claimRevenueBySnapshotBatch",
                        "claimRevenueByTokenBatch",
                        "claimableRevenue",
                        "collectRoyaltyTokens",
                        "ipId",
                        "RoyaltyTokensCollected",
                        "snapshot",
                        "SnapshotCompleted"
                    ],
                    "PiLicenseTemplate": [
                        "getLicenseTermsId",
                        "registerLicenseTerms",
                        "LicenseTermsRegistered"
                    ],
                    "LicensingModule": [
                        "attachLicenseTerms",
                        "mintLicenseTokens",
                        "LicenseTokensMinted",
                        "registerDerivativeWithLicenseTokens",
                        "registerDerivative",
                    ],
                    "ModuleRegistry": [
                        "isRegistered",
                    ],
                    "RoyaltyModule": [
                        "payRoyaltyOnBehalf",
                    ],
                    "RoyaltyPolicyLAP": [
                        "onRoyaltyPayment",
                        "getRoyaltyData",
                    ],
                    "StoryProtocolGateway": [
                        "mintAndRegisterIpWithSig",
                        "createIpCollection",
                    ]
                }
            }),
        ],
    }
})
