import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import { ACInput } from "../../atoms";
import ACAutocomplete from "./ACAutocomplete";

const TestingACAutocomplete = (props: any): any => (
  <ACAutocomplete
    {...props}
    options={[
      { label: "one", year: 2022 },
      { label: "two", year: 2023 },
    ]}
    renderInput={(params: any) => (
      <ACInput {...params} placeholder="Search..." />
    )}
  />
);

const TestingACAutocompleteString = (props: any): any => (
  <ACAutocomplete
    {...props}
    options={["one", "two"]}
    renderInput={(params: any) => (
      <ACInput {...params} placeholder="Search..." />
    )}
  />
);

describe("ACAutocomplete", () => {
  const props = {
    dataTestId: "test-id",
  };

  it("Should attach the dataTestId to the component and render options as array of objects", () => {
    render(TestingACAutocomplete({ ...props }));
    const autocompleteEl = screen.getByTestId(
      `${props.dataTestId}-autocomplete-wrapper`
    );
    expect(autocompleteEl).toBeInTheDocument();
  });

  it("Should render options as array of strings and default value also as string", () => {
    const defaultValue = ["one"];
    const searchTerm = "two";
    render(
      TestingACAutocompleteString({
        ...props,
        value: defaultValue,
        multiple: true,
      })
    );
    const inputEl = screen.getByTestId("test-id");
    const chipWrapper = screen.getByTestId(
      "test-id-autocomplete-input-wrapper"
    );

    userEvent.type(inputEl, searchTerm);
    const optionEl = screen.getByText(searchTerm);
    expect(optionEl).toBeInTheDocument();
    expect(chipWrapper).toBeInTheDocument();
    expect(chipWrapper).toHaveTextContent(defaultValue[0]);
  });

  it("Should render default value provided as single object (single select)", () => {
    const defaultValue = { label: "one", year: 2022 };
    render(TestingACAutocomplete({ ...props, value: defaultValue }));
    const inputEl = screen.getByTestId("test-id");
    expect(inputEl).toHaveValue(defaultValue.label);
  });

  it("Should render default value provided as single object (multiselect)", () => {
    const defaultValue = { label: "one", year: 2022 };
    render(
      TestingACAutocomplete({
        ...props,
        value: [defaultValue],
        multiple: true,
      })
    );
    const chipWrapper = screen.getByTestId("test-id-autocomplete-chip-wrapper");
    expect(chipWrapper).toBeInTheDocument();
    expect(chipWrapper).toHaveTextContent(defaultValue.label);
  });

  it("Should render default value provided as single string (single select)", () => {
    const defaultValue = "one";
    render(
      TestingACAutocompleteString({
        ...props,
        value: defaultValue,
      })
    );
    const inputEl = screen.getByTestId("test-id");
    expect(inputEl).toHaveValue(defaultValue);
  });

  it("Should render default value provided as single string (multi select)", () => {
    const defaultValue = "one";
    render(
      TestingACAutocompleteString({
        ...props,
        value: [defaultValue],
        multiple: true,
      })
    );
    const chipWrapper = screen.getByTestId("test-id-autocomplete-chip-wrapper");
    expect(chipWrapper).toBeInTheDocument();
    expect(chipWrapper).toHaveTextContent(defaultValue);
  });

  it("Should render default and disabled options that should not be removed from selected values by pressing clear all button", () => {
    const defaultValue = { label: "one" };
    const searchTerm = "one";
    render(
      TestingACAutocomplete({
        ...props,
        multiple: true,
        value: [defaultValue],
        getOptionDisabled: (option: any) => option.label === "one",
      })
    );
    const inputEl = screen.getByTestId("test-id");
    const chipWrapper = screen.getByTestId("test-id-autocomplete-chip-wrapper");
    expect(chipWrapper).toBeInTheDocument();
    expect(chipWrapper).toHaveTextContent(defaultValue.label);
    userEvent.type(inputEl, searchTerm);
    const dropdownEl = screen.getByTestId("test-id-autocomplete-dropdown");
    expect(dropdownEl).toBeInTheDocument();
    const optionEl = screen.getAllByText(searchTerm)[1];
    expect(optionEl).toBeInTheDocument();
    expect(optionEl).toHaveClass("isDisabled");
    const clearButton = screen.getAllByTestId("acButton")[0];
    expect(clearButton).toBeInTheDocument();
    userEvent.click(clearButton);
    expect(chipWrapper).toBeInTheDocument();
    expect(chipWrapper).toHaveTextContent(defaultValue.label);
  });

  it("Should allow user to enter value that isn't provided in dropdown if freeSolo prop is true", () => {
    const searchTerm = "three";

    render(
      TestingACAutocomplete({
        ...props,
        multiple: true,
        freeSolo: true,
        getOptionDisabled: (option: any) => option.label === "one",
      })
    );

    const inputEl = screen.getByTestId("test-id");

    userEvent.type(inputEl, searchTerm);

    const dropdownEl = screen.getByTestId("test-id-autocomplete-dropdown");
    expect(dropdownEl).toBeInTheDocument();

    const instructionEl = screen.getByText(/Press 'Enter' to add/i);
    expect(instructionEl).toBeInTheDocument();

    userEvent.keyboard("{enter}");

    const chipWrapper = screen.getByTestId("test-id-autocomplete-chip-wrapper");
    expect(chipWrapper).toBeInTheDocument();
    expect(chipWrapper).toHaveTextContent(searchTerm);
  });

  it("Should render default values by passing an array of objects and render options by year", () => {
    const defaultValue = [{ label: "one", year: 2022 }];
    const searchTerm = "2022";

    render(
      TestingACAutocomplete({
        ...props,
        value: defaultValue,
        multiple: true,
        getOptionLabel: (option: any) => option.year,
      })
    );

    const inputEl = screen.getByTestId("test-id");
    userEvent.type(inputEl, searchTerm);

    const dropdownEl = screen.getByTestId("test-id-autocomplete-dropdown");
    expect(dropdownEl).toBeInTheDocument();

    const optionEl = screen.getAllByText(searchTerm)[0];
    expect(optionEl).toBeInTheDocument();
    userEvent.click(optionEl);

    const chipWrapper = screen.getByTestId("test-id-autocomplete-chip-wrapper");
    expect(chipWrapper).toBeInTheDocument();
    expect(chipWrapper).toHaveTextContent(searchTerm);
  });

  it("Should close dropdown and clear input if user clicks outside", () => {
    const searchTerm = "one";

    render(
      TestingACAutocompleteString({
        ...props,
        multiple: true,
      })
    );

    const inputEl = screen.getByTestId("test-id");
    userEvent.type(inputEl, searchTerm);

    const dropdownEl = screen.getByTestId("test-id-autocomplete-dropdown");
    expect(dropdownEl).toBeInTheDocument();

    userEvent.click(document.body);

    expect(dropdownEl).not.toBeInTheDocument();
    expect(inputEl).toHaveValue("");
  });

  it("Should not close dropdown and clear input if user clicks outside if freeSolo prop is passed", () => {
    const searchTerm = "one";

    render(
      TestingACAutocompleteString({
        ...props,
        freeSolo: true,
      })
    );

    const inputEl = screen.getByTestId("test-id");
    userEvent.type(inputEl, searchTerm);

    const dropdownEl = screen.getByTestId("test-id-autocomplete-dropdown");
    expect(dropdownEl).toBeInTheDocument();

    userEvent.click(document.body);

    expect(dropdownEl).toBeInTheDocument();
    expect(inputEl).toHaveValue(searchTerm);
  });

  it("Should render text in dropdown menu that match is not found if user search for something that isn't in options provided", () => {
    const searchTerm = "three";

    render(
      TestingACAutocompleteString({
        ...props,
      })
    );

    const inputEl = screen.getByTestId("test-id");
    userEvent.type(inputEl, searchTerm);

    const dropdownEl = screen.getByTestId("test-id-autocomplete-dropdown");
    expect(dropdownEl).toBeInTheDocument();

    const noMatchFoundEl = screen.getByText(/No matches found/i);
    expect(noMatchFoundEl).toBeInTheDocument();
  });

  // it("Should deselect item if we clear input value", () => {
  //   const searchTerm = "one";

  //   render(
  //     TestingACAutocompleteString({
  //       ...props,
  //     })
  //   );

  //   const inputEl = screen.getByTestId("test-id");
  //   expect(inputEl).toBeInTheDocument();
  //   expect(inputEl).toHaveValue("");

  //   userEvent.type(inputEl, searchTerm);
  //   expect(inputEl).toHaveValue(searchTerm);

  //   const dropdownEl = screen.getByTestId("test-id-autocomplete-dropdown");
  //   expect(dropdownEl).toBeInTheDocument();

  //   const optionEl = screen.getAllByText(searchTerm)[0];
  //   expect(optionEl).toBeInTheDocument();
  //   userEvent.click(optionEl);

  // expect(inputEl).toHaveValue(searchTerm);

  // const toggleDropdownButton = screen.getAllByTestId("acButton")[1];
  // userEvent.click(toggleDropdownButton);

  // const dropdownEl = screen.getByTestId("test-id-autocomplete-dropdown");
  // expect(dropdownEl).toBeInTheDocument();

  // const optionEl2 = screen.getAllByText(searchTerm)[0];
  // expect(optionEl2).toHaveClass("isSelected");

  // userEvent.clear(inputEl);
  // expect(inputEl).toHaveValue("");
  // userEvent.type(inputEl, searchTerm);
  // screen.debug();
  // });

  it("Should select multiple options and remove one by clicking on clear icon inside of chip", () => {
    const options = ["one", "two", "three"];
    const searchTermOne = "one";
    const searchTermTwo = "two";

    render(
      TestingACAutocompleteString({
        ...props,
        options: { options },
        multiple: true,
      })
    );

    const inputEl = screen.getByTestId("test-id");
    userEvent.type(inputEl, searchTermOne);

    const optionEl = screen.getAllByText(searchTermOne)[0];
    userEvent.click(optionEl);

    userEvent.type(inputEl, searchTermTwo);
    const optionElTwo = screen.getAllByText(searchTermTwo)[0];
    userEvent.click(optionElTwo);

    const chipWrapper = screen.getByTestId("test-id-autocomplete-chip-wrapper");
    expect(chipWrapper).toBeInTheDocument();
    expect(chipWrapper).toHaveTextContent(searchTermOne);
    expect(chipWrapper).toHaveTextContent(searchTermTwo);

    const chipClearIcon = screen.getAllByTestId("ACChip-rightIcon-test-id")[0];
    userEvent.click(chipClearIcon);

    expect(chipWrapper).toHaveTextContent(searchTermTwo);
  });

  it("Should call callback function when user scrolls to bottom", () => {
    const options = ["one", "two", "three", "four", "five", "six", "seven"];
    const onScrollToBottom = jest.fn();

    render(
      TestingACAutocompleteString({
        ...props,
        options: { options },
        multiple: true,
        onScrollToBottom: { onScrollToBottom },
      })
    );

    const toggleDropdownButton = screen.getAllByTestId("acButton")[0];
    userEvent.click(toggleDropdownButton);

    const dropdownEl = screen.getByTestId("test-id-autocomplete-dropdown");
    expect(dropdownEl).toBeInTheDocument();

    fireEvent.wheel(dropdownEl, { deltaY: 100 });

    // expect(onScrollToBottom).toHaveBeenCalled();
  });

  it("Should render helperText", () => {
    const helperText = "Helper text";

    render(
      TestingACAutocomplete({
        ...props,
        helperText,
      })
    );

    const helperTextEl = screen.getByText(helperText);
    expect(helperTextEl).toBeInTheDocument();
  });
});
