import React from 'react';

interface ImagePreviewProps {
  imageUrl: string | null;
  placeholderText: string;
  maxWidth?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, placeholderText , maxWidth = '50%'}) => {
  if (!imageUrl) {
    return null;
  }

  return (
    <>
      <div>{placeholderText}</div>
      <img src={imageUrl.toString()} alt="Image preview" style={{ maxWidth: maxWidth, height: 'auto' }} />
    </>
  );
  
};

export default ImagePreview;
