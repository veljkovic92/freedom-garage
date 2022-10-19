import { authActions } from "../store/auth-slice";

export const onGetDisplayNameHandler = async (token) => {
  try {
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
    const user = await response.json();
    const userName = user.users[0].displayName;

    const localUser = JSON.parse(localStorage.getItem("user"));
    const newLocalUser = {
      ...localUser,
      name: userName,
    };
    localStorage.setItem("user", JSON.stringify(newLocalUser));

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getDisplayName = (token) => {
  return async (dispatch) => {
    
    const sendRequest = async () => {
      console.log("activated");
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
