import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Input } from "../input";

/*
testids:
text-input - input field
*/

describe('Input Field', () => {
    test("renders input field", () => {
        const onSubmit = jest.fn();
        render(<Input onSubmit={onSubmit} label="New Todo Input" placeholder="What needs to be done?" />);
        expect(screen.getByTestId("text-input")).toBeInTheDocument();
    });

    test("submit todo on Enter key press", () => {
        const onSubmit = jest.fn();
        render(<Input onSubmit={onSubmit} label="New Todo Input" placeholder="What needs to be done?" />);
        const inputElement = screen.getByTestId("text-input");

        fireEvent.change(inputElement, { target: { value: "Todo task" } });
        fireEvent.keyDown(inputElement, { key: "Enter", code: 13 });

        expect(onSubmit).toHaveBeenCalledWith("Todo task");
    });

    test("does not submit todo when input value is less than 2 chars", () => {
        // hasValidMin() in input.jsx
        const onSubmit = jest.fn();
        render(<Input onSubmit={onSubmit} label="New Todo Input" placeholder="What needs to be done?" />);
        const inputElement = screen.getByTestId("text-input");

        fireEvent.change(inputElement, { target: { value: "H" } });
        fireEvent.keyDown(inputElement, { key: "Enter", code: 13 });

        expect(onSubmit).not.toHaveBeenCalled();
    });

    test("sanitizes input value before submitting", () => {
        // sanitize() in input.jsx
        const onSubmit = jest.fn();
        render(<Input onSubmit={onSubmit} label="New Todo Input" placeholder="What needs to be done?" />);
        const inputElement = screen.getByTestId("text-input");

        fireEvent.change(inputElement, { target: { value: '\' Sanitizer < & > " /' } });
        fireEvent.keyDown(inputElement, { key: "Enter", code: 13 });

        expect(onSubmit).toHaveBeenCalledWith("&#x27; Sanitizer &lt; &amp; &gt; &quot; &#x2F;");
    });
});
