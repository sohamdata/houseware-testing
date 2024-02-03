import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Item } from "../item";

/* 
testids:
todo-item - todo item
todo-item-toggle - toggle button
todo-item-label - todo title
todo-item-button - remove todo button
*/

const TODO = { id: 1, title: "Todo task", completed: false };

describe('Todo Item', () => {
    test("renders todo item", () => {
        const dispatch = jest.fn();
        render(<Item todo={TODO} dispatch={dispatch} index={0} />);

        expect(screen.getByText('Todo task')).toBeInTheDocument();
        expect(screen.getByTestId("todo-item")).toBeInTheDocument();
        expect(screen.getByTestId('todo-item')).not.toHaveClass('completed');
    });

    test("update todo title on double click", () => {
        const dispatch = jest.fn();
        render(<Item todo={TODO} dispatch={dispatch} index={0} />);

        const itemLabel = screen.getByTestId("todo-item-label");
        fireEvent.doubleClick(itemLabel);

        const inputElement = screen.getByTestId("text-input");

        fireEvent.change(inputElement, { target: { value: "Oh no wait" } });
        fireEvent.keyDown(inputElement, { key: "Enter", code: 13 });

        expect(dispatch).toHaveBeenCalledWith({ type: "UPDATE_ITEM", payload: { id: 1, title: "Oh no wait" } });
    });

    test("toggle: mark as completed", () => {
        const dispatch = jest.fn();
        render(<Item todo={TODO} dispatch={dispatch} index={0} />);

        const checkbox = screen.getByTestId("todo-item-toggle");
        fireEvent.click(checkbox);

        expect(dispatch).toHaveBeenCalledWith({ type: "TOGGLE_ITEM", payload: { id: 1 } });
    });

    test("delete a todo", () => {
        const dispatch = jest.fn();
        render(<Item todo={TODO} dispatch={dispatch} index={0} />);

        const remove = screen.getByTestId("todo-item-button");
        fireEvent.click(remove);

        expect(dispatch).toHaveBeenCalledWith({ type: "REMOVE_ITEM", payload: { id: 1 } });

        // setTimeout(() => {
        //     // wait for the item to be removed
        //     expect(screen.getByText("Todo task")).not.toBeInTheDocument();
        // }, 500);
    });

});
