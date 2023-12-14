import React, { useState, useEffect } from "react";
import PostItem from "../PostItem/PostItem";
import DrugItem from "../DrugItem/DrugItem";
import "./Slideshow.css";

const Slideshow = () => {
    const [data, setData] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        fetch("http://localhost:4000/posts")
            .then((response) => response.json())
            .then((jsonData) => setData(jsonData))
            .catch((error) => console.error(error));

            const interval = setInterval(() => {
              setCurrentSlide((prevSlide) => (prevSlide + 1) % data.length);
            }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slideshow">
            {/* <div className="slide">
                <p className="news">"{data[currentSlide]}"</p>
            </div> */}
        </div>
    );
};

export default Slideshow;
