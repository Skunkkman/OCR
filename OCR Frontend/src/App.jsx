import { BrowserRouter } from 'react-router-dom';
import ChatPage from './Pages/ChatPage/ChatPage';

export default function App() {
  return (
    <BrowserRouter>
      <ChatPage />
    </BrowserRouter>
  );
}
