import clsx from "clsx";
import React, {
  ChangeEvent,
  CSSProperties,
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  Ref,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import AddonWrapper from "./styled/AddonWrapper";
import AffixWrapper from "./styled/AffixWrapper";
import IconWrapper from "./styled/IconWrapper";
import Input from "./styled/Input";
import Textarea from "./styled/Textarea";
import InputGroupWrapper from "./styled/InputGroupWrapper";
import InputLabel from "./styled/InputLabel";
import InputWrapper from "./styled/InputWrapper";

import { mergeRefs } from "../../../utils/helpers";

import { BiHide, BiShow, BiXCircle } from "react-icons/bi";
import ACHelperText from "../ACHelperText";
import { ACEvenType } from "../../../globalTypes/index";

const ACInput = forwardRef(
  (
    {
      id,
      className,
      wrapperClassName,
      affixWrapperClassName,
      groupClassName,
      dataTestId = "",
      value = "",
      defaultValue,
      label,
      size = "medium",
      placeholder,
      disabled = false,
      fullWidth,
      onChange,
      onInputChange,
      addonBefore,
      addonAfter,
      prefix,
      suffix,
      allowClear,
      autoComplete,
      addonBeforeOnClick,
      addonAfterOnClick,
      suffixOnClick,
      prefixOnClick,
      onClick,
      onEnterPress,
      onFocus,
      onBlur,
      maxLength,
      showCount = false,
      style,
      helperText,
      required = false,
      name = "",
      type = "text",
      hideTogglePassword = false,
      hasError = false,
      errorMessage = "",
      hasAlert = false,
      alertMessage = "",
      marginBottom,
      autoFocus,
      rounded,
      isTextArea,
    }: ACInputProps,
    ref
  ) => {
    const [localValue, setLocalValue] = useState(defaultValue || value || "");
    const [inputType, setInputType] = useState(type);

    const localElementRef =
      useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
      // expose the clearInput method and focus method to the parent component
      clearInput: () => {
        setLocalValue("");
      },
      focus: () => {
        localElementRef.current?.focus();
      },
      blur: () => {
        localElementRef.current?.blur();
      },
      value: localValue,
    }));

    const onChangeHandler = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const value =
        inputType === "number" ? Number(e.target.value) : e.target.value;
      setLocalValue(value);
      onChange &&
        onChange({
          ...e,
          ac: { value: value, name, type: "ACInput" },
        });
      onInputChange && onInputChange(value);
    };

    const handleKeyPress = useCallback(
      (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === "Enter" && onEnterPress) onEnterPress(e);
      },
      [onEnterPress]
    );

    const handleClear = () => {
      localElementRef.current?.focus();
      setLocalValue("");
      value &&
        onChange &&
        onChange({
          target: { value: "" },
          ac: { value: "", name, type: "ACInput" },
        });
    };

    const wrapperClasses = clsx(wrapperClassName, "ac-input-wrapper", {
      "full-width": fullWidth,
      "has-error": hasError,
      "has-alert": hasAlert,
      "mb-sm": marginBottom === "sm" || marginBottom,
      "mb-md": marginBottom === "md",
      "mb-lg": marginBottom === "lg",
    });
    const labelClasses = clsx("ac-input-label", {
      "has-error": hasError,
      "has-alert": hasAlert,
    });
    const inputClasses = clsx(className, size, "ac-input", {
      "has-error": hasError,
      "has-alert": hasAlert,
    });
    const textAreaClasses = clsx(className, size, "ac-textarea", {
      "is-disabled": disabled,
      "has-error": hasError,
      "has-alert": hasAlert,
      "rounded-sm": rounded === "sm",
      "rounded-md": rounded === "md",
      "rounded-lg": rounded === "lg",
      "full-width": fullWidth,
    });
    const affixClasses = clsx(affixWrapperClassName, size, "ac-affix-wrapper", {
      "is-disabled": disabled,
      "has-error": hasError,
      "has-alert": hasAlert,
      isTextArea: isTextArea,
      "rounded-sm": rounded === "sm" && !addonBefore && !addonAfter,
      "rounded-md": rounded === "md" && !addonBefore && !addonAfter,
      "rounded-lg": rounded === "lg" && !addonBefore && !addonAfter,
    });
    const inputGroupClasses = clsx(groupClassName, "ac-input-group-wrapper", {
      "has-error": hasError,
      "has-alert": hasAlert,
      "full-width": fullWidth,
    });
    const addonWrapperClasses = clsx("ac-input-group-addon", {
      "addon-before-clickable": addonBeforeOnClick,
      "addon-after-clickable": addonAfterOnClick,
      "has-error": hasError,
      "has-alert": hasAlert,
      "rounded-sm": rounded === "sm",
      "rounded-md": rounded === "md",
      "rounded-lg": rounded === "lg",
    });

    const testIDs = {
      wrapper: dataTestId ? `${dataTestId}-input-wrapper` : "",
      label: dataTestId ? `${dataTestId}-input-label` : "",
      textArea: dataTestId ? `${dataTestId}-text-area` : "",
      textAreaLabel: dataTestId ? `${dataTestId}-text-area-label` : "",
      icon: dataTestId ? `${dataTestId}-input-icon` : "",
      allowClear: dataTestId ? `${dataTestId}-input-allow-clear` : "",
      togglePasswordIcon: dataTestId
        ? `${dataTestId}-input-toggle-password-icon`
        : "",
    };

    if (label && !id) {
      console.warn(
        'Please enter valid "id" prop into ACInput component for accessibility purposes when using "label" prop.'
      );
    }

    const displayClearIcon = allowClear && localValue && value && !disabled;

    return (
      <InputWrapper
        className={wrapperClasses}
        data-testid={testIDs.wrapper}
        style={style?.wrapper}
      >
        {isTextArea ? (
          <>
            {label && (
              <InputLabel
                className={labelClasses}
                data-testid={testIDs.textAreaLabel}
                htmlFor={id}
                style={style?.label}
              >
                {label}
              </InputLabel>
            )}
            <Textarea
              id={id}
              data-testid={testIDs.textArea}
              className={textAreaClasses}
              placeholder={placeholder}
              disabled={disabled}
              value={value}
              defaultValue={defaultValue}
              onChange={onChangeHandler}
              ref={mergeRefs(localElementRef, ref)}
              onClick={onClick}
              onFocus={onFocus}
              onBlur={(e) => {
                onBlur && onBlur({ ...e, ac: { value: e.target.value, name } });
              }}
              onKeyDown={handleKeyPress}
              maxLength={maxLength}
              required={required}
              name={name}
              style={style?.textarea}
              onKeyPress={handleKeyPress}
            />
          </>
        ) : (
          <>
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
            <InputGroupWrapper
              className={inputGroupClasses}
              style={style?.inputGroupWrapper}
            >
              {addonBefore && (
                <AddonWrapper
                  className={`${addonWrapperClasses} addon-before`}
                  onClick={addonBeforeOnClick}
                  style={style?.addonWrapperBefore}
                >
                  {addonBefore}
                </AddonWrapper>
              )}

              <AffixWrapper
                className={affixClasses}
                style={style?.affixWrapper}
              >
                {prefix && (
                  <IconWrapper
                    className="ac-icon-wrapper-prefix"
                    style={style?.iconWrapperPrefix}
                  >
                    <span
                      className={`ac-input-prefix ${
                        prefixOnClick ? "prefix-clickable" : null
                      }`}
                      onClick={prefixOnClick}
                    >
                      {prefix}
                    </span>
                  </IconWrapper>
                )}

                <Input
                  id={id}
                  data-testid={dataTestId}
                  className={inputClasses}
                  placeholder={placeholder}
                  disabled={disabled}
                  value={value}
                  defaultValue={defaultValue}
                  onChange={onChangeHandler}
                  ref={mergeRefs(localElementRef, ref)}
                  autoComplete={autoComplete}
                  onClick={onClick}
                  onKeyPress={handleKeyPress}
                  onFocus={onFocus}
                  onBlur={(e) => {
                    onBlur &&
                      onBlur({ ...e, ac: { value: e.target.value, name } });
                  }}
                  maxLength={maxLength}
                  required={required}
                  name={name}
                  type={inputType}
                  style={style?.input}
                  autoFocus={autoFocus}
                />

                {suffix ||
                allowClear ||
                showCount ||
                required ||
                (!hideTogglePassword && type === "password") ? (
                  <IconWrapper
                    className="ac-icon-wrapper-suffix"
                    style={style?.iconWrapperSuffix}
                  >
                    {displayClearIcon && (
                      <span
                        className={`allow-clear ${
                          localValue?.length === 0 ? "hidden" : ""
                        }`}
                        onClick={handleClear}
                        data-testid={testIDs.allowClear}
                        style={style?.clearButton}
                      >
                        <BiXCircle />
                      </span>
                    )}

                    {showCount && (
                      <span>
                        {localValue?.length || 0}
                        {maxLength ? `/${maxLength}` : null}
                      </span>
                    )}

                    {suffix && (
                      <span
                        className={`ac-input-suffix ${
                          suffixOnClick ? "suffix-clickable" : null
                        }`}
                        onClick={suffixOnClick}
                        style={style?.suffix}
                      >
                        {suffix}
                      </span>
                    )}

                    {!hideTogglePassword && type === "password" && (
                      <span
                        className={`show-password ${
                          localValue.length > 0 ? "" : "hidden"
                        }`}
                        onClick={() => {
                          setInputType((prev: any) =>
                            prev === "password" ? "text" : "password"
                          );
                        }}
                        data-testid={testIDs.togglePasswordIcon}
                        style={style?.passwordToggle}
                      >
                        {inputType === "password" ? <BiShow /> : <BiHide />}
                      </span>
                    )}

                    {required && <span>*</span>}
                  </IconWrapper>
                ) : null}
              </AffixWrapper>

              {addonAfter && (
                <AddonWrapper
                  className={`${addonWrapperClasses} addon-after`}
                  onClick={addonAfterOnClick}
                  style={style?.addonWrapperAfter}
                >
                  {addonAfter}
                </AddonWrapper>
              )}
            </InputGroupWrapper>
          </>
        )}
        {helperText && (
          <ACHelperText style={style?.helperText}>{helperText}</ACHelperText>
        )}
        {hasError && errorMessage && (
          <ACHelperText hasError style={style?.helperText}>
            {errorMessage}
          </ACHelperText>
        )}
        {hasAlert && alertMessage && (
          <ACHelperText hasAlert style={style?.helperText}>
            {alertMessage}
          </ACHelperText>
        )}
      </InputWrapper>
    );
  }
);

