import React from "react"
import PropTypes from "prop-types"
import Masonry from "react-masonry-css"
import PhotoCard from "./PhotoCard"

PhotosGrid.propTypes = {
  photos: PropTypes.instanceOf(Array).isRequired,
  onFavourite: PropTypes.func,
}

PhotosGrid.defaultProps = {
  onFavourite: null,
}

const myBreakpointsAndCols = {
  default: 3,
  700: 2,
  500: 1,
}

function PhotosGrid(props) {
  const { photos, onFavourite } = props

  return (
    <Masonry
      breakpointCols={myBreakpointsAndCols}
      className="my-masonry-grid p-4"
      columnClassName="my-masonry-grid_column"
    >
      {photos.map((photo) => {
        return (
          <PhotoCard
            onFavourite={
              onFavourite && (() => onFavourite(photo, photo.isFavourite))
            }
            key={photo.title}
            {...photo}
          />
        )
      })}
    </Masonry>
  )
}

export default PhotosGrid
