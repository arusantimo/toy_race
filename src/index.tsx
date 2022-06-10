import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './style/index.css';

const container = document.getElementById('root') as HTMLElement;

const root = createRoot(container);

// StrictMode가 체크 로직을 위해 2번 임의로 랜더링을 한다고 하네요 https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
