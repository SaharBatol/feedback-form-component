export const apiCallSimulation = (starRating, feedbackInput) => {
  //api call to be added here

  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log(starRating, feedbackInput);
      res();
    }, 1500);
  });
};
