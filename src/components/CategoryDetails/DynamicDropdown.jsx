import axios from "axios";
import React, { useState, useEffect } from "react";

function DynamicDropdown() {
  const [countries, setCountries] = useState([]);

  const [states, setStates] = useState([]);

  const [cities, setCities] = useState([]);

  const handleCountryChange = async (event) => {
    const selectedCountry = event.target.value;
    const response = await axios(
      `http://localhost/tutorial/dynamic_dependent_dropdown_box/api/fetch.php?country=${selectedCountry}`
    );
    const data = await response.json();
    setStates(data);
    setCities([]);
  };

  const handleStateChange = async (event) => {
    const selectedState = event.target.value;
    const response = await axios(
      `http://localhost/tutorial/dynamic_dependent_dropdown_box/api/fetch.php?state=${selectedState}`
    );
    const data = await response.json();
    setCities(data);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios(
        "http://localhost/tutorial/dynamic_dependent_dropdown_box/api/fetch.php"
      );

      const data = await response.json();

      setCountries(data);
    };

    fetchCountries();
  }, []);

  return (
    <div className="container">
      <h1 className="mt-5 mb-5 text-primary text-center">
        <b>Dynamic Dependent Dropdown Box in React.js</b>
      </h1>

      <div className="card">
        <div className="card-header">
          Dynamic Dependent Dropdown Box in React.js
        </div>
        <div className="card-body">
          <div className="mb-3">
            <select className="form-select" onChange={handleCountryChange}>
              <option value="">Select Country</option>
              {countries.map((country, index) => (
                <option key={index} value={country.country}>
                  {country.country}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <select className="form-select" onChange={handleStateChange}>
              <option value="">Select State</option>
              {states.map((state, index) => (
                <option key={index} value={state.state}>
                  {state.state}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <select className="form-select">
              <option value="">Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city.city}>
                  {city.city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DynamicDropdown;
