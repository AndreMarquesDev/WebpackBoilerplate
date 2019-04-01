'serviceWorker' in navigator && window.addEventListener('load', () => navigator.serviceWorker.register('/service-worker.js'));

import './index.html';
import './styles/main.scss';

import './scripts/script.js';