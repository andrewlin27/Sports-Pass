import React, { useState } from "react";
import ThankYou from "./ThankYou"; // Import the ThankYou component
import "./css/Sell.css";

const Sell = () => {
  const [formData, setFormData] = useState({
    name: "",
    class: "U1",
    game: "Notre Dame",
    price: "",
    contact: "",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track submission status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredKeys = [
      "name",
      "class",
      "game",
      "price",
      "contact",
      "password",
    ];
    const missingKeys = requiredKeys.filter((key) => !formData[key]);

    if (missingKeys.length > 0) {
      alert(`Invalid request body. Missing keys: ${missingKeys.join(", ")}`);
      return;
    }

    try {
      console.log("test" + JSON.stringify(formData));
      const response = await fetch(
        "https://sxpktops93.execute-api.us-east-2.amazonaws.com/prod/post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "B5UTBWtEa84n3Mpc5hMeqa1jYvwdssvUR8qgrBU8",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
      setIsSubmitted(true); // Set submission status to true
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating post");
    }
  };

  // Show the ThankYou component if the form has been submitted
  if (isSubmitted) {
    return <ThankYou />;
  }

  return (
    <div className="sell-page">
      <h1>Create New Listing</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            Name<span className="required"> *</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="classification">
            Classification<span className="required"> *</span>
          </label>
          <select
            id="class"
            name="class"
            value={formData.class}
            onChange={handleChange}
            required
          >
            <option value="U1">U1</option>
            <option value="U2">U2</option>
            <option value="U3">U3</option>
            <option value="U4">U4</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="game">
            Game<span className="required"> *</span>
          </label>
          <select
            id="game"
            name="game"
            value={formData.game}
            onChange={handleChange}
            required
          >
            <option value="Notre Dame">Notre Dame</option>
            <option value="McNeese State">McNeese State</option>
            <option value="Bowling Green">Bowling Green</option>
            <option value="Missouri">Missouri</option>
            <option value="LSU">LSU</option>
            <option value="NM State">NM State</option>
            <option value="Texas">Texas</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">
            Price<span className="required"> *</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact">
            Contact<span className="required"> *</span>
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">
            Password<span className="required"> *</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="(used when deleting your post)"
            required
          />
        </div>

        <button type="submit" id="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Sell;
