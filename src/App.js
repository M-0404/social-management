// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Layout from './components/Layout';
// import Dashboard from './pages/Dashboard';
// import Members from './pages/Members';
// import Events from './pages/Events';
// import Notices from './pages/Notices';
// import Settings from './pages/Settings';
// import FrontPage from './pages/FrontPage';
// import AuthPage from './pages/AuthPage';
// import './App.css';



// function App() {
//   const [showFrontPage, setShowFrontPage] = useState(true);
//   const [showAuth, setShowAuth] = useState(false);

//   if (showFrontPage) {
//     return <FrontPage onStart={() => { setShowFrontPage(false); setShowAuth(true); }} />;
//   }

//   if (showAuth) {
//     return <AuthPage onAuth={() => setShowAuth(false)} />;
//   }

//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/members" element={<Members />} />
//           <Route path="/events" element={<Events />} />
//           <Route path="/notices" element={<Notices />} />
//           <Route path="/settings" element={<Settings />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// }
import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('https://your-backend.onrender.com/')
 // <-- Backend URL
      .then((res) => res.text())
      .then((data) => setMessage(data));
  }, []);

  return (
    <div>
      <h1>React Frontend</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;




