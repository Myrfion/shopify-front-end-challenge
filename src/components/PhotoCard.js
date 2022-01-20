import React from "react"
import PropTypes from "prop-types"
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  CardActions,
} from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"

PhotoCard.propTypes = {
  title: PropTypes.string.isRequired,
  explanation: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  isFavourite: PropTypes.bool,
  media_type: PropTypes.string.isRequired,
  onFavourite: PropTypes.func,
}

PhotoCard.defaultProps = {
  onFavourite: null,
}

function PhotoCard(props) {
  const {
    title,
    explanation,
    date,
    url,
    isFavourite,
    onFavourite,
    media_type,
  } = props

  return (
    <Card>
      {media_type === "image" ? (
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={url}
        />
      ) : (
        <iframe
          title="youtube video"
          width="100%"
          height="315"
          src={url}
        ></iframe>
      )}

      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          classes={{ root: "text-xl" }}
        >
          {title} - {date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {explanation}
        </Typography>
      </CardContent>
      {onFavourite && (
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={onFavourite}>
            {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </CardActions>
      )}
    </Card>
  )
}

export default PhotoCard
