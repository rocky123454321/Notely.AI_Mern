import React from 'react'
import {Route, Routes} from 'react-router'
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'
import NoteDetailPage from './pages/NoteDetailPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
const App = () => {

  return (
    <div   data-theme="lofi">
      
      <Routes> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='/' element={<HomePage/>}/>
        <Route path='/create' element={<CreatePage />} />
        <Route path='/note/:id' element={<NoteDetailPage/>}/>
      </Routes>
    </div>
    
  )
}

export default App