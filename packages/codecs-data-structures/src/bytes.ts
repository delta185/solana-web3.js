import {
    combineCodec,
    createDecoder,
    createEncoder,
    VariableSizeCodec,
    VariableSizeDecoder,
    VariableSizeEncoder,
} from '@solana/codecs-core';

/**
 * Encodes byte arrays as provided.
 *
 * To control the size of the encoded byte array, you can use
 * the `fixEncoderSize` or `prefixEncoderSize` functions.
 */
export function getBytesEncoder(): VariableSizeEncoder<Uint8Array> {
    return createEncoder({
        getSizeFromValue: (value: Uint8Array) => value.length,
        write: (value: Uint8Array, bytes, offset) => {
            bytes.set(value, offset);
            return offset + value.length;
        },
    });
}

/**
 * Decodes byte arrays as-is.
 *
 * To control the size of the decoded byte array, you can use
 * the `fixDecoderSize` or `prefixDecoderSize` functions.
 */
export function getBytesDecoder(): VariableSizeDecoder<Uint8Array> {
    return createDecoder({
        read: (bytes: Uint8Array, offset) => {
            const slice = bytes.slice(offset);
            return [slice, offset + slice.length];
        },
    });
}

/**
 * Creates a sized bytes codec.
 *
 * To control the size of the encoded and decoded byte arrays,
 * you can use the `fixCodecSize` or `prefixCodecSize` functions.
 */
export function getBytesCodec(): VariableSizeCodec<Uint8Array> {
    return combineCodec(getBytesEncoder(), getBytesDecoder());
}
