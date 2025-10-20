import { BrowserRouter as Router } from 'react-router-dom';
import { Header, Footer } from './components'
import { RoutesComponent } from './routes';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <div className='min-h-screen flex flex-col'>
            <Header />
            <main className='grow my-14'>
              <RoutesComponent />
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
