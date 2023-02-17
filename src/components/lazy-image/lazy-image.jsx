import './lazy-image.css'
import React, { useEffect, useMemo, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../firebase-config';

const LazyImage = ({ image, id, className, onClick, altSrc, aspectRatio, loading = false }) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [src, setSrc] = useState(image || altSrc);

    const paddingTop = useMemo(() => {
        if (typeof aspectRatio === 'object' && aspectRatio?.length === 2 && !aspectRatio.some((el) => typeof el !== 'number')) {
            return ((aspectRatio[1]) / (aspectRatio[0])) * 100;
        } else {
            return 133.33333
        }
    }, [aspectRatio])    

    return (
        <div className={'lazy-image-parent ' + className + (imgLoaded && src ? ' ' : ' animating')} id={id}>
            <div className='lazy-image-wrapper' onClick={onClick} style={{ paddingTop: paddingTop + '%' }}>
                {src ? <LazyLoadImage
                    className='lazy-image'
                    src={src}
                    alt=""
                    onLoad={() => setImgLoaded(true)}
                    height='100%'
                    width='100%'
                /> : null}
            </div>
        </div>
    )
}

export default LazyImage