import React, { useState } from 'react';
import './css/Sell.css';

const Sell = () => {
    const [additionalField, setAdditionalField] = useState(
      <div className="form-group">
        <label htmlFor="classification">Classification:</label>
        <select id="classification" name="classification" required>
            <option value="U1">U1</option>
            <option value="U2">U2</option>
            <option value="U3">U3</option>
            <option value="U4">U4</option>
        </select>
      </div>
    );

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;

        if (selectedCategory === 'Sports Pass') {
            setAdditionalField(
                <div className="form-group">
                    <label htmlFor="classification">Classification:</label>
                    <select id="classification" name="classification" required>
                        <option value="U1">U1</option>
                        <option value="U2">U2</option>
                        <option value="U3">U3</option>
                        <option value="U4">U4</option>
                    </select>
                </div>
            );
        } 

        else if (selectedCategory === 'Bicycles') {
            setAdditionalField(null);
        } 
        
        else {
            setAdditionalField(
                <div className="form-group">
                    <label htmlFor="what-are-you-selling">What are you selling?</label>
                    <input type="text" id="what-are-you-selling" name="what-are-you-selling" required />
                </div>
            );
        }
    };

    return (
        <div className="sell-page">
            <h1>Create New Listing</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select id="category" name="category" onChange={handleCategoryChange} required>
                        <option value="Sports Pass">Sports Pass</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Tools">Tools</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Sports & Outdoors">Sports & Outdoors</option>
                        <option value="Bicycles">Bicycles</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {additionalField}

                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" required />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" rows="4" required></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="contact">Contact:</label>
                    <input type="text" id="contact" name="contact" required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>

                <div className="form-group">
                    <label htmlFor="photos">Photos:</label>
                    <input type="file" id="photos" name="photos" accept="image/*" multiple required />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Sell;
