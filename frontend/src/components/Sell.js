import React, { useState } from 'react';
import './css/Sell.css';

const Sell = () => {
    const [additionalField, setAdditionalField] = useState(
      <div className="form-group">
        <label htmlFor="classification">Classification<span className="required"> *</span></label>
        <select id="classification" name="classification" required>
            <option value="U1">U1</option>
            <option value="U2">U2</option>
            <option value="U3">U3</option>
            <option value="U4">U4</option>
        </select>
      </div>
    );

    const [imageField, setImageField] = useState(null);

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;

        if (selectedCategory === 'Sports Pass') {
          setImageField(null);

          setAdditionalField(
              <div className="form-group">
                  <label htmlFor="classification">Classification<span className="required"> *</span></label>
                  <select id="classification" name="classification" required>
                      <option value="U1">U1</option>
                      <option value="U2">U2</option>
                      <option value="U3">U3</option>
                      <option value="U4">U4</option>
                  </select>
              </div>
          );
        } 

        else {
          setImageField(
            <div className="form-group">
              <label htmlFor="photos">Photos<span className="required"> *</span></label>
              <input type="file" id="photos" name="photos" accept="image/*" multiple onChange={handleFileChange} required />
            </div>
          );
          
          if (selectedCategory === 'Bicycles') {
            setAdditionalField(null);
          } 
          
          else {
            setAdditionalField(
                <div className="form-group">
                    <label htmlFor="what-are-you-selling">What are you selling?<span className="required"> *</span></label>
                    <input type="text" id="what-are-you-selling" name="what-are-you-selling" required />
                </div>
            );
          }
        }
    };

    const handleFileChange = (e) => {
      if (e.target.files.length > 5) {
          alert('You can only upload a maximum of 5 images');
          e.target.value = null;
      }
    };

    return (
        <div className="sell-page">
            <h1>Create New Listing</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name<span className="required"> *</span></label>
                    <input type="text" id="name" name="name" required />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category<span className="required"> *</span></label>
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
                    <label htmlFor="price">Price<span className="required"> *</span></label>
                    <input type="number" id="price" name="price" required />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" rows="4" placeholder='(recommended)'></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="contact">Contact<span className="required"> *</span></label>
                    <input type="text" id="contact" name="contact" required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password<span className="required"> *</span></label>
                    <input type="password" id="password" name="password" placeholder='(used when deleting your post)' required />
                </div>

                {imageField}

                <button type="submit" id="submit">Submit</button>
            </form>
        </div>
    );
};

export default Sell;
