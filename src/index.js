import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { Provider } from "react-redux"
import { store } from "./Redux/store.js"
import { QueryClient, QueryClientProvider } from "react-query"
// import { ReactQueryDevtools } from "react-query/devtools"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const client = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer autoClose={4000} closeButton={false} />
      <QueryClientProvider client={client}>
        <App />
        {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right' /> */}
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
