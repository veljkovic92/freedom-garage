import { authActions } from "../store/auth-slice";
import { uiActions } from "../store/ui-slice";

// Name handling functions

export const setDisplayName = (token, name) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDUlyw-dltmGCc-EjQuuVbGAQpX92HFL0I",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: name,
            returnSecureToken: false,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      let errorMessage = "Authentification failed!";

      if (data && data.error && data.error.message) {
        errorMessage = data.error.message;
        throw new Error(errorMessage);
      }

      if (response.ok) {
        dispatch(authActions.localName(name));
        const localUser = JSON.parse(localStorage.getItem("user"));
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...localUser,
            name: name,
          })
        );
        console.log("Name changed");
      }
    };
    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDisplayName = (token) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDUlyw-dltmGCc-EjQuuVbGAQpX92HFL0I",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Can't set configs");
      }
      const user = await response.json();
      const userName = user.users[0].displayName;
      console.log(userName);
      const localUser = JSON.parse(localStorage.getItem("user"));
      const newLocalUser = {
        ...localUser,
        name: userName,
      };
      localStorage.setItem("user", JSON.stringify(newLocalUser));
      dispatch(authActions.localName(userName));
    };
    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};

// Password handling functions

export const changePassword = (token, password) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDUlyw-dltmGCc-EjQuuVbGAQpX92HFL0I",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            password: password,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();

      let errorMessage = "Authentification failed!";

      if (data && data.error && data.error.message) {
        errorMessage = data.error.message;
        throw new Error(errorMessage);
      }

      if (response.ok) {
        dispatch(
          uiActions.showNotification({
            status: "Success",
            title: "Successfully changed password",
            message: "Please remember to note your new password",
          })
        );
        console.log("Password changed");
      }
    };
    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};
