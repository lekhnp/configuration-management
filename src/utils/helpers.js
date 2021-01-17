// import { LOCAL_ACCESS_TOKEN } from "./AppConstants";
import { STOP_SPINNER_ACTION, USER_LOGGED_OUT } from "./AppConstants";
import { showMessageDialog } from "../actions/MessageDialogActions";

var jwtDecode = require("jwt-decode");

export const getUserProfileInfo = () => {
  let loggedInInfo = getLocalStorageData();
  return jwtDecode(loggedInInfo.access_token);
};

export const saveDataInLocalStorage = (data) => {
  let userData = data.responseObject;
  //localStorage.setItem("userType", userType);

  // if (userType === "MHK") {
  //   // localStorage.setItem("accessTokenType", userData.accessTokenType);
  //   // localStorage.setItem("expiresIn", userData.expiresIn);
  //   // localStorage.setItem("expiresOn", userData.expiresOn);
  //   localStorage.setItem("idToken", userData.idToken);
  //   // localStorage.setItem("userInfo", JSON.stringify(userData.userInfo));
  //   localStorage.setItem("access_token", userData.accessToken);
  //   localStorage.setItem("refresh_token", userData.refreshToken);
  //   // localStorage.setItem(
  //   //   "isMultipleResourceRefreshToken",
  //   //   userData.isMultipleResourceRefreshToken
  //   // );
  // } else {
  localStorage.setItem("idToken", userData.idToken);
  localStorage.setItem("access_token", userData.access_token);
  localStorage.setItem("refresh_token", userData.refresh_token);
  //}
};

export const getLocalStorageData = () => {
  let data = {};
  if (localStorage.length > 0) {
    data = {
      // userType: localStorage.getItem("userType"),
      // accessTokenType: localStorage.getItem("accessTokenType"),
      // expiresIn: localStorage.getItem("expiresIn"),
      // expiresOn: localStorage.getItem("expiresOn"),
      idToken: localStorage.getItem("idToken"),
      // userInfo: JSON.parse(localStorage.getItem("userInfo")),
      access_token: localStorage.getItem("access_token"),
      refresh_token: localStorage.getItem("refresh_token"),
      // isMultipleResourceRefreshToken: localStorage.getItem(
      //   "isMultipleResourceRefreshToken"
      // ),
    };
  }

  return data;
};

export const setRequestHeader = (type) => {
  let loggedInInfo = getLocalStorageData();
  let headerObj = {};

  if (type !== "upload") {
    headerObj["Content-Type"] = "application/json";
    headerObj["Accept"] = "application/json";
  }

  if (loggedInInfo.access_token) {
    //let tokenType = loggedInInfo.accessTokenType.split(`"`)[1];
    headerObj.Authorization = `Bearer ${loggedInInfo.access_token}`;
  }

  return headerObj;
};

export function formatDate(inputDate) {
  if (inputDate) {
    let d = new Date(inputDate);
    let dd = (d.getDate() < 10 ? "0" : "") + d.getDate();
    var MM = (d.getMonth() + 1 < 10 ? "0" : "") + (d.getMonth() + 1);
    let formattedDate =
      MM +
      "/" +
      dd +
      "/" +
      d.getFullYear() +
      " " +
      d.toString().split(" ")[4].substring(0, 5);
    return formattedDate;
  }
  return " ";
}

export function formatTimelineDate(inputDate) {
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (inputDate) {
    let d = new Date(inputDate);
    let dd = (d.getDate() < 10 ? "0" : "") + d.getDate();
    var MM = monthNames[d.getMonth()];
    let formattedDate = MM + " " + dd + ", " + d.getFullYear();
    return formattedDate;
  }
  return " ";
}

export function formatTimelineTime(inputDate) {
  if (inputDate) {
    let d = new Date(inputDate);
    let time24 = d.toString().split(" ")[4].substring(0, 7);
    const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
    const period = +sHours < 12 ? "AM" : "PM";
    const hours = +sHours % 12 || 12;

    return `${hours < 10 ? "0" + hours : hours}:${minutes} ${period}`;
  }
  return " ";
}

