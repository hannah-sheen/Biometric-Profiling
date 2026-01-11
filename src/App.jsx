import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Home from './Home.jsx';
import CreateProfile from './CreateProfile.jsx';
import ScanFace from './ScanFace.jsx';
import ViewProfile from './ViewProfile.jsx';
import CaptureFace from './CaptureFace.jsx';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/scan-face" element={<ScanFace />} />
          <Route path="/view-profile" element={<ViewProfile />} />
          <Route path="/capture-face" element={<CaptureFace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
