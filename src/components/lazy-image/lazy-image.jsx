import './lazy-image.css'
import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const LazyImage = ({ image, id, className, onClick, altSrc }) => {
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <div className={'lazy-image-parent ' + className + (imgLoaded && image ? ' ' : ' animating')} id={id} onClick={onClick}>

            <div className='lazy-image-wrapper' style={{ opacity: imgLoaded ? '1' : '0'}}>

                {<LazyLoadImage
                    className='lazy-image'
                    src={image}
                    alt=""
                    onLoad={() => setImgLoaded(true)}
                    height='100%'
                    width='100%'
                />}

            </div>
        </div>
    )
}

export default LazyImage