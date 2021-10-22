import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "./Login";

test("Checks for invalid email helper text is present on blur", () => {
  render(<Login />);
  const inputElement = screen.getByLabelText(/email/i);
  inputElement.focus();
  inputElement.value = "xyxz";
  inputElement.blur();
  const helperTextElement = screen.getByText(/Enter Correct Email/i);
  expect(helperTextElement).toBeInTheDocument();
});

test("Checks for invalid password pattern helper text is present on blur", () => {
  render(<Login />);
  const inputElement = screen.getByLabelText(/password/i);
  inputElement.focus();
  inputElement.value = "xyxz";
  inputElement.blur();
  const helperTextElement = screen.getByText(/password must contain/i);
  expect(helperTextElement).toBeInTheDocument();
});
