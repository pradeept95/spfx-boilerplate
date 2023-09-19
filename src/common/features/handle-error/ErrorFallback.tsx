/* eslint-disable */
import * as React from "react";

export const ErrorFallback = ({ error }) => {
  return (
    <div role="alert">
      <h1>Runtime Error Occurred:</h1>
      <h4>Something went wrong:</h4>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
};
