import { VariableSizeCodec, VariableSizeDecoder, VariableSizeEncoder } from '@solana/codecs-core';

import { getBytesCodec, getBytesDecoder, getBytesEncoder } from '../bytes';

{
    // [getBytesEncoder]: It always returns a variable size encoder.
    getBytesEncoder() satisfies VariableSizeEncoder<Uint8Array>;
}

{
    // [getBytesDecoder]: It always returns a variable size decoder.
    getBytesDecoder() satisfies VariableSizeDecoder<Uint8Array>;
}

{
    // [getBytesCodec]: It always returns a variable size codec.
    getBytesCodec() satisfies VariableSizeCodec<Uint8Array>;
}
