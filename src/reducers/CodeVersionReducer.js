import {
  FETCH_CODEVERSION_COMPLETE,
  FETCH_CODEVERSION_FAILURE,
  ADD_CODEVERSION_COMPLETE,
  ADD_CODEVERSION_ERROR,
  ADD_CODEVERSION_FAILURE,
  DELETE_CODEVERSION_COMPLETE,
  DELETE_CODEVERSION_ERROR,
  DELETE_CODEVERSION_FAILURE,
  RESET_DUPLICATE_ERROR,
} from "../utils/AppConstants";

const initState = {
  codeVersionDetailsList: { list: [] },
  isCodeVersionAdded: false,
  isCodeVersionDeleted: false,
  getError: "",
  addError: "",
};

export const CodeVersionReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_CODEVERSION_COMPLETE:
      return {
        ...state,
        codeVersionDetailsList: { list: action.payload },
        getError: "",
        addError: "",
        isCodeVersionAdded: false,
        isCodeVersionDeleted: false,
      };

    case FETCH_CODEVERSION_FAILURE:
      return {
        ...state,
        codeVersionDetailsList: { list: [] },
        getError: action.payload,
        addError: "",
        isCodeVersionAdded: false,
        isCodeVersionDeleted: false,
      };
    case ADD_CODEVERSION_COMPLETE:
      return {
        ...state,
        isCodeVersionAdded: true,
        addError: "",
      };
    case ADD_CODEVERSION_ERROR:
      return {
        ...state,
        isCodeVersionAdded: false,
        addError: action.payload,
      };

    case ADD_CODEVERSION_FAILURE:
      return {
        ...state,
        isCodeVersionAdded: false,
        addError: action.payload,
      };
    case DELETE_CODEVERSION_COMPLETE:
      return {
        ...state,
        isCodeVersionDeleted: true
      };
    case DELETE_CODEVERSION_ERROR:
      return {
        ...state,
        isCodeVersionDeleted: false
      };
    case DELETE_CODEVERSION_FAILURE:
      return {
        ...state,
        isCodeVersionDeleted: false
      };
    case RESET_DUPLICATE_ERROR:
      return {
        ...state,
        addError: "",
      };
    default:
      return { ...state };
  }
};
