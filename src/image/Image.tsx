import {useState} from 'react';

type ImageProp = {
    src: string;
    width?: number;
    height?: number;
    alt: string;
}

type ImageState = "isLoading" | "loaded" | "error";

export default function Image({src, width, height, alt=""}: ImageProp) {
    const [currStatus, setCurrStatus] = useState<ImageState>("isLoading");

    function onImageLoad() {
        setCurrStatus("loaded");
    }

    function onImageError() {
        setCurrStatus("error");
    }

    return (
        <> 
            {currStatus === "isLoading" && <p>Image is Loading</p>}
            {currStatus === "error" && <p>Error loading image</p>}
            <img src={src} width={width} height={height} alt={alt} onLoad={onImageLoad} onError={onImageError} style={{"display": currStatus === "loaded" ? "block" : "none"}}/>
        </>
    );
}