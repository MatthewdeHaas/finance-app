import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Index from './pages/Index'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Budget from './pages/Budget'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <div className="App min-h-screen bg-gray-50">
          
      <Navbar />

      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/transactions" element={<Transactions />}></Route>
        <Route path="/budget" element={<Budget />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>

    </div>
  );
} 

export default App;
