import { createBrowserRouter } from 'react-router-dom'
import Home from './components/Home/Home'
import Callback from './components/Callback/Callback'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/auth/callback', // google will redirect here
    element: <Callback />
  }
])

export default router
