import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";

import { ACInput } from "../../atoms";
import ACAutocomplete from "./ACAutocompleteV2";

const TestingACAutocompleteSingle = (props: any): any => {
  const [value, setValue] = useState(props.value);
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  return (
    <ACAutocomplete
      value={value}
      onChange={handleChange}
      {...props}
      options={[
        { label: "one", year: 2022 },
        { label: "two", year: 2023 },
        { label: "three", year: 2024 },
        { label: "four", year: 2025 },
        { label: "five", year: 2026 },
        { label: "six", year: 2027 },
        { label: "seven", year: 2028 },
        { label: "eight", year: 2029 },
        { label: "nine", year: 2030 },
      ]}
      renderInput={(params: any) => (
        <ACInput {...params} placeholder="Search..." />
      )}
    />
  );
};
const TestingACAutocompleteMulti = (props: any): any => {
  const [value, setValue] = useState([props.value]);
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  return (
    <ACAutocomplete
      value={value}
      onChange={handleChange}
      multiple
      {...props}
      options={[
        { label: "one", year: 2022 },
        { label: "two", year: 2023 },
        { label: "three", year: 2024 },
        { label: "four", year: 2025 },
        { label: "five", year: 2026 },
        { label: "six", year: 2027 },
        { label: "seven", year: 2028 },
        { label: "eight", year: 2029 },
        { label: "nine", year: 2030 },
      ]}
      renderInput={(params: any) => (
        <ACInput {...params} placeholder="Search..." />
      )}
    />
  );
};

const TestingACAutocompleteStringSingle = (props: any): any => {
  const [value, setValue] = useState(props.value);
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  return (
    <ACAutocomplete
      value={value}
      onChange={handleChange}
      {...props}
      options={[
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
      ]}
      renderInput={(params: any) => (
        <ACInput {...params} placeholder="Search..." />
      )}
    />
  );
};
const TestingACAutocompleteStringMulti = (props: any): any => {
  const [value, setValue] = useState([props.value]);
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  return (
    <ACAutocomplete
      value={value}
      onChange={handleChange}
      multiple
      {...props}
      options={[
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
      ]}
      renderInput={(params: any) => (
        <ACInput {...params} placeholder="Search..." />
      )}
    />
  );
};

