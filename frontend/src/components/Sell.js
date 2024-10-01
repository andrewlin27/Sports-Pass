import React, { useState } from "react";
import ThankYou from "./ThankYou"; // Import the ThankYou component
import PriceAlert from "./PriceAlert"; // Import the custom PriceAlert component
import "./css/Sell.css";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3"; // Import reCAPTCHA v3 components

const SellForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha(); // Access the executeRecaptcha function
  const [formData, setFormData] = useState({
    name: "",
    class: "U1",
    game: "Notre Dame",
    price: "",
    contact: "",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track submission status
  const [alertMessage, setAlertMessage] = useState(""); // State for alert message

  const maxPriceDict = {
    "Notre Dame": 100,
    "McNeese State": 25,
    "Bowling Green": 25,
    "Missouri": 50,
    "LSU": 65,
    "NM State": 25,
    "Texas": 100,
    "Arkansas": 300,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      ...(name === "game" && value === "Arkansas"
        ? { class: "" }
        : name === "game" && prevFormData.game === "Arkansas"
        ? { class: "U1" } // Reset to "U1" if switching back from Arkansas
        : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      setAlertMessage("reCAPTCHA not yet available");
      return;
    }

    // Execute reCAPTCHA v3 verification
    const captchaToken = await executeRecaptcha("sell_form_submit");

    if (!captchaToken) {
      setAlertMessage("CAPTCHA verification failed. Please try again.");
      return;
    }

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
      setAlertMessage(
        `Invalid request body. Missing keys: ${missingKeys.join(", ")}`
      );
      return;
    }

    const maxPrice = maxPriceDict[formData.game];
    if (parseFloat(formData.price) > maxPrice) {
      setAlertMessage(
        `Per Aggie Ticketing Rules, the resell price for ${formData.game} cannot exceed $${maxPrice}. Please adjust the price and see the "Info" tab for more details.`
      );
      return;
    }

    try {
      const response = await fetch(
        "https://sxpktops93.execute-api.us-east-2.amazonaws.com/prod/post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "B5UTBWtEa84n3Mpc5hMeqa1jYvwdssvUR8qgrBU8",
          },
          body: JSON.stringify({
            ...formData,
            captchaToken, // Send captcha token to the backend
          }),
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
      setAlertMessage("Error creating post");
    }
  };

  // Close the alert
  const handleCloseAlert = () => {
    setAlertMessage("");
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
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
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
            <option value="Arkansas">Arkansas</option>
            <option value="Missouri">Missouri</option>
            <option value="LSU">LSU</option>
            <option value="NM State">NM State</option>
            <option value="Texas">Texas</option>
          </select>
        </div>

        <div className="form-group">
          {formData.game === "Arkansas" ? (
            <input
              type="text"
              id="class"
              name="class"
              value={formData.class || ""} // Use a separate field for section
              onChange={handleChange}
              className="class" // Apply the same className for consistent styling
              placeholder="Enter Section Number"
              required
            />
          ) : (
            <select
              id="class"
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="class" // Keep the className consistent for styling
              required
            >
              <option value="U1">U1</option>
              <option value="U2">U2</option>
              <option value="U3">U3</option>
              <option value="U4">U4</option>
            </select>
          )}
        </div>

        <div className="form-group">
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            id="contact"
            name="contact"
            placeholder="Contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password (used when deleting your post)"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" id="submit">
          Submit
        </button>
      </form>

      {alertMessage && (
        <PriceAlert message={alertMessage} onClose={handleCloseAlert} />
      )}
    </div>
  );
};

const Sell = () => (
  <GoogleReCaptchaProvider reCaptchaKey="6LeV81IqAAAAAN1z1OmNUcNZp1J3FSgtS3rKMm6T">
    <SellForm />
  </GoogleReCaptchaProvider>
);

export default Sell;
