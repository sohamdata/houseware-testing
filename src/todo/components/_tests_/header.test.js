import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import React from "react";
import { Header } from "../header";

describe('Header component', () => {
    test('renders header', () => {
        const dispatch = jest.fn();
        render(<Header dispatch={dispatch} />);
        expect(screen.getByTestId('header')).toBeInTheDocument();
    });
});
