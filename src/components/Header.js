import React from "react"
import PropTypes from "prop-types"
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { useLocation } from "react-router-dom"
import ROUTES from "../routes"

Header.propTypes = {
  onMenu: PropTypes.func.isRequired,
}

function Header(props) {
  const { onMenu } = props

  const location = useLocation()

  const title = Object.values(ROUTES).find(
    (route) => route.path === location.pathname
  ).title

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={onMenu}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
