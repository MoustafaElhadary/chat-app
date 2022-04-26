import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvider } from '../contexts/SocketProvider';
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from '../Pages/Dashboard';
import SignInPage from '../Pages/SignInPage';
import SignUpPage from '../Pages/SignUpPage';
import OldDashboard from './OldDashboard';

function App() {
  const [id, setId] = useLocalStorage<string>('id')

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <OldDashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  // return (
  //   id ? dashboard : <Login onIdSubmit={setId} />
  // )

  return(
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="login" element={<SignInPage/>} />
      <Route path="signup" element={<SignUpPage/>} />
    </Routes>
    
  )
}

export default App;
