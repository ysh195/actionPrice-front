/* eslint-disable react/prop-types */
import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

export function CommentForm({ loading, error }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={1}>
        <TextField
          multiline
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          variant="outlined"
          placeholder="Write a comment..."
          rows={3}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          color="primary"
        >
          {loading ? "Loading..." : "Post"}
        </Button>
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
      </Box>
    </form>
  );
}
