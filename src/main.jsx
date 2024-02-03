import { createRoot } from 'react-dom/client'
import { App } from './components/App/App.jsx'
import { Provider } from 'react-redux'
import store from './store.js'

import 'atropos/css'

const root = createRoot(document.getElementById('app'))

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
