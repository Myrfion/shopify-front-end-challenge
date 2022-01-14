import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material"
import Header from "../components/Header"
import ROUTES from "../routes"
import { useNavigate } from "react-router-dom"

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

function Layout(props) {
  const { children } = props

  const [drawer, setDrawer] = useState(false)
  const navigate = useNavigate()

  function onListItemClick(route) {
    navigate(route.path)
  }

  return (
    <React.Fragment>
      <Header onMenu={() => setDrawer(true)} />
      {children}
      <Drawer anchor="left" open={drawer} onClose={() => setDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setDrawer(false)}
          onKeyDown={() => setDrawer(false)}
        >
          <List>
            {Object.values(ROUTES).map((route, index) => {
              const MenuIcon = route.icon

              return (
                <ListItem
                  button
                  key={route.title}
                  onClick={() => onListItemClick(route)}
                >
                  <ListItemIcon>
                    <MenuIcon />
                  </ListItemIcon>
                  <ListItemText primary={route.title} />
                </ListItem>
              )
            })}
          </List>
        </Box>
      </Drawer>
    </React.Fragment>
  )
}

export default Layout
