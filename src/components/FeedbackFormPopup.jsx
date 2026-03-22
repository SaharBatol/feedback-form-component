import { useState } from "react";

import FormSubmissionSuccess from "./FormSubmissionSuccess";
import FeedbackForm from "./FeedbackForm";

const FeedbackFormPopup = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="popup-container">
        <div className="popup-content-container">
          <button className="popup-cross-button" onClick={handleClosePopup}>
            X
          </button>

          {isSubmitted ? (
            <FormSubmissionSuccess />
          ) : (
            <FeedbackForm
              setIsSubmitted={setIsSubmitted}
              handleClosePopup={handleClosePopup}
            />
          )}
        </div>
      </div>
    )
  );
};

export default FeedbackFormPopup;
