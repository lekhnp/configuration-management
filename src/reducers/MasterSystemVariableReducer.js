import {
  FETCH_MASTERSYSVARIABLE_COMPLETE,
  FETCH_MASTERSYSVARIABLE_FAILURE,
  FETCH_MASTERSYSVARIABLEBYID_COMPLETE,
  FETCH_MASTERSYSVARIABLEBYID_FAILURE,
  ADD_MASTERSYSVARIABLE_COMPLETE,
  ADD_MASTERSYSVARIABLE_FAILURE,
  ADD_MASTERSYSVARIABLE_ERROR,
  UPDATE_MASTERSYSVARIABLE_COMPLETE,
  UPDATE_MASTERSYSVARIABLE_FAILURE,
  UPDATE_MASTERSYSVARIABLE_ERROR,
  DELETE_MASTERSYSVARIABLE_COMPLETE,
  DELETE_MASTERSYSVARIABLE_FAILURE,
  DELETE_MASTERSYSVARIABLE_ERROR,
  RESET_MASTERSYSVARIABLE_ADDED,
  RESET_DUPLICATE_ERROR,
  RESET_UPDATE_ERROR,
  DEFAULT_START_INDEX,
  DEFAULT_PAGE_SIZE,
  SET_DEFAULT_STARTINDEX,
} from "../utils/AppConstants";

const initState = {
  tableDetailsList: {
    list: [
      {
        createdByUser: "Vipul Saxena",
        createdDate: "2020-10-09T07:16:52.000+0000",
        shortDescription: "Allow multiple IRES on a single case",
        id: 0,
        code: "ALLOW_MULTIPLE_IRES_ON_A_SINGLE_ CASE",
        modules: "PROVIDER_DISPUTES",
        table: "address_type",
        //'uniqueColumn':'tess',
        uniqueColumn: {
          mapObject: {
            fieldName: "CODE",
            columnName: "CODE",
            fieldLength: 50,
            decimalDigits: 0,
            dataType: "VARCHAR",
            javaDataType: "STRING",
            isRequired: true,
            isAutoIncrement: false,
          },
          mapLabel: "System Variable Code",
          isPrimary: true,
        },
        updatedByUser: null,
        updatedDate: null,
      },
      {
        createdByUser: "Vipul Saxena",
        createdDate: "2020-10-09T07:16:52.000+0000",
        shortDescription: "Allow multiple IRES on a single case",
        id: 1,
        code: "ALLOW_MULTIPLE_IRES_ON_A_SINGLE_ CASE",
        modules: "GRIEVANCE",
        table: "address_type",
        //'uniqueColumn':'tess',
        uniqueColumn: {
          mapObject: {
            fieldName: "CODE",
            columnName: "CODE",
            fieldLength: 50,
            decimalDigits: 0,
            dataType: "VARCHAR",
            javaDataType: "STRING",
            isRequired: true,
            isAutoIncrement: false,
          },
          mapLabel: "",
          isPrimary: false,
        },
        updatedByUser: null,
        updatedDate: null,
      },
      {
        createdByUser: "Vipul Saxena",
        createdDate: "2020-10-09T07:16:52.000+0000",
        shortDescription: "Set the label for case manager field",
        id: 2,
        code: "Set_THE_LABEL_FOR_CASE_MANAGER_FIELD",
        modules: "ADHOC",
        table: "alert_types",
        //'uniqueColumn':'tess',
        uniqueColumn: {
          mapObject: {
            fieldName: "CODE",
            columnName: "CODE",
            fieldLength: 50,
            decimalDigits: 0,
            dataType: "VARCHAR",
            javaDataType: "STRING",
            isRequired: true,
            isAutoIncrement: false,
          },
          mapLabel: "System Variable Code",
          isPrimary: true,
        },
        updatedByUser: null,
        updatedDate: null,
      },
    ],
    totalElements: "",
    totalPages: "",
  },
  reset: false,
  page: {
    startIndex: DEFAULT_START_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  },
  tableDetailsById: {
    data: {},
  },
  isTableAdded: false,
  isTableDeleted: false,
  isTableUpdated: false,
  //getByIdError:"",
  getError: "",
  addError: "",
  putError: "",
};

export const MasterSystemVariableReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_MASTERSYSVARIABLE_COMPLETE:
      return {
        ...state,
        tableDetailsList: {
          list: action.payload.pageInfo.subModules,
          totalElements: action.payload.pageInfo.totalElements,
          totalPages: action.payload.pageInfo.totalPages,
        },
        page: {
          startIndex: action.payload.startIndex,
          pageSize: action.payload.pageSize,
        },
        reset: false,
        tableDetailsById: { data: {} },
        getError: "",
        addError: "",
        putError: "",
        isTableAdded: false,
        isTableDeleted: false,
        isTableUpdated: false,
      };

    case FETCH_MASTERSYSVARIABLE_FAILURE:
      return {
        ...state,
        tableDetailsList: { list: [], totalElements: "", totalPages: "" },
        page: {
          startIndex: DEFAULT_START_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
        reset: false,
        tableDetailsById: { data: {} },
        getError: action.payload,
        addError: "",
        putError: "",
        isTableAdded: false,
        isTableDeleted: false,
        isTableUpdated: false,
      };
    case FETCH_MASTERSYSVARIABLEBYID_COMPLETE:
      return {
        ...state,
        tableDetailsById: { data: action.payload },
      };
    case FETCH_MASTERSYSVARIABLEBYID_FAILURE:
      return {
        ...state,
        tableDetailsById: { data: {} },
      };
    case ADD_MASTERSYSVARIABLE_COMPLETE:
      return {
        ...state,
        tableDetailsList: {
          ...state.tableDetailsList,
          list: [...state.tableDetailsList.list, action.payload],
        },
        isTableAdded: true,
        addError: "",
      };
    case ADD_MASTERSYSVARIABLE_ERROR:
      return {
        ...state,
        isTableAdded: false,
        addError: action.payload,
      };

    case ADD_MASTERSYSVARIABLE_FAILURE:
      return {
        ...state,
        isTableAdded: false,
        addError: action.payload,
      };
    case UPDATE_MASTERSYSVARIABLE_COMPLETE:
      return {
        ...state,
        isTableUpdated: true,
        putError: "",
      };
    case RESET_MASTERSYSVARIABLE_ADDED:
      return {
        ...state,
        isTableAdded: false,
        putError: "",
      };
    case UPDATE_MASTERSYSVARIABLE_ERROR:
      return {
        ...state,
        isTableUpdated: false,
        putError: action.payload,
      };

    case UPDATE_MASTERSYSVARIABLE_FAILURE:
      return {
        ...state,
        isTableUpdated: false,
        putError: action.payload,
      };
    case DELETE_MASTERSYSVARIABLE_COMPLETE:
      return {
        ...state,
        isTableDeleted: true,
      };
    case DELETE_MASTERSYSVARIABLE_ERROR:
      return {
        ...state,
        isTableDeleted: false,
      };
    case DELETE_MASTERSYSVARIABLE_FAILURE:
      return {
        ...state,
        isTableDeleted: false,
      };
    case RESET_DUPLICATE_ERROR:
      return {
        ...state,
        tableDetailsById: { data: {} },
        addError: "",
        putError: "",
        isTableAdded: false,
        isTableDeleted: false,
        isTableUpdated: false,
      };
    case RESET_UPDATE_ERROR:
      return {
        ...state,
        //tableDetailsById:{data: {}},
        addError: "",
        putError: "",
      };
    case SET_DEFAULT_STARTINDEX:
      return {
        ...state,
        reset: true,
      };
    default:
      return { ...state };
  }
};
