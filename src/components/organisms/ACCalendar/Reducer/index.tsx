export const initialState = {
  currentDate: new Date(),
  selectedDate: null,
  DD: new Date().getDate(),
  MM: new Date().getMonth(),
  YYYY: new Date().getFullYear(),
  HH: new Date().getHours(),
  mm: new Date().getMinutes(),
  inputValue: "",
  errorDate: false,
  errorMessages: "",
};

export type State = typeof initialState;

export const calendarReducer = (state: State, action: any) => {
  switch (action.type) {
    case "NEXT_MONTH":
      return {
        ...state,
        currentDate: new Date(state.YYYY, state.MM + 1, state.DD),
        DD: new Date(state.YYYY, state.MM + 1, state.DD).getDate(),
        MM: new Date(state.YYYY, state.MM + 1, state.DD).getMonth(),
        YYYY: new Date(state.YYYY, state.MM + 1, state.DD).getFullYear(),
      };
    case "PREVIOUS_MONTH":
      return {
        ...state,
        currentDate: new Date(state.YYYY, state.MM - 1, state.DD),
        DD: new Date(state.YYYY, state.MM - 1, state.DD).getDate(),
        MM: new Date(state.YYYY, state.MM - 1, state.DD).getMonth(),
        YYYY: new Date(state.YYYY, state.MM - 1, state.DD).getFullYear(),
      };
    case "SET_MONTH":
      return {
        ...state,
        currentDate: new Date(state.YYYY, action.payload, state.DD),
        DD: new Date(state.YYYY, action.payload, state.DD).getDate(),
        MM: new Date(state.YYYY, action.payload, state.DD).getMonth(),
        YYYY: new Date(state.YYYY, action.payload, state.DD).getFullYear(),
      };

    case "SET_YEAR":
      return {
        ...state,
        currentDate: new Date(action.payload, state.MM, state.DD),
        DD: new Date(action.payload, state.MM, state.DD).getDate(),
        MM: new Date(action.payload, state.MM, state.DD).getMonth(),
        YYYY: new Date(action.payload, state.MM, state.DD).getFullYear(),
      };

    case "CLICK_PREV_NEXT_DAY":
      return {
        ...state,
        currentDate: action.payload,
        selectedDate: action.payload,
        DD: action.payload.getDate(),
        MM: action.payload.getMonth(),
        YYYY: action.payload.getFullYear(),
      };

    case "SET_CURRENT_DATE":
      return {
        ...state,
        currentDate: action.payload,
        DD: action.payload.getDate(),
        MM: action.payload.getMonth(),
        YYYY: action.payload.getFullYear(),
        HH: action.payload.getHours(),
        mm: action.payload.getMinutes(),
      };
    case "SET_SELECTED_DATE":
      return {
        ...state,
        selectedDate: action.payload,
      };

    case "SET_INPUT_VALUE":
      return {
        ...state,
        inputValue: action.payload,
      };
    case "SET_ERROR_DATE":
      return {
        ...state,
        errorDate: action.payload,
      };
    case "SET_ERROR_MESSAGES":
      return {
        ...state,
        errorMessages: action.payload,
      };
    default:
      return state;
  }
};
