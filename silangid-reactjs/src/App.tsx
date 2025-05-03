import './App.css'
import { AuthProvider } from './context/AuthContext'
import { ModalProvider } from './context/ModalContext'
import { UserProvider } from './context/UserContext'
import { AppRoutes } from './routes/routes'
import { Toaster } from 'react-hot-toast';

const App = () => (
  <AuthProvider>
    <UserProvider>
      <ModalProvider>
        <Toaster/>
        <AppRoutes />
      </ModalProvider>
    </UserProvider>
  </AuthProvider>
)

export default App
