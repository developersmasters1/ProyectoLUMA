import { render, screen } from "@testing-library/react";
import Login from "../Login";
import '@testing-library/jest-dom';

test("renderiza el formulario de login", () => {
  render(<Login setUsuario={() => {}} />);
  expect(screen.getByText(/Ingreso de Usuarios/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Correo/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Contraseña/i)).toBeInTheDocument();
});