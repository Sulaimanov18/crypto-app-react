import {CryptoContextProvider} from './context/crypto-context';
import AppLayout from './components/layout/AppLayout';

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 60,
  paddingInline: 48,
  lineHeight: '64x',
  backgroundColor: '#4096ff',
}

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#00',
}

const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
}




export default function App() {
  return (
    <CryptoContextProvider>
     <AppLayout />
    </CryptoContextProvider>
  );
}
