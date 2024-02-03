import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '../footer';

/*
testids:
footer - footer container
footer-navigation - filter items
*/

const TODOS = [{ id: 1, title: "Todo task", completed: false }, { id: 2, title: "Completed task", completed: true }];

describe('Footer actions', () => {
    test('renders footer when there are todos', () => {

        const dispatch = jest.fn();
        render(
            <MemoryRouter>
                <Footer todos={TODOS} dispatch={dispatch} />
            </MemoryRouter>
        );
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });

    test('does not render footer when there are no todos', () => {
        const dispatch = jest.fn();
        render(
            <MemoryRouter>
                <Footer todos={[]} dispatch={dispatch} />
            </MemoryRouter>
        );
        expect(screen.queryByTestId('footer')).toBeNull();
    });

    test('displays correct no. of pending todos', () => {

        const dispatch = jest.fn();
        render(
            <MemoryRouter>
                <Footer todos={TODOS} dispatch={dispatch} />
            </MemoryRouter>
        );
        expect(screen.getByText('1 item left!')).toBeInTheDocument();
    });

    test('clicking clear completed button triggers removeCompleted function', () => {
        const dispatch = jest.fn();
        render(
            <MemoryRouter>
                <Footer todos={TODOS} dispatch={dispatch} />
            </MemoryRouter>
        );

        const clearCompletedButton = screen.getByText('Clear completed');
        fireEvent.click(clearCompletedButton);
        expect(dispatch).toHaveBeenCalledWith({ type: "REMOVE_COMPLETED_ITEMS" });
    });
});
