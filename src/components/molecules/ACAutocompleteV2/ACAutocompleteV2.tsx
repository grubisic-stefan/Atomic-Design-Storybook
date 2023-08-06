import clsx from "clsx";
import React, {
  ChangeEvent,
  CSSProperties,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { BiChevronDown, BiChevronUp, BiXCircle } from "react-icons/bi";

import { ACButton, ACHelperText, ACTransition } from "../../atoms";
import ACChip from "../../atoms/ACChip";
import InputLabel from "../../atoms/ACInput/styled/InputLabel";
import OptionItem from "./components/OptionItem";
import { ChipWrapper } from "./styled/ChipWrapper";
import { ControlsWrapper } from "./styled/ControlsWrapper";

import { InputWrapper } from "./styled/InputWrapper";
import { List } from "./styled/List";
import { Wrapper } from "./styled/Wrapper";
import { EmptyOptions } from "./styled/EmptyOptions";

import "./ACAutocomplete.scss";
import { ACEvenType } from "../../../globalTypes";

export type ACAutocompleteProps = {
  value: any;
  onChange: (event: ACEvenType<any, any>, value: any) => void;
  onInputChange?: (value: string) => void;
  options: any[];
  renderInput: (params: {}) => ReactElement;
  getOptionLabel?: (option: any, domID?: number) => any;
  multiple?: boolean;
  dataTestId?: string;
  onScrollToBottom?: () => void;
  bottomScrollOffset?: number;
  freeSolo?: boolean;
  disableCloseOnSelect?: boolean;
  clearOnBlur?: boolean;
  getOptionDisabled?: (option: any) => boolean;
  getCustomRender?: (option: any) => ReactElement;
  className?: string;
  disabled?: boolean;
  hasError?: boolean;
  hasAlert?: boolean;
  helperText?: string;
  name?: string;
  dropdownHeight?: number;
  fullWidth?: boolean;
  isLoading?: boolean;
  onBlur?: (event: ACEvenType<any, any>, value: any) => void;
  marginBottom?: "sm" | "md" | "lg";
  rounded?: "sm" | "md" | "lg";
  label?: string;
  errorMessage?: string;
  clearAllBtn?: boolean;

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
    helperText?: CSSProperties;
  };
};

