import { GraphQLResolveInfo } from 'graphql';

import { createGraphQLCache, GraphQLCache } from './cache';
import { createAccountLoader } from './loaders/account';
import { createBlockLoader } from './loaders/block';
import { loadProgramAccounts } from './loaders/program-accounts';
import { loadTransaction } from './loaders/transaction';
import { createRpcGraphQL } from './rpc';
import { AccountQueryArgs } from './schema/account';
import { BlockQueryArgs } from './schema/block';
import { ProgramAccountsQueryArgs } from './schema/program-accounts';
import { TransactionQueryArgs } from './schema/transaction';

export type Rpc = Parameters<typeof createRpcGraphQL>[0];
type Loader<TArgs> = {
    load: (args: TArgs, info?: GraphQLResolveInfo | undefined) => Promise<unknown>;
};

export interface RpcGraphQLContext {
    cache: GraphQLCache;
    accountLoader: Loader<AccountQueryArgs>;
    blockLoader: Loader<BlockQueryArgs>;
    loadProgramAccounts(
        args: ProgramAccountsQueryArgs,
        info?: GraphQLResolveInfo
    ): ReturnType<typeof loadProgramAccounts>;
    loadTransaction(args: TransactionQueryArgs, info?: GraphQLResolveInfo): ReturnType<typeof loadTransaction>;
    rpc: Rpc;
}

export function createSolanaGraphQLContext(rpc: Rpc): RpcGraphQLContext {
    const cache = createGraphQLCache();
    return {
        accountLoader: createAccountLoader(rpc),
        blockLoader: createBlockLoader(rpc),
        cache,
        loadProgramAccounts(args, info?) {
            return loadProgramAccounts(args, this.cache, this.rpc, info);
        },
        loadTransaction(args, info?) {
            return loadTransaction(args, this.cache, this.rpc, info);
        },
        rpc,
    };
}