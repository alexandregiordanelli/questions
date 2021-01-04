import React from 'react';
import { useAmp } from 'next/amp';
import Image, { ImageProps } from 'next/image'

export const Img: React.FC<{
    width: number
    height: number
    src: string
}> = props => {
    const isAmp = useAmp();
    if (isAmp) {
        return (
            <div className="fixed-height-container ">
                <amp-img className="contain" layout="fill" {...props} />
            </div>
        );
    } else {
        return (
            <Image
                width={props.width}
                height={props.height} 
                src={props.src}
            />
        );
    }
};
