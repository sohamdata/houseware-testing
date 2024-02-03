# Houseware assignment

## Test Plan for Todo Application
This test plan outlines the testing approach for different components of a Todo application.

## Overview
The following components will be tested:
- Header
- Input
- Item
- Footer

The basic test for each component will be to check if the component is rendered correctly, and if the user interaction is working as expected.

![image](https://github.com/sohamdata/houseware-testing/assets/78294692/d14f37b0-3f08-4aaf-8f9d-343243c7106f)

## Tests

### Header
- Renders the header component - Unit test

### Input
- Renders the input field - Unit test
- Submits a new todo item when Enter key is pressed - Integration test
- Does not submit a todo when input value is less than 2 characters - Integration test
- Sanitizes input value before submitting - Unit test

### Item
- Renders a todo item correctly - Unit test
- Updates todo title on double click - Integration test
- Toggles completion of a todo item - Integration test
- Deletes a todo item - Integration test

### Footer
- Renders the footer component when there are todos - Unit test
- Does not render the footer component when there are no todos - Unit test
- Displays the correct number of pending todos - Unit test
- Clicking "Clear completed" button triggers the correct action - Integration test

## Setup
To run the frontend, install it locally using npm:

```bash
npm install
npm start
```

## Running Tests
To run tests:

```bash
npm test
```

todomvc: https://github.com/tastejs/todomvc/tree/master/examples/react
