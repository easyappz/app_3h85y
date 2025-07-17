import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import NewsFeed from './pages/NewsFeed';
import Messages from './pages/Messages';
import Search from './pages/Search';
import Settings from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<NewsFeed />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/search" element={<Search />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
