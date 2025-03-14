import { Route, Routes } from "react-router-dom"
import Properties from "../Pages/properties"
import { useProperty } from "../Components/layout/useLayout/useProperty"
import Main from "../Components/layout/main"

const Routers = () => {
  const { DetailedPropertyComponent } = useProperty()

  return (
    <Routes>
      <Route element={<Main />}>
        <Route path='/' element={<Properties />} />
        <Route path='/property/:id' element={<DetailedPropertyComponent />} />
      </Route>
    </Routes>
  )
}
export default Routers
