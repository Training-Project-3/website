export const ImageCollage = ({ images }) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
      {images.map((image, index) => (
        <div key={index} className='relative'>
          <img src={image} alt={`collage-${index}`} className='w-full h-auto rounded-lg' />
        </div>
      ))}
    </div>
  )
}
