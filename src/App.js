import React from 'react';
import './App.css';
import UploadImages from './components/UploadImages';
import PhotoTrail from './components/PhotoTrail';
import TimelineList from './components/TimelineList';
import TimelineEditList from './components/TimelineEditList';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


function App() {
  return (
    <div>Hello World!</div>
    /*
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App" style={{ position: 'fixed', height: '100%', width: '100%' }}>
        <NavBar />
        <div className="PhotoTrailWrapper" style={{ position: 'fixed', height: '96%', width: '100%', bottom: 0 }}>
          <Routes>
            <Route path="/photoTimeline/:timelineID" element={
              <PhotoTrail />
            } />
            <Route path="/upload/:timelineID" element={
              <UploadImages />
            } />
            <Route path="/timelineList" element={
              <TimelineList />
            } />
            <Route path="/timelineEditList" element={
              <TimelineEditList />
            } />
            <Route path="*" element={<Navigate to="/timelineList" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>*/

  );


}

export default App;
