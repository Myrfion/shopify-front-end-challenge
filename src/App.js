import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Layout from "./hocs/Layout"

import FavouritePage from "./pages/FavouritePage"
import HomePage from "./pages/HomePage"
import ROUTES from "./routes"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path={ROUTES.home.path} element={<HomePage />}></Route>
          <Route
            exact
            path={ROUTES.favourites.path}
            element={<FavouritePage />}
          />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
