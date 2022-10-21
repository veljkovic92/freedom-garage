import { authActions } from "../store/auth-slice";
import { uiActions } from "../store/ui-slice";

// Name handling functions

export const setDisplayName = (token, name) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "changing name",
      })
    );
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
        dispatch(
          uiActions.showNotification({
            status: "name changed",
            title: "Successfully changed name",
          })
        );
        console.log("Name changed");
      }
    };
    try {
      await sendRequest();
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "name not changed",
          title: "Failed changing name",
        })
      );
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
    dispatch(
      uiActions.showNotification({
        status: "changing password",
      })
    );
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
            status: "password changed",
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
      dispatch(
        uiActions.showNotification({
          status: "password not changed",
          title: "Failed changing password",
          message: "Please try to log in again",
        })
      );
      console.log(error);
    }
  };
};

// Account deletion functions

export const deleteAccount = (token) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "deleting account",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDUlyw-dltmGCc-EjQuuVbGAQpX92HFL0I",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
          }),
          headers: { "Content-Type": "application/json" },
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
            status: "account deleted",
            title: "Successfully deleted account",
            message:
              "You'll be automatically signed out on closing this notification",
          })
        );
        console.log("Account deleted");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "account not deleted",
          title: "Failed deleting account",
          message: "Please try to log in again",
        })
      );
      console.log(error);
    }
  };
};

// Edit photo functions

export const editPhoto = (token, photoUrl) => {
  return (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDUlyw-dltmGCc-EjQuuVbGAQpX92HFL0I",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            photoUrl: photoUrl,
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
        dispatch(authActions.localPhotoUrl(photoUrl));
        const localUser = JSON.parse(localStorage.getItem("user"));
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...localUser,
            photoUrl: photoUrl,
          })
        );
        dispatch(
          uiActions.showNotification({
            status: "photo changed",
            title: "Successfully changed photo",
          })
        );
        console.log("Photo changed");
      }

    };

    try{

    } catch (error) {
      console.log(error);
    }
  };
};
