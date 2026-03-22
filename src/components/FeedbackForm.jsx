import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { apiCallSimulation } from "../api";
import LoadingSpinner from "./LoadingSpinner";

const FeedbackForm = ({
  handleClosePopup,
  setIsSubmitted,
  isLoading,
  setIsLoading,
}) => {
  const [starRating, setStarRating] = useState(0);
  const [feedbackInput, setFeedbackInput] = useState("");
  const [errorStar, setErrorStar] = useState("");
  const [errorField, setErrorField] = useState("");
  const [error, setError] = useState("");

  const stars = [1, 2, 3, 4, 5];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (starRating === 0 && feedbackInput === "") {
      setErrorStar("This field is required");
      setErrorField("This field is required");
      return;
    }

    if (starRating === 0) {
      setErrorStar("This field is required");
      return;
    }

    if (feedbackInput === "") {
      setErrorField("This field is required");
      return;
    }

    setIsLoading(true);
    apiCallSimulation(starRating, feedbackInput)
      .then(() => {
        setErrorStar("");
        setErrorField("");
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
                if (isLoading) {
                  return;
                }
                setStarRating(number);
                if (number !== 0) {
                  setErrorStar("");
                }
              }}
              color={number <= starRating ? "gold" : "hsl(217, 13%, 40%)"}
              id="star-styling"
            />
          ))}
        </div>
        {errorStar && <p className="error">{errorStar}</p>}
        <textarea
          id="input-field"
          type="text"
          placeholder="Enter your feedback here"
          onChange={(e) => {
            setFeedbackInput(e.target.value);
            if (feedbackInput !== "") {
              setErrorField("");
            }
          }}
          value={feedbackInput}
        />
        {errorField && <p className="error">{errorField}</p>}
        <div className="popup-button-container">
          <button
            className="popup-button-style close-button"
            onClick={handleClosePopup}
            disabled={isLoading}
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
