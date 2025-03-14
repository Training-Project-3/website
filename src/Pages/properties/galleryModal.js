import React from "react"
import ReactImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import UIModal from "../../Components/reusable/UIModal"

const GalleryModal = ({ show, closeGallery, images }) => {
  return (
    <UIModal
      header={<div className='font-bold text-xl'>Property Images</div>}
      size='lg'
      open={show}
      onClose={closeGallery}
    >
      <ReactImageGallery
        additionalClass='gallery-modal-property'
        showNav={false}
        showBullets={false}
        showPlayButton={false}
        autoPlay={false}
        showFullscreenButton={false}
        items={images}
      />
    </UIModal>
  )
}

export default GalleryModal
