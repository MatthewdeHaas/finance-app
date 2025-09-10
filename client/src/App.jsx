import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Index from './pages/Index'
import Dashboard from './pages/Dashboard'
import Accounts from './pages/Accounts'
import Budget from './pages/Budget'
import NotFound from './pages/NotFound'
import RequiresAuth from './RequiresAuth'
import RequiresGuest from './RequiresGuest'

const App = () => {
  return (
    <div className="App min-h-screen bg-gray-50">
          
      <Navbar />

      <Routes>
        <Route path="/"  element={
          <RequiresGuest>
            <Index />
          </RequiresGuest>
        }></Route>

        <Route path="/dashboard" element={
          <RequiresAuth>
            <Dashboard />
          </RequiresAuth>
        }></Route>

        <Route path="/accounts" element={
          <RequiresAuth>
            <Accounts />
          </RequiresAuth>
        }></Route>

        <Route path="/budget" element={
          <RequiresAuth>
            <Budget/>
          </RequiresAuth>
        }></Route>

        <Route path="*" element={<NotFound />}></Route>

      </Routes>

    </div>
  );
} 

export default App;