const ACAutocomplete = ({
  options,
  renderInput,
  onInputChange,
  getOptionLabel = (option: any) => option?.label,
  multiple = false,
  onChange,
  onScrollToBottom,
  bottomScrollOffset = 10,
  freeSolo = false,
  clearOnBlur = true,
  dataTestId,
  getOptionDisabled,
  value,
  style,
  className,
  dropdownHeight = 218,
  fullWidth,
  name = "",
  disabled = false,
  hasError,
  errorMessage,
  hasAlert,
  helperText,
  marginBottom,
  getCustomRender,
  rounded,
  label,
  id,
  clearAllBtn = true,
  onBlur,
}: ACAutocompleteProps) => {
  const [optionType, setOptionType] = useState<"string" | "object">("object");
  const [isOpen, setIsOpen] = useState(false);
  const [singleInputValue, setSingleInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [currentScrollHeight, setCurrentScrollHeight] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [customRender, setCustomRender] = useState(
    getCustomRender ? true : false
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleFocus);

    return () => {
      document.removeEventListener("click", handleFocus);
    };
  }, [isFocused, value]);

  useEffect(() => {
    if (typeof options[0] === "string") return setOptionType("string");
    setOptionType("object");
  }, [options]);

  useEffect(() => {
    if (getCustomRender && !customRender) {
      inputRef.current?.focus();
      setIsOpen(true);
    }
  }, [customRender]);

  useEffect(() => {
    if (!multiple) setSingleInputValue(getOptionLabel(value) || value);
  }, [value]);

  useEffect(() => {
    if ((!value || multiple) && clearOnBlur && !isOpen) {
      setSearchValue("");
      setSingleInputValue("");
    }
    if (
      value &&
      !multiple &&
      singleInputValue != (getOptionLabel(value) || value) &&
      !isOpen
    ) {
      setSearchValue("");
      setSingleInputValue(getOptionLabel(value) || value);
    }
  }, [isOpen, value]);

  const selectedValueMemoized = useMemo(() => {
    const tempSelectedValues: { [key: string]: any } = {};
    if (multiple && optionType === "object") {
      if (value) {
        value.forEach((selected: string | number) => {
          if (typeof selected === "string") {
            tempSelectedValues[selected] = selected;
          } else {
            tempSelectedValues[getOptionLabel(selected)] = selected;
          }
        });
      }
    }
    if (multiple && optionType === "string") {
      value.forEach((selected: string | number) => {
        tempSelectedValues[selected] = selected;
      });
    }

    if (!multiple && optionType === "object") {
      tempSelectedValues[getOptionLabel(value)] = value;
      setSingleInputValue(getOptionLabel(value));
    }
    if (!multiple && optionType === "string") {
      tempSelectedValues[value] = value;
      setSingleInputValue(value);
    }
    return tempSelectedValues;
  }, [value, optionType]);

  const handleDropdown = () => {
    setIsOpen(!isOpen);
    inputRef.current?.focus();
  };

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const clickItemHandle = useCallback(
    (e: any, item: any, isSelected: boolean) => {
      if (getOptionDisabled && getOptionDisabled(item)) return;

      setSearchValue("");
      setSingleInputValue("");

      if (multiple) {
        if (!isSelected) {
          if (optionType === "string") {
            const newArray = [...value, item];
            return onChange({ ...e, ac: { name, value: newArray } }, newArray);
          }
          const newArray = [...value, item];
          e.nameInput = name;
          return onChange({ ...e, ac: { name, value: newArray } }, newArray);
        }

        if (isSelected) {
          if (optionType === "string") {
            const newArray = value.filter((i: any) => i !== item);
            return onChange({ ...e, ac: { name, value: newArray } }, newArray);
          }

          const newArray = value.filter(
            (i: any) => getOptionLabel(i) !== getOptionLabel(item)
          );

          return onChange({ ...e, ac: { name, value: newArray } }, newArray);
        }
      }
      if (isSelected) {
        return onChange({ ...e, ac: { name, value: "" } }, "");
      }
      if (optionType === "string")
        return onChange({ ...e, ac: { name, value: item } }, item);
      return onChange({ ...e, ac: { name, value: item } }, item);
    },
    [value, optionType, multiple, onChange]
  );

  const clickChipHandle = (e: any, item: any) => {
    if (getOptionDisabled && getOptionDisabled(item)) return;
    inputRef.current?.focus();
    const newArray = value.filter((i: any) => i !== item);
    return onChange({ ...e, ac: { name, value: newArray } }, newArray);
  };

  const clearAllHandle = useCallback(
    (e: any) => {
      inputRef.current?.focus();
      if (multiple) {
        setSingleInputValue("");
        setSearchValue("");

        let newArray;
        newArray = value.filter((item: any) =>
          getOptionDisabled ? getOptionDisabled(item) : false
        );

        return onChange(
          { ...e, ac: { name, value: newArray || [] } },
          newArray || []
        );
      }
      onChange({ ...e, ac: { name, value: "" } }, "");
    },
    [value, onChange, multiple]
  );

  const onEnterPress = (e: any) => {
    e.preventDefault();
    if (!freeSolo) return;

    const freeSoloString = e.target.value;

    for (let i = 0; i < options.length; i++) {
      if (
        (getOptionLabel(options[i]) || options[i]).toString().toLowerCase() ===
        freeSoloString.toLowerCase()
      ) {
        if (getOptionDisabled && getOptionDisabled(options[i])) return;
        if (multiple) {
          const newArray = [...value, options[i]];
          onChange({ ...e, ac: { name, value: newArray } }, newArray);
          setSingleInputValue("");
          return;
        }
        onChange({ ...e, ac: { name, value: options[i] } }, options[i]);
        return;
      }
    }

    if (selectedValueMemoized[freeSoloString] || freeSoloString === "") return;

    if (multiple) {
      const newArray = [...value, freeSoloString];

      onChange({ ...e, ac: { name, value: newArray } }, newArray);
      return;
    }

    inputRef.current?.blur();
    setSearchValue("");
    setSingleInputValue("");
    return onChange(
      { ...e, ac: { name, value: freeSoloString } },
      freeSoloString
    );
  };

  const onInputChangeHandle = useCallback(
    (inputValue: string) => {
      onInputChange && onInputChange(inputValue);
      if (!isOpen) setIsOpen(true);
      if (multiple) return setSingleInputValue(inputValue);
      if (value) {
        if (inputValue.length < (getOptionLabel(value) || value).length) {
          onChange({ ac: { name, value: "" } }, "");
          return setSingleInputValue("");
        }
      }
      setSingleInputValue(inputValue);
    },
    [multiple, value, isOpen, onChange]
  );

  const onSearchHandle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const searchStr = e.target.value;
      if (value && !multiple) {
        if (
          searchStr.length < (getOptionLabel(value) || value).toString().length
        ) {
          setSearchValue("");
          return onChange({ ac: { name, value: "" } }, "");
        }
      }
      setSearchValue(searchStr);
    },
    [value, multiple, onChange]
  );

  const searchedItems = useMemo(() => {
    if (!searchValue) return options;
    return options.filter((item: any) => {
      const label = getOptionLabel(item) || item;
      return label
        .toString()
        .toLowerCase()
        .includes(searchValue.toString().toLowerCase());
    });
  }, [options, searchValue]);

  const onScrollToBottomHandler = (e: any) => {
    const distanceFromBottom =
      parseInt(e.target?.scrollHeight) -
      parseInt(e.target.scrollTop) -
      parseInt(e.target.clientHeight);
    if (
      distanceFromBottom < bottomScrollOffset &&
      e.target.scrollHeight > currentScrollHeight
    ) {
      onScrollToBottom && onScrollToBottom();
      setCurrentScrollHeight(e.target.scrollHeight);
    }
  };

  function handleFocus(e: any) {
    const targetNode = e.target as Node;
    if (!isFocused && wrapperRef.current?.contains(targetNode)) {
      setIsFocused(true);
      if (getCustomRender && !multiple) setCustomRender(false);
    }

    if (isFocused && !wrapperRef.current?.contains(targetNode)) {
      setIsFocused(false);
      if (onBlur) onBlur({ ...e, ac: { name, value } }, value);
      if (getCustomRender && !multiple) setCustomRender(true);
    }
  }

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

  const labelClasses = clsx("ac-input-label", {
    "has-error": hasError,
    "has-alert": hasAlert,
  });

  // /* data-testIds */
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
    clearAll: dataTestId ? `${dataTestId}-autocomplete-clear-all` : "",
    dropdownWrapper: dataTestId
      ? `${dataTestId}-autocomplete-dropdown-wrapper`
      : "",
  };

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
        {multiple && (
          <ChipWrapper
            className={chipWrapperClasses}
            data-testid={testIDs.chipWrapper}
            style={style?.chipWrapper}
          >
            {value &&
              value.map((item: any, idx: number) => (
                <ACChip
                  size="small"
                  rightIcon={
                    getOptionDisabled && getOptionDisabled(item) ? null : (
                      <BiXCircle />
                    )
                  }
                  onRightIconClick={(e) => {
                    clickChipHandle(e, item);
                  }}
                  label={getOptionLabel(item) || item}
                  key={getOptionLabel(item) || item}
                  data-testid={testIDs.chip}
                  // disabled={getOptionDisabled && getOptionDisabled(item)}
                />
              ))}
          </ChipWrapper>
        )}

        {!customRender || !value || multiple ? (
          renderInput({
            id: id,
            dataTestId: dataTestId,
            onClick: () => setIsOpen((prev) => !prev),
            onChange: onSearchHandle,
            onInputChange: (value: string) => onInputChangeHandle(value),
            value: singleInputValue,
            isAutoComplete: true,
            ref: inputRef,
            onEnterPress: onEnterPress,
            disabled: disabled,
            // onBlur: (e: any) => {
            //   onBlur && onBlur({ ...e, ac: { name, value } }, value);
            // },
          })
        ) : (
          <div>{getCustomRender ? getCustomRender(value) : null}</div>
        )}

        <ControlsWrapper
          data-testid={testIDs.controlsWrapper}
          style={style?.controlsWrapper}
        >
          {value && value.length !== 0 && clearAllBtn ? (
            <ACButton dataTestid={testIDs.clearAll} onClick={clearAllHandle}>
              <BiXCircle />
            </ACButton>
          ) : null}
          <ACButton dataTestid={testIDs.dropdown} onClick={handleDropdown}>
            {isOpen ? <BiChevronUp /> : <BiChevronDown />}
          </ACButton>
        </ControlsWrapper>
      </InputWrapper>

      <ACTransition
        className="ACAutocomplete__dropDown"
        contentHeight={dropdownHeight}
        isShow={isOpen}
        time={300}
        onClose={closeDropdown}
        forwardRef={wrapperRef}
      >
        <List
          onScroll={onScrollToBottom && onScrollToBottomHandler}
          ref={dropdownRef}
          style={style?.list}
          data-testid={testIDs.dropdownWrapper}
        >
          {searchedItems.length === 0 && (
            <EmptyOptions>
              {freeSolo ? "Press Enter To Add Free Solo" : "No matches found"}
            </EmptyOptions>
          )}
          {searchedItems.map((item: any, i) => (
            <OptionItem
              onClick={(e) => {
                clickItemHandle(
                  e,
                  item,
                  selectedValueMemoized[getOptionLabel(item) || item]
                    ? true
                    : false
                );
              }}
              // key={i}
              key={getOptionLabel(item) || item}
              domID={getOptionLabel(item) || item}
              label={getOptionLabel(item) || item}
              isSelected={
                selectedValueMemoized[getOptionLabel(item) || item]
                  ? true
                  : false
              }
              isDisabled={getOptionDisabled ? getOptionDisabled(item) : false}
              style={style?.listItem}
              customRender={item?.customRender}
              getCustomRender={() => {
                if (getCustomRender) return getCustomRender(item);
                return false;
              }}
            />
          ))}
        </List>
      </ACTransition>
      {helperText && (
        <ACHelperText style={style?.helperText}>{helperText}</ACHelperText>
      )}

      {hasError && errorMessage && (
        <ACHelperText style={style?.helperText} hasError={hasError}>
          {errorMessage}
        </ACHelperText>
      )}
    </Wrapper>
  );
};

export default ACAutocomplete;
