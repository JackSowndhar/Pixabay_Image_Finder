import React, { useEffect, useState } from "react";
import "./PixabayProject.css";

const PixabayProject = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      setData([]);
      return;
    }

    fetch(
      `https://pixabay.com/api/?key=49369663-46ac965bd8a8855c8324806f5&q=${debouncedSearch}&image_type=photo`
    )
      .then((res) => res.json())
      .then((d) => setData(d.hits))
      .catch((err) => console.error("Error fetching images:", err));
  }, [debouncedSearch]);

  return (
    <div className="container">
      <h1>Pixabay Image Search</h1>
      <input
        type="text"
        placeholder="Search images..."
        onChange={(e) => setSearch(e.target.value)}
      />
      {data.length === 0 && debouncedSearch !== "" && (
        <p className="no-results">No images found.</p>
      )}
      <div className="image-grid">
        {data.map((item, index) => (
          <div key={index} className="image-card">
            <img src={item.webformatURL} alt={item.tags} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PixabayProject;
