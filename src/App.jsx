import React from 'react';
import UpdateItem from "./components/UpdateItem";

// use the following link to get the data
// `/doors` will give you all the doors, to get a specific door use `/doors/1`.
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  return <UpdateItem itemId={1} />; // Provide the item ID for fetching the specific item
}

export default App;
