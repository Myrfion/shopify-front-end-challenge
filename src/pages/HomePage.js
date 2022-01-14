import React, { useState, useEffect } from "react"
import { apiClient } from "../services/api"
import { Button, CircularProgress, Alert } from "@mui/material"
import PhotosGrid from "../components/PhotosGrid"
import DateRangePicker from "../components/DateRangePicker"
import { format } from "date-fns"

const initialDateRange = {
  from: "2021-12-10",
  to: "2022-01-11",
}

function getImages(from, to) {
  console.log("from", format(new Date(from), "yyyy-MM-dd"))
  console.log("to", format(new Date(to), "yyyy-MM-dd"))

  return apiClient.get("/planetary/apod", {
    params: {
      start_date: format(new Date(from), "yyyy-MM-dd"),
      end_date: format(new Date(to), "yyyy-MM-dd"),
    },
  })
}

export function getFavourites() {
  const favouries = localStorage.getItem("favourites")

  return favouries ? JSON.parse(favouries) : []
}

export function usePosts(dateRange) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [response, setResponse] = useState(null)

  async function refetch(newDateRange) {
    setLoading(true)
    try {
      const response = await getImages(newDateRange.from, newDateRange.to)

      setResponse(response)
      setLoading(false)
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    ;(async () => {
      await refetch(dateRange)
    })()
  }, [dateRange])

  return { isLoading: loading, response: response, error: error, refetch }
}

function HomePage(props) {
  const [dateRange, setDate] = useState(initialDateRange)
  const { isLoading, response, refetch, error } = usePosts(initialDateRange)
  const [favourites, setFavourites] = useState([])

  useEffect(() => {
    setFavourites(getFavourites())
  }, [])

  function onFavourite(newFavourite, state) {
    setFavourites((prevFavouries) => {
      let newFavouries = state
        ? prevFavouries.filter((item) => item.url !== newFavourite.url)
        : [...prevFavouries, newFavourite]
      localStorage.setItem("favourites", JSON.stringify(newFavouries))

      return newFavouries
    })
  }

  function onDateChange(newFromDate, newToDate) {
    const newDateRange = {
      from: newFromDate,
      to: newToDate,
    }

    setDate(newDateRange)
  }

  return (
    <div className="w-full flex">
      {isLoading && !error ? (
        <div className="flex items-center justify-center w-full pt-16">
          <CircularProgress />
        </div>
      ) : (
        <div className="flex flex-col">
          {error && response.status !== 200 && (
            <Alert severity="error" classes={{ root: "mx-4 mt-4" }}>
              {error.message}
            </Alert>
          )}
          <div className="flex pt-4 ml-4">
            <DateRangePicker
              dateRange={dateRange}
              onDateChange={onDateChange}
            />
            <Button
              classes={{ root: "ml-4" }}
              variant="contained"
              onClick={() => refetch(dateRange)}
            >
              Search
            </Button>
          </div>
          <PhotosGrid
            photos={response.data.map((item) => {
              const isFavourite = favourites.find((fav) => fav.url === item.url)

              return { ...item, isFavourite: Boolean(isFavourite) }
            })}
            onFavourite={onFavourite}
          />
        </div>
      )}
    </div>
  )
}

export default HomePage
