import React, { useState } from "react";
import DinnerCard from "../../components/DinnerCard";
import styles from "../../styles/DashBoard.module.css";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    foodInterests: "Italian",
    theme: "None(casual)",
    allergies: [],
    date: "",
    time: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => {
        const updatedAllergies = checked
          ? [...prevData.allergies, value]
          : prevData.allergies.filter((allergy) => allergy !== value);
        return {
          ...prevData,
          allergies: updatedAllergies
        };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const selectedDate = new Date(`${formData.date}T${formData.time}`);
    if (selectedDate < currentDate) {
      alert("The selected date and time must be in the future.");
      return;
    }
    console.log("Form Data Submitted:", formData);    
  };

  return (
    <div className={styles.dashboard}>
      <section className="hero">
        <div className="hero-content text-center">
          <h1 id="hero-title">Organize Or Join a Dinner!</h1>
          <p>Create your own DinnerClub "Here" invite Other Profile's for your next Dinner!</p>
        </div>
      </section>

      <section id="upcoming-dinners" className="features">
        <h2>Upcoming Dinners</h2>
        <DinnerCard />
      </section>

      <section className="create-dinner">
        <h2>Create Your Own Dinner</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="mb-3">
            <label htmlFor="foodInterests" className="form-label">Type of Food?</label>
            <select
              className="form-select"
              id="foodInterests"
              name="foodInterests"
              value={formData.foodInterests}
              onChange={handleChange}
            >
              <option>Italian</option>
              <option>Mexican</option>
              <option>Vegan</option>
              <option>Asian</option>
              <option>French</option>
              <option>American</option>
              <option>South American</option>
              <option>Mediterranean</option>
              <option>Indian</option>
              <option>Chinese</option>
              <option>Japanese</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="theme" className="form-label">Theme of the dinner</label>
            <select
              className="form-select"
              id="theme"
              name="theme"
              value={formData.theme}
              onChange={handleChange}
            >
              <option>No theme</option>
              <option>ABBA Dinner</option>
              <option>Beach BBQ</option>
              <option>Medieval Feast</option>
              <option>Retro Dinner Party</option>
              <option>Dress up Feast</option>
              <option>Asian New Year</option>
              <option>Pajama Party</option>
              <option>Farm to Table</option>
              <option>Fantasy Feast</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="allergies" className="form-label">Any allergies?</label>
            <div className={styles.allergies}>
              {["None", "Gluten", "Milk", "Eggs", "Peanuts", "Soybeans", "Fish", "Crustaceans", "Molluscs", "Celery", "Lupin", "Sesame", "Mustard", "Sulphites"].map((allergy) => (
                <div key={allergy} className={styles.allergyItem}>
                  <input
                    type="checkbox"
                    id={allergy}
                    name="allergies"
                    value={allergy}
                    checked={formData.allergies.includes(allergy)}
                    onChange={handleChange}
                  />
                  <label htmlFor={allergy}>{allergy}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="time" className="form-label">Time</label>
            <input
              type="time"
              className="form-control"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Create Dinner</button>
        </form>
      </section>
    </div>
  );
};

export default Dashboard;
