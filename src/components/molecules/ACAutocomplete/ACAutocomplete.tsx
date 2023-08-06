import clsx from "clsx";
import React, {
  ChangeEvent,
  CSSProperties,
  ReactElement,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { BiChevronDown, BiChevronUp, BiX } from "react-icons/bi";

import { ACButton, ACHelperText } from "../../atoms";
import ACChip from "../../atoms/ACChip";
import InputLabel from "../../atoms/ACInput/styled/InputLabel";
import OptionItem from "./components/OptionItem";
import { ChipWrapper } from "./styled/ChipWrapper";
import { ControlsWrapper } from "./styled/ControlsWrapper";
import { Dropdown } from "./styled/Dropdown";
import { InfoText } from "./styled/InfoText";
import { InputWrapper } from "./styled/InputWrapper";
import { List } from "./styled/List";
import { Wrapper } from "./styled/Wrapper";

export type ACAutocompleteProps = {
  value: any;
  // onChange: (event: SyntheticEvent, value: string | {}) => void;
  onChange: (event: any, value: any) => void;
  onInputChange?: (value: string) => void;
  options: any[];
  renderInput: (params: {}) => ReactElement;
  getOptionLabel?: (option: any, domID?: number) => any;
  multiple?: boolean;
  dataTestId?: string;
  onScrollToBottom?: () => void;
  onScrollToBottomOffset?: number;
  freeSolo?: boolean;
  disableCloseOnSelect?: boolean;
  clearOnBlur?: boolean;
  getOptionDisabled?: (option: any) => boolean;
  className?: string;
  disabled?: boolean;
  hasError?: boolean;
  hasAlert?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
  marginBottom?: "sm" | "md" | "lg";
  rounded?: "sm" | "md" | "lg";
  label?: string;
  id?: string;
  style?: {
    wrapper?: CSSProperties;
    inputWrapper?: CSSProperties;
    chipWrapper?: CSSProperties;
    controlsWrapper?: CSSProperties;
    dropdown?: CSSProperties;
    list?: CSSProperties;
    listItem?: CSSProperties;
    label?: CSSProperties;
  };
};

const ACAutocomplete = ({
  options,
  renderInput,
  getOptionLabel = (option: any) => option?.label,
  multiple = false,
  onChange,
  onInputChange,
  onScrollToBottom,
  onScrollToBottomOffset = 0,
  freeSolo = false,
  disableCloseOnSelect = false,
  clearOnBlur = true,
  dataTestId,
  getOptionDisabled,
  isLoading,
  value,
  style,
  className,
  fullWidth,
  disabled,
  hasError,
  hasAlert,
  helperText,
  marginBottom,
  rounded,
  label,
  id,
}: ACAutocompleteProps) => {
  const [items, setItems] = useState<any[]>([]);
  const [localValue, setLocalValue] = useState("");
  const [selectedValues, setSelectedValues] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [optionType, setOptionType] = useState<"string" | "object">("object");

  const [tempValue, setTempValue] = useState<string | {}>("");

  // console.log("autocomplete value", value);
  // console.log("autocomplete tempValue", tempValue);
  // console.log("autocomplete selectedValues", selectedValues);
  // console.log("items", items);
  // console.log("localValue", localValue);
  // console.log("selectedValues?.length > 0", selectedValues?.length > 0);

  useEffect(() => {
    if (typeof value === "string") {
      const newOption = {
        label: value,
      };
      setTempValue(newOption);
    } else {
      setTempValue(value);
    }
  }, [value]);

  // TODO: might be a better way to do this
  const isAnyItemSelected = items.reduce(
    (acc: boolean, item) => acc || item.isSelected,
    false
  );

  const inputRef =
    useRef<{
      clearInput: () => void;
      focus: () => void;
    }>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  /* Default values */
  const defaultValuesMemoized = useMemo(() => {
    const defaultValues = (value: any) => {
      if (!value) return [];
      if (items.length === 0) return;

      items.map((item) => (item.isSelected = false));

      let selectedItems: any[] = [];

      if (freeSolo) {
      }

      // string
      if (typeof value === "string") {
        items.map((item) => {
          const isSelected = value === getOptionLabel(item);
          if (isSelected) {
            item.isSelected = true;
            selectedItems.push(item);
          }
        });
      }

      // array of strings
      if (
        Array.isArray(value) &&
        value.every((element) => typeof element === "string")
      ) {
        items.map((item) => {
          const isSelected = value.includes(getOptionLabel(item));
          if (isSelected) {
            item.isSelected = true;
            selectedItems.push(item);
          }
        });
      }

      // object
      if (typeof value === "object" && !Array.isArray(value)) {
        items.map((item) => {
          const isSelected = getOptionLabel(value) === getOptionLabel(item);
          if (isSelected) {
            item.isSelected = true;
            selectedItems.push(item);
          }
        });
      }

      // array of objects
      if (
        Array.isArray(value) &&
        value.every((element) => typeof element === "object")
      ) {
        items.map((item) => {
          const isSelected = value.some(
            (v) => getOptionLabel(v) === getOptionLabel(item)
          );
          if (isSelected) {
            item.isSelected = true;
            selectedItems.push(item);
          }
        });
      }

      return multiple ? selectedItems : getOptionLabel(selectedItems[0]);
    };
    return defaultValues;
  }, [value, items]);

  /* Normalize options */
  const normalizeOptionsMemoized = useMemo(() => {
    const normalizeOptions = (options: any[]) => {
      if (!options) return [];

      // array of strings
      if (options.every((option) => typeof option === "string")) {
        setOptionType("string");
        return options.map((option: string, index: number) => ({
          label: option,
          domID: index,
          isSelected: false,
          isDisabled: false,
        }));
      }

      // array of objects
      if (options[0] && typeof options[0] === "object") {
        setOptionType("object");
        return options.map((option: any, index: number) => ({
          ...option,
          domID: index,
          isSelected: false,
          isDisabled: false,
        }));
      }

      return [];
    };
    return normalizeOptions;
  }, [options]);

  useEffect(() => {
    const newItems = normalizeOptionsMemoized(options);
    newItems && setItems(newItems);
  }, [options, normalizeOptionsMemoized]);

  // useEffect(() => {
  //   const newSelectedValues = defaultValuesMemoized(value);
  //   newSelectedValues && setSelectedValues(newSelectedValues);
  // }, [items, value]);

  /* Filter items */
  const filteredItems = useMemo(() => {
    return items
      .map((item) => {
        if (getOptionDisabled && getOptionDisabled(item)) {
          item.isDisabled = true;
        }
        return item;
      })
      .filter((item) =>
        String(getOptionLabel(item))
          .toLowerCase()
          .includes(localValue.toLowerCase())
      );
  }, [localValue, items]);

  /* Click outside */
  useEffect(() => {
    if (!clearOnBlur || freeSolo) return;

    const handleClickOutside = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (Object.keys(selectedValues)?.length > 0) {
          if (multiple) {
            inputRef?.current?.clearInput();
            setLocalValue("");
            onInputChange && onInputChange("");
            setIsOpen(false);
          } else {
            setIsOpen(false);
          }
        } else {
          inputRef?.current?.clearInput();
          setLocalValue("");
          onInputChange && onInputChange("");
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* Clear input */
  const handleClear = (e: any) => {
    inputRef?.current?.clearInput();
    inputRef.current?.focus();
    setLocalValue("");

    // keep items that are passed as disabled and selected
    const newItems = items.map((item: any) => {
      if (item.isDisabled && item.isSelected) {
        return { ...item, isSelected: true, isDisabled: true };
      } else {
        return { ...item, isSelected: false };
      }
    });
    const selectedValues = newItems.filter((item: any) => item.isSelected);

    setItems(newItems);
    setSelectedValues(selectedValues);
    onChange && onChange(e, selectedValues);
    onInputChange && onInputChange("");

    setIsOpen(false);
  };

  /* Handle dropdown */
  const handleDropdown = () => {
    setIsOpen(!isOpen);
    inputRef.current?.focus();
  };

  /* Handle change */
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    setIsOpen(true);

    if (!multiple) {
      setSelectedValues([]);
      onChange && onChange(e, "");

      setItems((prevItems) => {
        return prevItems.map((item) => {
          item.isSelected = false;
          return item;
        });
      });
    }
  };

  const onInputChangeHandler = (e: any) => {
    onInputChange && onInputChange(e);
  };

  /* Handle select */
  const handleSelect = (e: any) => {
    // get the selected item
    const selectedItem = items.find(
      (item) => item.domID === parseInt(e.target.getAttribute("data-dom-id"))
    );

    if (selectedItem.isDisabled) return;

    let newSelectedItem;

    if (multiple) {
      // check if the item is already selected
      if (selectedValues.some((item) => item.domID === selectedItem.domID)) {
        // remove the item from the selectedValues state
        selectedItem.isSelected = false;
        newSelectedItem = selectedValues.filter(
          (item) => item.domID !== selectedItem.domID
        );
      } else {
        // add the item to the selectedValues state
        selectedItem.isSelected = true;
        newSelectedItem = [...selectedValues, selectedItem];
      }
    } else {
      // clear the selectedValues state
      setItems((prevItems) => {
        return prevItems.map((item) => {
          item.isSelected = false;
          return item;
        });
      });
      // add the item to the selectedValues state
      newSelectedItem = selectedItem;
      selectedItem.isSelected = true;
    }

    // update the selectedValues state
    setSelectedValues(newSelectedItem);

    if (optionType === "string") {
      if (multiple) {
        // convert the array of objects to an array of strings
        const stringArray = newSelectedItem.map((item: any) => item.label);
        onChange && onChange(e, stringArray);
      } else {
        // convert the object to a string
        onChange && onChange(e, newSelectedItem.label);
      }
    } else {
      onChange && onChange(e, newSelectedItem);
    }

    // clear the input and close the dropdown
    inputRef.current?.clearInput();
    inputRef.current?.focus();
    setLocalValue("");
    onInputChange && onInputChange("");
    !disableCloseOnSelect && setIsOpen(false);
  };

  /* Deselect item */
  const deselectItem = useCallback(
    (e: any, item: any) => {
      let newSelectedValues;
      let deselectedItem;

      if (typeof item === "string") {
        newSelectedValues = selectedValues.filter((i) => i !== item);
      } else {
        newSelectedValues = selectedValues.filter(
          (i) => getOptionLabel(i) !== getOptionLabel(item)
        );
        deselectedItem = items.find(
          (i) => getOptionLabel(i) === getOptionLabel(item)
        );
        deselectedItem.isSelected = false;
      }

      if (optionType === "string") {
        if (multiple) {
          const stringArray = newSelectedValues.map((item: any) => item.label);
          onChange && onChange(e, stringArray);
        } else {
          onChange && onChange(e, newSelectedValues[0]);
        }
      } else {
        if (multiple) {
          onChange && onChange(e, newSelectedValues);
        } else {
          onChange && onChange(e, newSelectedValues[0]);
        }
      }

      setSelectedValues(newSelectedValues);
    },
    [selectedValues, items]
  );

  /* onEnterPress */
  const onEnterPress = (e: any) => {
    e.preventDefault();

    if (e.key === "Enter") {
      const newValue = e.target.value;

      if (newValue === "") return;

      if (freeSolo) {
        if (multiple) {
          const newSelectedValues = [...selectedValues, newValue];
          setSelectedValues(newSelectedValues);
          onChange && onChange(e, newSelectedValues);
        } else {
          setSelectedValues(newValue);
          onChange && onChange(e, newValue);
        }
      }

      inputRef.current?.clearInput();
      setLocalValue("");
      !disableCloseOnSelect && setIsOpen(false);
    }
  };

  /* onScrollToBottom */
  const onScrollToBottomHandler = (e: any) => {
    if (!onScrollToBottom) return;

    const distanceFromBottom =
      parseInt(e.target.scrollHeight) -
      parseInt(e.target.scrollTop) -
      parseInt(e.target.clientHeight);

    if (distanceFromBottom <= onScrollToBottomOffset) {
      onScrollToBottom();
    }
  };

  /* Classes */
  const wrapperClasses = clsx({
    fullWidth,
    disabled: disabled,
    "mb-sm": marginBottom === "sm",
    "mb-md": marginBottom === "md",
    "mb-lg": marginBottom === "lg",
  });
  const inputWrapperClasses = clsx("ac-autocomplete-input-wrapper", {
    multiple: multiple,
    disabled: disabled,
    "has-error": hasError,
    "has-alert": hasAlert,
    "rounded-sm": rounded === "sm",
    "rounded-md": rounded === "md",
    "rounded-lg": rounded === "lg",
  });
  const chipWrapperClasses = clsx("ac-chip-wrapper");
  const helperTextClasses = clsx("ac-input-helper-text", {
    "has-error": hasError,
    "has-alert": hasAlert,
  });
  const labelClasses = clsx("ac-input-label", {
    "has-error": hasError,
    "has-alert": hasAlert,
  });

  /* data-testIds */
  const testIDs = {
    wrapper: dataTestId ? `${dataTestId}-autocomplete-wrapper` : "",
    inputWrapper: dataTestId ? `${dataTestId}-autocomplete-input-wrapper` : "",
    chip: dataTestId ? `${dataTestId}-autocomplete-chip` : "",
    controlsWrapper: dataTestId
      ? `${dataTestId}-autocomplete-controls-wrapper`
      : "",
    dropdown: dataTestId ? `${dataTestId}-autocomplete-dropdown` : "",
    chipWrapper: dataTestId ? `${dataTestId}-autocomplete-chip-wrapper` : "",
    label: dataTestId ? `${dataTestId}-autocomplete-label` : "",
  };

  let dropdownContent;
  if (isLoading) {
    // If loading, display a loading message
    dropdownContent = <InfoText>Loading...</InfoText>;
  } else if (filteredItems.length !== 0) {
    // If there are filtered items, render a list with those items
    dropdownContent = (
      <List
        onClick={handleSelect}
        onScroll={onScrollToBottomHandler}
        ref={dropdownRef}
        style={style?.list}
      >
        {filteredItems.map((item: any) => (
          <OptionItem
            key={item.domID}
            domID={item.domID}
            label={getOptionLabel(item)}
            isSelected={item.isSelected}
            isDisabled={item.isDisabled}
            style={style?.listItem}
            customRender={item?.customRender}
          />
        ))}
      </List>
    );
  } else if (freeSolo) {
    // If there are no filtered items but freeSolo is enabled, tell the user to press 'Enter' to add a new item
    dropdownContent = (
      <InfoText>
        Press 'Enter' to add &nbsp; <strong>"{localValue}"</strong>
      </InfoText>
    );
  } else {
    // If there are no filtered items and freeSolo is disabled, tell the user that no matches were found
    dropdownContent = <InfoText>No matches found</InfoText>;
  }

  // selected values
  useEffect(() => {
    if (selectedValues.length === 0) return;

    if (!value) {
      items.map((item) => (item.isSelected = false));
      setSelectedValues([]);
      return;
    }

    if (multiple) {
      const newItems = items.map((item) => {
        const isSelected = selectedValues.some(
          (v) => getOptionLabel(v) === getOptionLabel(item)
        );
        if (isSelected) {
          item.isSelected = true;
        }
        return item;
      });

      setItems(newItems);
    } else {
      const newItems = items.map((item) => {
        const isSelected =
          getOptionLabel(item) === getOptionLabel(selectedValues);
        if (isSelected) {
          item.isSelected = true;
        }
        return item;
      });
      setItems(newItems);
    }
  }, [value]);

  // default value
  useEffect(() => {
    if (!value) return;
    if (items.length === 0) return;

    if (multiple) {
      // THIS FAILS WITH freeSolo
      const newSelectedValues = value.map((v: any) => {
        if (optionType === "object") {
          if (typeof v === "string") {
            // this is freeSolo item
            return v;
          } else {
            // regular item as object
            const selectedItem = items.find((item) => {
              return getOptionLabel(item) === getOptionLabel(v);
            });
            if (selectedItem) {
              selectedItem.isSelected = true;
            }
            return selectedItem;
          }
        } else {
          // check if v exists in items
          const valueIsOneOfTheOptions = items.find((item) => {
            return getOptionLabel(item) === v;
          });

          if (Boolean(valueIsOneOfTheOptions)) {
            const selectedItem = items.find((item) => {
              return getOptionLabel(item) === v;
            });
            if (selectedItem) {
              selectedItem.isSelected = true;
            }
            return selectedItem;
          } else {
            // freeSoloItem
            return v;
          }
        }
      });

      setSelectedValues(newSelectedValues);
    } else {
      const selectedItem = items.find((item) => {
        return (
          getOptionLabel(item) === getOptionLabel(value) ||
          getOptionLabel(item) === value
        );
      });

      if (selectedItem) {
        selectedItem.isSelected = true;
      }

      setSelectedValues([selectedItem]);
    }
  }, [value, items]);

  if (label && !id) {
    console.warn(
      'Please enter valid "id" prop into ACAutocomplete component for accessibility purposes when using "label" prop.'
    );
  }

  return (
    <Wrapper
      ref={wrapperRef}
      data-testid={testIDs.wrapper}
      className={`${className ? className : ""} ${wrapperClasses}`}
      style={style?.wrapper}
    >
      {label && (
        <InputLabel
          className={labelClasses}
          data-testid={testIDs.label}
          htmlFor={id}
          style={style?.label}
        >
          {label}
        </InputLabel>
      )}
      <InputWrapper
        className={inputWrapperClasses}
        data-testid={testIDs.inputWrapper}
        style={style?.inputWrapper}
      >
        {multiple && selectedValues?.length > 0 && (
          <ChipWrapper
            className={chipWrapperClasses}
            data-testid={testIDs.chipWrapper}
            style={style?.chipWrapper}
          >
            {selectedValues.map((item: any, idx: number) => (
              <ACChip
                size="small"
                rightIcon={item.isDisabled ? null : <BiX />}
                onRightIconClick={(e) => deselectItem(e, item)}
                label={getOptionLabel(item) || item}
                key={idx}
                data-testid={testIDs.chip}
                disabled={item.isDisabled}
              />
            ))}
          </ChipWrapper>
        )}

        {renderInput({
          id: id,
          dataTestId: dataTestId,
          onClick: handleDropdown,
          onChange: onChangeHandler,
          onInputChange: onInputChangeHandler,
          value: multiple ? "" : getOptionLabel(tempValue),
          isAutoComplete: true,
          ref: inputRef,
          onEnterPress: onEnterPress,
          disabled: disabled,
        })}

        <ControlsWrapper
          data-testid={testIDs.controlsWrapper}
          style={style?.controlsWrapper}
        >
          {/* {localValue || isAnyItemSelected || selectedValues?.length > 0 ? ( */}
          {localValue || isAnyItemSelected ? (
            <ACButton onClick={(e) => handleClear(e)}>
              <BiX />
            </ACButton>
          ) : null}
          <ACButton onClick={handleDropdown}>
            {isOpen ? <BiChevronUp /> : <BiChevronDown />}
          </ACButton>
        </ControlsWrapper>
      </InputWrapper>

      {isOpen && (
        <Dropdown data-testid={testIDs.dropdown} style={style?.dropdown}>
          {dropdownContent}
        </Dropdown>
      )}
      {helperText && <ACHelperText>{helperText}</ACHelperText>}
    </Wrapper>
  );
};

export default ACAutocomplete;
