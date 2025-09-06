import { render, screen } from "@testing-library/react";
import App from "../App";
import '@testing-library/jest-dom';

test("muestra el título de la app", () => {
  render(<App />);
  expect(screen.getByText(/Ingreso de Usuarios/i)).toBeInTheDocument();
});