export default ACInput;

export interface ACInputProps {
  /* ID for input, that is also being used on label for htmlFor attribute */
  id?: string;
  /* The className for input */
  className?: string;
  /* The className for affix wrapper (div that wraps prefix and suffix) */
  affixWrapperClassName?: string;
  /* The className for input group wrapper (div that wraps prefix, suffix and input) */
  groupClassName?: string;
  /* The className for input rapper (div that wraps whole component) */
  wrapperClassName?: string;
  /* The data test id for input, other major dom elements get same id with additional custom suffix */
  dataTestId?: string;
  /* The input content value	*/
  value?: any;
  /* The defaultValue for input	*/
  defaultValue?: string;
  /* The label text displayed above the input field */
  label?: string;
  /* The placeholder text displayed in the input field */
  placeholder?: string;
  /* if passed it will disabled the input */
  disabled?: boolean;
  /* If allow component to fill the whole width of the parent container */
  fullWidth?: boolean;
  /* The size of the input box. Note: for the default value the 'medium' size is used */
  size?: "small" | "medium" | "large";
  /* Callback when user clicks on input */
  onClick?: (e: MouseEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  // onMouseOver?: (e: MouseEvent<HTMLInputElement>) => void;
  // onMouseOut?: (e: MouseEvent<HTMLInputElement>) => void;
  /* Callback when user types in input */
  onChange?: (
    e: ACEvenType<
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { value: string | number } },
      string | number
    >
  ) => void;
  onInputChange?: (value: string | number) => void;
  /* Text or Icon displayed before (on the left side of) the input field */
  addonBefore?: ReactNode;
  /* Text or Icon displayed after (on the right side of) the input field */
  addonAfter?: ReactNode;
  /* The prefix Icon or Text for the Input	*/
  prefix?: ReactNode;
  /* The suffix Icon or Text for the Input */
  suffix?: ReactNode;
  /* When true, displays Clear Icon if input has value, that clears value when clicked on */
  allowClear?: boolean;
  /* The autocomplete attribute for the input */
  autoComplete?: string;
  /* Callback when user click on addonBefore */
  addonBeforeOnClick?: () => void;
  /* Callback when user click on addonAfter */
  addonAfterOnClick?: () => void;
  /* Callback when user click on prefix */
  prefixOnClick?: () => void;
  /* Callback when user click on suffix */
  suffixOnClick?: () => void;
  /* Callback when user presses Enter */
  onEnterPress?: (e: KeyboardEvent) => void;
  // onKeyDown?: any;
  // onKeyUp?: any;
  // onKeyPress?: any;
  /* Show and hide entered password */
  hideTogglePassword?: boolean;
  /* The ref for input */
  ref?: Ref<HTMLInputElement>;
  /* The name for input */
  name?: string;
  /* Gives fixed length on input value */
  maxLength?: number;
  /* Shows the number of characters in input */
  showCount?: boolean;
  /* Allows user to change input type, default is 'text' */
  type?: any;
  /* Indicates if the input is required */
  required?: boolean;
  /* Indicates if the input has an error */
  hasError?: boolean;
  /* The error message displayed below the input field */
  errorMessage?: string;
  /* Indicates if the input has an alert */
  hasAlert?: boolean;
  /* The alert message displayed below the input field */
  alertMessage?: string;
  /* Callback when input is being focused */
  onFocus?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /* Callback when input loses focus */
  onBlur?: (e: any) => void;
  /* Displays text below the input */
  helperText?: string;
  /* Adds spacing bellow component */
  marginBottom?: "sm" | "md" | "lg";
  // children?: ReactNode;
  isAutoComplete?: boolean;
  /* If true, a textarea element is rendered instead of an input. */
  isTextArea?: boolean;
  /* Allows user to pass in custom styles */
  style?: {
    input?: CSSProperties;
    textarea?: CSSProperties;
    wrapper?: CSSProperties;
    label?: CSSProperties;
    inputGroupWrapper?: CSSProperties;
    addonWrapperBefore?: CSSProperties;
    addonWrapperAfter?: CSSProperties;
    affixWrapper?: CSSProperties;
    iconWrapperPrefix?: CSSProperties;
    iconWrapperSuffix?: CSSProperties;
    prefix?: CSSProperties;
    suffix?: CSSProperties;
    clearButton?: CSSProperties;
    passwordToggle?: CSSProperties;
    helperText?: CSSProperties;
  };
  autoFocus?: boolean;
  rounded?: "sm" | "md" | "lg";
}
