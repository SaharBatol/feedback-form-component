import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { apiCallSimulation } from "../api";
import LoadingSpinner from "./LoadingSpinner";

const FeedbackForm = ({ handleClosePopup, setIsSubmitted }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [feedbackInput, setFeedbackInput] = useState("");

  const stars = [1, 2, 3, 4, 5];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    apiCallSimulation(starRating, feedbackInput)
      .then(() => {
        setIsSubmitted(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <h1 className="heading">How was your experience?</h1>
      <h2 className="subheading">
        Please let us know how we did by filling in the feedback form below!
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="rating-container">
          {stars.map((number) => (
            <FaStar
              key={number}
              onClick={() => {
                setStarRating(number);
              }}
              color={number <= starRating ? "gold" : "hsl(217, 13%, 40%)"}
              id="star-styling"
            />
          ))}
        </div>
        <textarea
          id="input-field"
          type="text"
          placeholder="Enter your feedback here"
          onChange={(e) => {
            setFeedbackInput(e.target.value);
          }}
          value={feedbackInput}
        />
        <div className="popup-button-container">
          <button
            className="popup-button-style close-button"
            onClick={handleClosePopup}
          >
            CLOSE
          </button>
          <button
            className="popup-button-style submit-button loading-button"
            type="submit"
          >
            {isLoading ? <LoadingSpinner /> : "SUBMIT"}
          </button>
        </div>
      </form>
    </>
  );
};

export default FeedbackForm;
