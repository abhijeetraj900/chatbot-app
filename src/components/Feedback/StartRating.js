// StarRating.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function StarRating({ value: initialValue, onChange }) {
  // State to hold the rating value, initialized with the passed value
  const [value, setValue] = useState(initialValue);

  // Function to handle rating changes
  const handleRatingChange = (event, newValue) => {
    setValue(newValue); // Update the local state
    onChange(newValue); // Pass the updated value to the parent component
    console.log("Star rating:", newValue); // Log the updated rating for debugging
  };

  return (
    <Box sx={{ "& > legend": { mt: 2 } }}>
      {/* Title for the rating component */}
      <Typography component="legend">Rate this response</Typography>

      {/* Rating component from Material UI */}
      <Rating
        name="custom-rating"
        value={value} // Set the current value of the rating
        onChange={handleRatingChange} // Trigger the handleRatingChange function on value change
      />
    </Box>
  );
}

export default StarRating;
