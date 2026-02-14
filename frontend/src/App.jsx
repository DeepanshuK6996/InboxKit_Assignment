import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MapPage from './pages/MapPage';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      // <Route path = "/" element={<LandingPage/>}>
      //   <Route path = "/map" element={<MapPage/>}/>
      // </Route>
      <>      
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<MapPage />} />
      </>
    )
  )
  return (
    <RouterProvider router={router}/>
  )
}

export default App
