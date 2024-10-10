import { RouterProvider } from 'react-router-dom'
import router from './router'
import { Toaster } from 'react-hot-toast'
import UserProvider from './context/user'

function App() {
  return (
    <UserProvider>
      <Toaster/>
      <RouterProvider router={router}/>
    </UserProvider>
    // <Toaster>
    // </Toaster>
  )
}

export default App
