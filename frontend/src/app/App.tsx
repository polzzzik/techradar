import './index.scss';
import { Routing } from '@/pages';
import Header from '@components/Header';
import Hotification from '@components/Notification';

function App() {
  return (
    <div className="bg-background min-h-screen w-full">
      <Header />
      <Hotification />
      <Routing />
    </div>
  );
}

export default App;
