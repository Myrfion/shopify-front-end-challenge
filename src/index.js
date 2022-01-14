import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { QueryClientProvider, QueryClient } from "react-query"

const queryClient = new QueryClient()
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
