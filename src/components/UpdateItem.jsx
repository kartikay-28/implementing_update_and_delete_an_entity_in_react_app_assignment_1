import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateItem = ({ itemId }) => {
    const [item, setItem] = useState(null);
    const [updatedItem, setUpdatedItem] = useState('');
    const [message, setMessage] = useState('');

    const API_URI = `http://${import.meta.env.VITE_API_URI}/doors/${itemId}`;

    // Fetch existing item on component mount
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(API_URI);
                setItem(response.data);
            } catch (error) {
                console.error('Error fetching item:', error);
                setMessage('Failed to fetch item. Please try again.');
            }
        };
        fetchItem();
    }, [itemId]);

    // Handle input change
    const handleChange = (e) => {
        setUpdatedItem(e.target.value);
    };

    // Handle update submission
    const handleUpdate = async () => {
        try {
            const response = await axios.put(API_URI, { ...item, name: updatedItem });
            setItem(response.data);
            setMessage('Item successfully updated! ✅');
        } catch (error) {
            console.error('Error updating item:', error);
            setMessage('Failed to update item. Please try again. ❌');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Update Item</h2>
            {item ? (
                <div>
                    <p><strong>Current Item:</strong> {item.name}</p>
                    <input
                        type="text"
                        value={updatedItem}
                        onChange={handleChange}
                        placeholder="Enter new item name"
                        style={{ width: '100%', padding: '8px', margin: '10px 0' }}
                    />
                    <button onClick={handleUpdate} style={{ padding: '8px 15px', cursor: 'pointer' }}>
                        Update Item
                    </button>
                </div>
            ) : (
                <p>Loading item data...</p>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateItem;
