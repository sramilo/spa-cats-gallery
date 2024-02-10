import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AuthContextProvider } from './components/AuthContextProvider/AuthContextProvider.jsx'

import store from './store.js'
import router from './router.jsx'

import 'atropos/css'

const root = createRoot(document.getElementById('app'))

root.render(
  <Provider store={store}>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </Provider>
)
