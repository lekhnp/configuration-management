import {
    FETCH_CONTROLAUDIT_COMPLETE,
    FETCH_CONTROLAUDIT_FAILURE,
  } from "../utils/AppConstants";
  
  const initState = {
    controlAuditDetails: [],
    //   {
    //     "id": 2066,
    //     "createdDate": "2020-08-18T11:14:53.000+0000",
    //     "updatedDate": null,
    //     "updatedByUser": null,
    //     "createdByUser": "Vipul Saxena",
    //     "changes": [
    //         {
    //             "valueTo": "No",
    //             "key": "/mandatory",
    //             "valueFrom": "Yes",
    //             "action": "REPLACE"
    //         }
    //     ],
    //     "action": "MODIFY",
    //     "controlData": "{\"ddgs\": \"\", \"label\": \"label\", \"hidden\": \"No\", \"section\": \"section\", \"disabled\": \"Yes\", \"mandatory\": \"No\", \"controlType\": \"Label\"}",
    //     "controlDataPrevious": "{\"ddgs\": \"\", \"label\": \"label\", \"hidden\": \"No\", \"section\": \"section\", \"disabled\": \"Yes\", \"mandatory\": \"Yes\", \"controlType\": \"Label\"}"
    // },
    //   {
    //     "id": 2065,
    //     "createdDate": "2020-08-18T14:57:41.000+0000",
    //     "updatedDate": null,
    //     "updatedByUser": null,
    //     "createdByUser": "Vipul Saxena",
    //     "changes": [
    //         {
    //             "valueTo": "Yes",
    //             "key": "/mandatory",
    //             "valueFrom": "No",
    //             "action": "REPLACE"
    //         }
    //     ],
    //     "action": "MODIFY",
    //     "controlData": "{\"ddgs\": \"backend\", \"label\": \"label\", \"hidden\": \"No\", \"section\": \"section\", \"disabled\": \"Yes\", \"mandatory\": \"Yes\", \"controlType\": \"Label\"}",
    //     "controlDataPrevious": "{\"ddgs\": \"backend\", \"label\": \"label\", \"hidden\": \"No\", \"section\": \"section\", \"disabled\": \"Yes\", \"mandatory\": \"No\", \"controlType\": \"Label\"}"
    // },
    //   {
    //       "id": 2064,
    //       "createdDate": "2020-08-17T14:57:41.000+0000",
    //       "updatedDate": null,
    //       "updatedByUser": null,
    //       "createdByUser": "Vipul Saxena",
    //       "changes": [
    //           {
    //               "valueTo": "Yes",
    //               "key": "/mandatory",
    //               "valueFrom": "No",
    //               "action": "REPLACE"
    //           }
    //       ],
    //       "action": "MODIFY",
    //       "controlData": "{\"ddgs\": \"backend\", \"label\": \"label\", \"hidden\": \"No\", \"section\": \"section\", \"disabled\": \"Yes\", \"mandatory\": \"Yes\", \"controlType\": \"Label\"}",
    //       "controlDataPrevious": "{\"ddgs\": \"backend\", \"label\": \"label\", \"hidden\": \"No\", \"section\": \"section\", \"disabled\": \"Yes\", \"mandatory\": \"No\", \"controlType\": \"Label\"}"
    //   },
    //   {
    //       "id": 2063,
    //       "createdDate": "2020-08-17T12:44:15.000+0000",
    //       "updatedDate": null,
    //       "updatedByUser": null,
    //       "createdByUser": "Vipul Saxena",
    //       "changes": [
    //           {
    //               "valueTo": "backend",
    //               "key": "/ddgs",
    //               "valueFrom": "",
    //               "action": "REPLACE"
    //           }
    //       ],
    //       "action": "MODIFY",
    //       "controlData": "{\"ddgs\": \"backend\", \"label\": \"label\", \"hidden\": \"No\", \"section\": \"section\", \"disabled\": \"Yes\", \"mandatory\": \"No\", \"controlType\": \"Label\"}",
    //       "controlDataPrevious": "{\"ddgs\": \"\", \"label\": \"label\", \"hidden\": \"No\", \"section\": \"section\", \"disabled\": \"Yes\", \"mandatory\": \"No\", \"controlType\": \"Label\"}"
    //   },
    //   {
    //       "id": 2050,
    //       "createdDate": "2020-08-17T11:14:53.000+0000",
    //       "updatedDate": null,
    //       "updatedByUser": null,
    //       "createdByUser": "Vipul Saxena",
    //       "changes": [
    //           {
    //               "valueTo": "No",
    //               "key": "/mandatory",
    //               "valueFrom": "Yes",
    //               "action": "REPLACE"
    //           }
    //       ],
    //       "action": "MODIFY",
    //       "controlData": "{\"ddgs\": \"\", \"label\": \"label\", \"hidden\": \"No\", \"section\": \"section\", \"disabled\": \"Yes\", \"mandatory\": \"No\", \"controlType\": \"Label\"}",
    //       "controlDataPrevious": "{\"ddgs\": \"\", \"label\": \"label\", \"hidden\": \"No\", \"section\": \"section\", \"disabled\": \"Yes\", \"mandatory\": \"Yes\", \"controlType\": \"Label\"}"
    //   },
    //   {
    //       "id": 2037,
    //       "createdDate": "2020-08-17T10:02:25.000+0000",
    //       "updatedDate": null,
    //       "updatedByUser": null,
    //       "createdByUser": "Vipul Saxena",
    //       "changes": [],
    //       "action": "ADD",
    //       "controlData": "{\"ddgs\": \"\", \"label\": \"label\", \"hidden\": \"No\", \"section\": \"section\", \"disabled\": \"Yes\", \"mandatory\": \"Yes\", \"controlType\": \"Label\"}",
    //       "controlDataPrevious": ""
    //   }
  //],
    getError:""
    
  };
  
  export const OOBFieldTimelineReducer = (state = initState, action) => {
    switch (action.type) {
      case FETCH_CONTROLAUDIT_COMPLETE:
        return {
          ...state,
          controlAuditDetails: action.payload,
          getError:""
        };
  
      case FETCH_CONTROLAUDIT_FAILURE:
        return {
          ...state,
          controlAuditDetails: [],
          getError:action.payload
        };
      default:
        return { ...state };
    }
  };
  