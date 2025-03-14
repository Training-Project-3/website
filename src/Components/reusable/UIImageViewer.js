import React from "react"

const CloseIcon = ({ className }) => (
  <svg
    className={className}
    width='25'
    height='25'
    viewBox='0 0 100 100'
    fill='#fff'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    <path
      d='M89.7,10.3L89.7,10.3c-1-1-2.6-1-3.5,0L50,46.5L13.9,10.3c-1-1-2.6-1-3.5,0l0,0c-1,1-1,2.6,0,3.5L46.5,50L10.3,86.1
        c-1,1-1,2.6,0,3.5h0c1,1,2.6,1,3.5,0L50,53.5l36.1,36.1c1,1,2.6,1,3.5,0l0,0c1-1,1-2.6,0-3.5L53.5,50l36.1-36.1
        C90.6,12.9,90.6,11.3,89.7,10.3z'
    />
  </svg>
)

const ImgViewer = ({ imgViewerProps, setShow }) => {
  const { show, img, alt } = imgViewerProps

  const closeViewer = () => {
    setShow((prev) => {
      return {
        ...prev,
        show: false,
      }
    })
  }

  const dontClose = (e) => {
    e.stopPropagation()
  }

  return (
    show && (
      <div className='ViewerFrame' onClick={closeViewer}>
        <span className='CloseBtn' onClick={closeViewer}>
          <CloseIcon />
        </span>
        <div className='ImageContainer' onClick={dontClose}>
          <img src={img} alt={alt} />
        </div>
      </div>
    )
  )
}

export default ImgViewer
