import React from 'react';
import { useAmp } from 'next/amp';
import Image from 'next/image'

export const Img: React.FC<{
    width: number
    height: number
    src: string
}> = props => {
    const isAmp = useAmp();
    if (isAmp) {
        return (
            <amp-img {...props} />
        );
    } else {
        return (
            <Image {...props} />
        );
    }
};
