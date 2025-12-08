import './App.css';
import { AppProviders } from '@/providers/AppProviders.tsx';
import { AppRouter } from '@/router/AppRouter.tsx';

export default function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}