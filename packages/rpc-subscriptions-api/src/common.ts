import type { Address } from '@solana/addresses';
import type {
    Base58EncodedBytes,
    Base58EncodedDataResponse,
    Base64EncodedDataResponse,
    Base64EncodedZStdCompressedDataResponse,
    LamportsUnsafeBeyond2Pow53Minus1,
    TokenAmount,
    U64UnsafeBeyond2Pow53Minus1,
} from '@solana/rpc-types';

// FIXME(solana-labs/solana/issues/30341) Beware that any value outside of range
// +/- 9007199254740991 may be truncated or rounded because of a downcast to JavaScript `number`
// between your calling code and the JSON-RPC transport.
export type SignedLamportsAsI64Unsafe = bigint;

export type AccountInfoBase = Readonly<{
    /** indicates if the account contains a program (and is strictly read-only) */
    executable: boolean;
    /** number of lamports assigned to this account */
    lamports: LamportsUnsafeBeyond2Pow53Minus1;
    /** pubkey of the program this account has been assigned to */
    owner: Address;
    /** the epoch at which this account will next owe rent */
    rentEpoch: U64UnsafeBeyond2Pow53Minus1;
}>;

/** @deprecated */
export type AccountInfoWithBase58Bytes = Readonly<{
    data: Base58EncodedBytes;
}>;

/** @deprecated */
export type AccountInfoWithBase58EncodedData = Readonly<{
    data: Base58EncodedDataResponse;
}>;

export type AccountInfoWithBase64EncodedData = Readonly<{
    data: Base64EncodedDataResponse;
}>;

export type AccountInfoWithBase64EncodedZStdCompressedData = Readonly<{
    data: Base64EncodedZStdCompressedDataResponse;
}>;

export type AccountInfoWithJsonData = Readonly<{
    data:
        | Readonly<{
              // Name of the program that owns this account.
              program: string;
              parsed: {
                  info?: object;
                  type: string;
              };
              space: U64UnsafeBeyond2Pow53Minus1;
          }>
        // If `jsonParsed` encoding is requested but a parser cannot be found for the given
        // account the `data` field falls back to `base64`.
        | Base64EncodedDataResponse;
}>;

export type AccountInfoWithPubkey<TAccount extends AccountInfoBase> = Readonly<{
    account: TAccount;
    pubkey: Address;
}>;

export type TokenBalance = Readonly<{
    /** Index of the account in which the token balance is provided for. */
    accountIndex: number;
    /** Pubkey of the token's mint. */
    mint: Address;
    /** Pubkey of token balance's owner. */
    owner?: Address;
    /** Pubkey of the Token program that owns the account. */
    programId?: Address;
    uiTokenAmount: TokenAmount;
}>;