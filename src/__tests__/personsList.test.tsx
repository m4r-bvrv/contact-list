import * as React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import PersonsList from "../components/PersonsList/PersonsList";
import * as api from "../api";
import mockData from "../mockData.json";
import userEvent from "@testing-library/user-event";

test("list is loading elements on init", async () => {
  const mockPersons = mockData.slice(0, 10);
  jest.spyOn(api, "default").mockImplementation(async () => {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 100));
    return mockPersons;
  });

  render(<PersonsList />);
  await waitForElementToBeRemoved(screen.getByLabelText(/loading/i));

  mockPersons.forEach((person) => {
    expect(screen.getByText(person.emailAddress)).toBeInTheDocument();
  });
});

test("list is displaying error when fetch fails", async () => {
  const errorMessage = "Something went wrong";
  jest.spyOn(api, "default").mockImplementation(async () => {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 100));
    throw new Error(errorMessage);
  });

  render(<PersonsList />);
  await waitForElementToBeRemoved(screen.getByLabelText(/loading/i));

  expect(screen.getByText(errorMessage)).toBeInTheDocument();
});

test("list is loading elements on button click", async () => {
  let i = 0;
  const mockPersons = [mockData.slice(0, 10), mockData.slice(10, 20)];
  jest.spyOn(api, "default").mockImplementation(async () => {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 100));
    return mockPersons[i];
  });

  render(<PersonsList />);
  const button = screen.getByRole("button");
  await waitForElementToBeRemoved(screen.getByLabelText(/loading/i));
  i = 1;
  await userEvent.click(button);
  await waitForElementToBeRemoved(screen.getByLabelText(/loading/i));

  mockPersons[1].forEach((person) => {
    expect(screen.getByText(person.emailAddress)).toBeInTheDocument();
  });
});

test("selecting and unselecting person on click", async () => {
  const mockPersons = mockData.slice(0, 10);
  jest.spyOn(api, "default").mockImplementation(async () => {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 100));
    return mockPersons;
  });

  render(<PersonsList />);
  await waitForElementToBeRemoved(screen.getByLabelText(/loading/i));

  const personCard = screen.getByText(mockData[0].emailAddress)
    .parentElement as HTMLElement;

  await userEvent.click(personCard);
  expect(personCard).toHaveClass("person-info--selected");

  await userEvent.click(personCard);
  expect(personCard).not.toHaveClass("person-info--selected");
});