describe("ACAutocomplete", () => {
  const props = {
    dataTestId: "test-id",
  };
  it("Should attach the dataTestId to the component and render options as array of objects", () => {
    render(<TestingACAutocompleteSingle {...props} />);
    const autocompleteEl = screen.getByTestId(
      `${props.dataTestId}-autocomplete-wrapper`
    );
    expect(autocompleteEl).toBeInTheDocument();
  });
  it("Should render options as array of strings and default value also as string", () => {
    const defaultValue = ["one"];
    const searchTerm = "two";
    render(
      <TestingACAutocompleteStringMulti {...props} value={defaultValue} />
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
    render(<TestingACAutocompleteSingle {...props} value={defaultValue} />);
    const inputEl = screen.getByTestId("test-id");
    expect(inputEl).toHaveValue(defaultValue.label);
  });
  it("Should render default value provided as single object (multiselect)", () => {
    const defaultValue = { label: "one", year: 2022 };
    render(<TestingACAutocompleteMulti {...props} value={[defaultValue]} />);
    const chipWrapper = screen.getByTestId("test-id-autocomplete-chip-wrapper");
    expect(chipWrapper).toBeInTheDocument();
    expect(chipWrapper).toHaveTextContent(defaultValue.label);
  });
  it("Should render default value provided as single string (single select)", () => {
    const defaultValue = "one";
    render(
      <TestingACAutocompleteStringSingle {...props} value={defaultValue} />
    );
    const inputEl = screen.getByTestId("test-id");
    expect(inputEl).toHaveValue(defaultValue);
  });
  it("Should render default value provided as single string (multi select)", () => {
    const defaultValue = "one";
    render(
      <TestingACAutocompleteStringMulti {...props} value={[defaultValue]} />
    );
    const chipWrapper = screen.getByTestId("test-id-autocomplete-chip-wrapper");
    expect(chipWrapper).toBeInTheDocument();
    expect(chipWrapper).toHaveTextContent(defaultValue);
  });
  it("Should render default and disabled options that should not be removed from selected values by pressing clear all button", () => {
    const defaultValue = { label: "one" };
    const searchTerm = "one";

    render(
      <TestingACAutocompleteMulti
        {...props}
        value={[defaultValue]}
        getOptionDisabled={(option: any) => option.label === "one"}
      />
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
    const clearButton = screen.getByTestId("test-id-autocomplete-clear-all");
    expect(clearButton).toBeInTheDocument();
    userEvent.click(clearButton);
    expect(chipWrapper).toBeInTheDocument();
    expect(chipWrapper).toHaveTextContent(defaultValue.label);
  });
  it("Should allow user to enter value that isn't provided in dropdown if freeSolo prop is true", () => {
    const searchTerm = "three";
    render(<TestingACAutocompleteMulti {...props} freeSolo />);
    const inputEl = screen.getByTestId("test-id");
    userEvent.type(inputEl, searchTerm);
    const dropdownEl = screen.getByTestId("test-id-autocomplete-dropdown");
    expect(dropdownEl).toBeInTheDocument();
    userEvent.keyboard("{enter}");
    const chipWrapper = screen.getByTestId("test-id-autocomplete-chip-wrapper");
    expect(chipWrapper).toBeInTheDocument();
    expect(chipWrapper).toHaveTextContent(searchTerm);
  });
  it("Should render default values by passing an array of objects and render options by year", () => {
    const defaultValue = [{ label: "one", year: 2022 }];
    const searchTerm = "2022";
    render(
      <TestingACAutocompleteMulti
        {...props}
        value={defaultValue}
        getOptionDisabled={(option: any) => option.label === "one"}
        getOptionLabel={(option: any) => option?.year}
      />
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

    render(<TestingACAutocompleteMulti {...props} />);
    const inputEl = screen.getByTestId("test-id");
    userEvent.type(inputEl, searchTerm);
    const dropdownEl = screen.getByTestId("test-id-autocomplete-dropdown");
    expect(dropdownEl).toBeInTheDocument();
    userEvent.click(document.body);
    expect(inputEl).toHaveValue("");
  });

  it("Should render text in dropdown menu that match is not found if user search for something that isn't in options provided", () => {
    const searchTerm = "threek";
    render(<TestingACAutocompleteStringSingle {...props} />);

    const inputEl = screen.getByTestId("test-id");
    userEvent.type(inputEl, searchTerm);
    const dropdownEl = screen.getByTestId("test-id-autocomplete-dropdown");
    expect(dropdownEl).toBeInTheDocument();
    const noMatchFoundEl = screen.getByText(/No matches found/i);
    expect(noMatchFoundEl).toBeInTheDocument();
  });
  it("Should deselect item if we clear input value", () => {
    const searchTerm = "one";
    render(<TestingACAutocompleteStringSingle {...props} />);
    const inputEl = screen.getByTestId("test-id");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveValue("");
    userEvent.type(inputEl, searchTerm);
    expect(inputEl).toHaveValue(searchTerm);
    let dropdownEl = screen.getByTestId("test-id-autocomplete-dropdown");
    expect(dropdownEl).toBeInTheDocument();
    const optionEl = screen.getAllByText(searchTerm)[0];
    expect(optionEl).toBeInTheDocument();
    userEvent.click(optionEl);
    expect(inputEl).toHaveValue(searchTerm);

    dropdownEl = screen.getByTestId("test-id-autocomplete-dropdown");
    userEvent.click(dropdownEl);

    const optionEl2 = screen.getAllByText(searchTerm)[0];
    expect(optionEl2).toHaveClass("isSelected");
    userEvent.clear(inputEl);
    expect(inputEl).toHaveValue("");
    userEvent.type(inputEl, searchTerm);
  });
  it("Should select multiple options and remove one by clicking on clear icon inside of chip", () => {
    const searchTermOne = "one";
    const searchTermTwo = "two";
    render(<TestingACAutocompleteStringMulti {...props} />);

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
      <TestingACAutocompleteStringMulti
        {...props}
        scrollToBottom={onScrollToBottom}
        options={options}
      />
    );

    const toggleDropdownButton = screen.getByTestId(
      "test-id-autocomplete-dropdown"
    );
    userEvent.click(toggleDropdownButton);
    const dropdownEl = screen.getByTestId(
      "test-id-autocomplete-dropdown-wrapper"
    );
    expect(dropdownEl).toBeInTheDocument();
    fireEvent.wheel(dropdownEl, { deltaY: 2000 });
  });
  it("Should render helperText", () => {
    const helperText = "Helper text";
    render(<TestingACAutocompleteMulti {...props} helperText={helperText} />);
    const helperTextWrite = screen.getByText(helperText);
    expect(helperTextWrite).toBeInTheDocument();
  });
  it("on multiple select if click on dropdown item chip should be added (string multiple)", () => {
    render(<TestingACAutocompleteStringMulti {...props} />);
    const dropdown = screen.getByTestId("test-id-autocomplete-dropdown");

    userEvent.click(dropdown);
    const dropdownWrapper = screen.getByTestId(
      "test-id-autocomplete-dropdown-wrapper"
    );
    expect(dropdownWrapper).toBeInTheDocument();
    const option = screen.getByText("one");
    expect(option).toBeInTheDocument();
    userEvent.click(option);
    const chipWrapper = screen.getByTestId("test-id-autocomplete-chip-wrapper");
    expect(chipWrapper).toBeInTheDocument();
    expect(chipWrapper).toHaveTextContent("one");
  });
  it("on multiple select if click on dropdown item chip should be added (object multiple)", () => {
    render(<TestingACAutocompleteMulti {...props} />);
    const dropdown = screen.getByTestId("test-id-autocomplete-dropdown");

    userEvent.click(dropdown);
    const dropdownWrapper = screen.getByTestId(
      "test-id-autocomplete-dropdown-wrapper"
    );
    expect(dropdownWrapper).toBeInTheDocument();
    const option = screen.getByText("one");
    expect(option).toBeInTheDocument();
    userEvent.click(option);
    const chipWrapper = screen.getByTestId("test-id-autocomplete-chip-wrapper");
    expect(chipWrapper).toBeInTheDocument();
    expect(chipWrapper).toHaveTextContent("one");
  });
  it("on multiple select if click on dropdown item chip should be added (object single)", () => {
    render(<TestingACAutocompleteSingle {...props} />);
    const dropdown = screen.getByTestId("test-id-autocomplete-dropdown");

    userEvent.click(dropdown);
    const dropdownWrapper = screen.getByTestId(
      "test-id-autocomplete-dropdown-wrapper"
    );
    expect(dropdownWrapper).toBeInTheDocument();
    const option = screen.getByText("one");
    expect(option).toBeInTheDocument();
    userEvent.click(option);
    const inputElement = screen.getByTestId("test-id");
    expect(inputElement).toHaveValue("one");
  });
  it("on multiple select if click on dropdown item chip should be added (string single)", () => {
    render(<TestingACAutocompleteStringSingle {...props} />);
    const dropdown = screen.getByTestId("test-id-autocomplete-dropdown");

    userEvent.click(dropdown);
    const dropdownWrapper = screen.getByTestId(
      "test-id-autocomplete-dropdown-wrapper"
    );
    expect(dropdownWrapper).toBeInTheDocument();
    const option = screen.getByText("one");
    expect(option).toBeInTheDocument();
    userEvent.click(option);
    const inputElement = screen.getByTestId("test-id");
    expect(inputElement).toHaveValue("one");
  });
  it("on multiple select if click on selected dropdown item  chip should be remove (string single)", () => {
    render(<TestingACAutocompleteStringSingle {...props} />);
    const dropdown = screen.getByTestId("test-id-autocomplete-dropdown");

    userEvent.click(dropdown);
    const dropdownWrapper = screen.getByTestId(
      "test-id-autocomplete-dropdown-wrapper"
    );
    expect(dropdownWrapper).toBeInTheDocument();
    const option = screen.getByText("one");
    expect(option).toBeInTheDocument();
    userEvent.click(option);
    const inputElement = screen.getByTestId("test-id");
    expect(inputElement).toHaveValue("one");
    userEvent.click(dropdown);
    userEvent.click(option);
    expect(inputElement).toHaveValue("");
  });
  it("on multiple select if click on selected dropdown item  chip should be remove (object single)", () => {
    render(<TestingACAutocompleteSingle {...props} />);
    const dropdown = screen.getByTestId("test-id-autocomplete-dropdown");

    userEvent.click(dropdown);
    const dropdownWrapper = screen.getByTestId(
      "test-id-autocomplete-dropdown-wrapper"
    );
    expect(dropdownWrapper).toBeInTheDocument();
    const option = screen.getByText("one");
    expect(option).toBeInTheDocument();
    userEvent.click(option);
    const inputElement = screen.getByTestId("test-id");
    expect(inputElement).toHaveValue("one");
    userEvent.click(dropdown);
    userEvent.click(option);
    expect(inputElement).toHaveValue("");
  });
  it("on multiple select if click on selected dropdown item  chip should be remove (string multiple)", () => {
    render(<TestingACAutocompleteStringMulti {...props} />);
    const dropdown = screen.getByTestId("test-id-autocomplete-dropdown");

    userEvent.click(dropdown);
    const dropdownWrapper = screen.getByTestId(
      "test-id-autocomplete-dropdown-wrapper"
    );
    expect(dropdownWrapper).toBeInTheDocument();
    const option = screen.getByText("one");
    expect(option).toBeInTheDocument();
    userEvent.click(option);
    const chipWrapper = screen.getByTestId("test-id-autocomplete-chip-wrapper");
    expect(chipWrapper).toBeInTheDocument();
    expect(chipWrapper).toHaveTextContent("one");
    userEvent.click(dropdown);
    userEvent.click(option);
    expect(chipWrapper).not.toHaveTextContent("one");
  });
  it("on multiple select if click on selected dropdown item  chip should be remove (object multiple)", async () => {
    render(<TestingACAutocompleteMulti {...props} />);
    const dropdown = screen.getByTestId("test-id-autocomplete-dropdown");

    userEvent.click(dropdown);
    const dropdownWrapper = screen.getByTestId(
      "test-id-autocomplete-dropdown-wrapper"
    );
    expect(dropdownWrapper).toBeInTheDocument();
    const option = screen.getByText("one");
    expect(option).toBeInTheDocument();
    userEvent.click(option);
    const chipWrapper = screen.getByTestId("test-id-autocomplete-chip-wrapper");
    expect(chipWrapper).toBeInTheDocument();
    expect(chipWrapper).toHaveTextContent("one");
    userEvent.click(dropdown);
    const option2 = screen.getAllByText("one")[1];
    userEvent.click(option2);
  });

  it("on multiple selected if type freeSolo witch is in options but disabled should not be added to selected", () => {
    const searchTerm = "three";
    render(
      <TestingACAutocompleteMulti
        {...props}
        getOptionDisabled={(option: any) => option?.label === "three"}
        freeSolo
      />
    );
    const inputEl = screen.getByTestId("test-id");
    userEvent.type(inputEl, searchTerm);
    userEvent.keyboard("{enter}");
    const chipWrapper = screen.getByTestId("test-id-autocomplete-chip-wrapper");
    expect(chipWrapper).toBeInTheDocument();
    expect(chipWrapper).not.toHaveTextContent(searchTerm);
  });

  it("on single selected if type freeSolo witch is in options but disabled should not be added to selected", async () => {
    const searchTerm = "four";
    render(
      <TestingACAutocompleteMulti
        {...props}
        getOptionDisabled={(option: any) => option?.label === searchTerm}
        freeSolo
      />
    );
    const dropdown = screen.getByTestId("test-id-autocomplete-dropdown");
    userEvent.click(dropdown);
    const inputEl = screen.getByTestId("test-id");
    await userEvent.type(inputEl, searchTerm);
    await userEvent.keyboard("{enter}");
    const chipWrapper = screen.getByTestId("test-id-autocomplete-chip-wrapper");
    screen.debug(chipWrapper);
    expect(chipWrapper).toBeInTheDocument();
    expect(chipWrapper).not.toHaveTextContent(searchTerm);
  });
  it("on single selected if type freeSolo witch is not in options should be added to selected", () => {
    const searchTerm = "three";
    render(<TestingACAutocompleteSingle {...props} freeSolo />);
    const inputEl = screen.getByTestId("test-id");
    userEvent.type(inputEl, searchTerm);
    userEvent.keyboard("{enter}");
    const inputElement = screen.getByTestId("test-id");
    expect(inputElement).toHaveValue(searchTerm);
  });
  it("if type empty string and freeSolo is true should not be added to selected", () => {
    const searchTerm = "";
    render(<TestingACAutocompleteSingle {...props} freeSolo />);
    const inputEl = screen.getByTestId("test-id");
    userEvent.type(inputEl, searchTerm);
    userEvent.keyboard("{enter}");
    const inputElement = screen.getByTestId("test-id");
    expect(inputElement).toHaveValue("");
  });

  it("on multiple selected if type freeSolo witch is not in options should be added to selected", () => {
    const searchTerm = "three-copy";
    render(<TestingACAutocompleteMulti {...props} freeSolo />);
    const inputEl = screen.getByTestId("test-id");
    userEvent.type(inputEl, searchTerm);
    userEvent.keyboard("{enter}");
    const chipWrapper = screen.getByTestId("test-id-autocomplete-chip-wrapper");
    expect(chipWrapper).toBeInTheDocument();
    expect(chipWrapper).toHaveTextContent(searchTerm);
  });
  it("on single selected if type freeSolo witch is not in options should be added to selected", () => {
    const searchTerm = "three-copy";
    render(<TestingACAutocompleteSingle {...props} freeSolo />);
    const inputEl = screen.getByTestId("test-id");
    userEvent.type(inputEl, searchTerm);
    userEvent.keyboard("{enter}");
    const inputElement = screen.getByTestId("test-id");
    expect(inputElement).toHaveValue(searchTerm);
  });
  it("on single select clear should clear selected", () => {
    render(<TestingACAutocompleteSingle {...props} />);
    const dropdown = screen.getByTestId("test-id-autocomplete-dropdown");

    userEvent.click(dropdown);
    const dropdownWrapper = screen.getByTestId(
      "test-id-autocomplete-dropdown-wrapper"
    );
    expect(dropdownWrapper).toBeInTheDocument();
    const option = screen.getByText("one");
    expect(option).toBeInTheDocument();
    userEvent.click(option);
    const inputElement = screen.getByTestId("test-id");
    expect(inputElement).toHaveValue("one");
    const clearButton = screen.getByTestId("test-id-autocomplete-clear-all");
    userEvent.click(clearButton);
    expect(inputElement).toHaveValue("");
  });
});
