import './lazy-image.css'
import React, { useMemo, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const LazyImage = ({ image, id, className, onClick, altSrc, aspectRatio, loading = false }) => {
    const [imgLoaded, setImgLoaded] = useState(false);

    const paddingTop = useMemo(() => {
        if (typeof aspectRatio === 'object' && aspectRatio?.length === 2 && !aspectRatio.some((el) => typeof el !== 'number')) {
            return ((aspectRatio[1]) / (aspectRatio[0])) * 100;
        } else {
            return 133.33333
        }
    }, [aspectRatio])    

    return (
        <div className={'lazy-image-parent ' + className + (imgLoaded && (image || altSrc) ? ' ' : ' animating')} id={id}>
            <div className='lazy-image-wrapper' onClick={onClick} style={{ paddingTop: paddingTop + '%' }}>
                {(image || altSrc) ? <LazyLoadImage
                    className='lazy-image'
                    src={image || altSrc}
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