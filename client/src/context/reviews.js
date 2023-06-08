import React, {useState, useEffect} from "react";

const ReviewsContext = React.createContext();

function ReviewsProvider({ children }) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
      fetchReviews()
    }, []);

    const fetchReviews = () => {
      fetch("/reviews").then((response) => {
          response.json().then((reviews) => {
            console.log(reviews);
            setReviews(reviews)});
      });
    }

    const addReviewToState = (newReview) => {
      setReviews([...reviews, newReview]);
    };
  
    const removeReviewFromState = (deleteID) => {
      setReviews((reviews) =>
        reviews.filter((review) => {
          return review.id !== deleteID;
        })
      );
    };

    return (
        <ReviewsContext.Provider value={{ reviews, setReviews, addReviewToState, removeReviewFromState, fetchReviews }}>
            {children}
        </ReviewsContext.Provider>
    );
}

export { ReviewsContext, ReviewsProvider };