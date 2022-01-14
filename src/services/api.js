import axios from "axios"

const API_KEY = "cTzHlaVxK6KZbqmAX114ZVphHUyuDgOT6meRgwhq"

export const apiClient = axios.create({
  baseURL: "https://api.nasa.gov",
  params: { api_key: API_KEY },
})