export function formatTimelineData(input, dataFor) {
  //let temp = "";
  //console.log("INPUT",input);
  //dataFor === "USER" ? (temp = "updatedDate") : (temp = "createdDate");
  let result = input.reduce(function (r, a) {
    let temp = a["updatedDate"]?"updatedDate":"createdDate";
    if (a[temp] && !(a.action === 'UPDATE' && a.changes.length === 0)) {
      r[a[temp].substring(0, 10)] = r[a[temp].substring(0, 10)] || [];
      r[a[temp].substring(0, 10)].push(a);
    }
    return r;
  }, Object.create(null));
  return result;
}

export const stopLoading = (dispatch) => {
  setTimeout(() => {
    dispatch({ type: STOP_SPINNER_ACTION });
  }, 700);
};

export const logout = (history, dispatch) => {
  dispatch({ type: USER_LOGGED_OUT });
  localStorage.clear();
  history.push("/");
};

export const handleTimeoutMessage = (history, dispatch, setExpiry) => {
  logout(history, dispatch);
  let messageObj = {
    primaryButtonLabel: "OK",
    primaryButtonAction: () => {
      window.location.reload(false);
    },
    // secondaryButtonLabel: "No",
    // secondaryButtonAction: () => {},
    title: "Session Expired",
    message:
      "Your session has expired due to inactivity. Login again to continue.",
  };
  dispatch(showMessageDialog(messageObj));
  document.removeEventListener("click", setExpiry);
  document.removeEventListener("keypress", setExpiry);
};

export const generateInternalName = (propertyLabel) => {
  let camelCase = propertyLabel
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
  let currentDate = new Date();
  let internalName = camelCase + currentDate.getTime();
  return internalName;
};

export const generateFileName = (fileName, {moduleList, lobList, companyList, deliveryTypeList}) => {
    
    const fileNames = fileName.split('-');
    let fileNamesCopy = [...fileNames];

    console.log(fileNames);

    const valueSet = {
      deliveryMethod: "MAIL",
      moduleId: 0,
      companyId: 0,
      businessLineId: 0,
      letterName: "",

    };

    fileNames.forEach((item, index) => {
      
      if (!valueSet.moduleId) {
        for (let currentItem in moduleList) {
          if (moduleList[currentItem].moduleName.toLowerCase().trim() === item.toLowerCase().trim()) {
            valueSet.moduleId = moduleList[currentItem].id;
            delete fileNamesCopy[index];
            break;
          }
        }

        if(!valueSet.moduleId && fileNames.length === 5  && index !== 2) {
          delete fileNamesCopy[index];
        }
      }

      if (valueSet.deliveryMethod==="MAIL") {
        for (let currentItem of deliveryTypeList) {
          if (currentItem.toLowerCase().trim() === item.toLowerCase().trim()) {
            valueSet.deliveryMethod = currentItem;
  
            delete fileNamesCopy[index];
            break;
          }
        }

        if(valueSet.deliveryMethod==="MAIL" && fileNames.length === 5 && index !== 2) {
          delete fileNamesCopy[index];
        }
      }

      if (!valueSet.businessLineId) {
        for (let currentItem in lobList) {
          if (lobList[currentItem].productLine.toLowerCase().trim() === item.toLowerCase().trim()) {
            valueSet.businessLineId = lobList[currentItem].id;

            delete fileNamesCopy[index];
            break;
          }
        }

        if(!valueSet.businessLineId && fileNames.length === 5 && index !== 2) {
          delete fileNamesCopy[index];
        }
      }

      if (!valueSet.companyId) {
        for (let currentItem in companyList) {
          if (companyList[currentItem].code.toLowerCase().trim() === item.toLowerCase().trim()) {
            valueSet.companyId = companyList[currentItem].id;
  
            delete fileNamesCopy[index];
            break;
          }
        }

        if(valueSet.companyId && fileNames.length === 5 && index !== 2) {
          delete fileNamesCopy[index];
        }
      }
    })

    fileNamesCopy = fileNamesCopy.filter(item => !!item);

    if (fileNamesCopy.length === 1) {
      valueSet.letterName = fileNamesCopy[0];
    }

    console.log(fileNamesCopy);

    return valueSet;

}