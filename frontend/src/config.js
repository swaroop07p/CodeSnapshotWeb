// src/config.js
const API_URL = import.meta.env.MODE === 'development' 
    ? 'http://localhost:5000' 
    : 'https://codesnapshotweb.onrender.com'; // PASTE YOUR RENDER LINK HERE

export default API_URL;