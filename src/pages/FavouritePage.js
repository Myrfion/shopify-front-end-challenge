import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { getFavourites } from "./HomePage"
import PhotosGrid from "../components/PhotosGrid"

FavouritePage.propTypes = {}

function FavouritePage(props) {
  const [favourites, setFavouries] = useState([])

  useEffect(() => {
    setFavouries(getFavourites())
  }, [])

  return (
    <div className="w-full flex">
      <PhotosGrid
        photos={favourites.map((item) => {
          return { ...item, isFavourite: true }
        })}
        // onFavourite={onFavourite}
      />
    </div>
  )
}

export default FavouritePage
