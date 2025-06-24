
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { validateConfig } from './config/constants'

// Valider la configuration au démarrage
validateConfig();

createRoot(document.getElementById("root")!).render(<App />);
