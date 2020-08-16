export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

export const API_KEY = 'AIzaSyCj8_we-cO2HAlggcVZ8zf3pUaf-CdcAws';

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      if (errData?.error?.message === 'EMAIL_EXISTS') {
        throw new Error("Email already exists!");
      } else if (errData?.error?.message === 'OPERATION_NOT_ALLOWED') {
        throw new Error("Password sign in is disabled!");
      } else if (errData?.error?.message === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
        throw new Error("Too many failed attempts! Try again later");
      }
    }

    const resData = await response.json();
    console.log('resData: ', resData);
    dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      if (errData?.error?.message === 'INVALID_PASSWORD') {
        throw new Error("Invalid Password!");
      } else if (errData?.error?.message === 'EMAIL_NOT_FOUND') {
        throw new Error("Invalid Email or User doesnot exsist!");
      } else if (errData?.error?.message === 'USER_DISABLED') {
        throw new Error("Account has been deactivated!");
      } else if (errData?.error?.message === 'PASSWORD_LOGIN_DISABLED') {
        throw new Error("No user found! Signup first");
      }
    }

    const resData = await response.json();
    console.log('resData: ', resData);
    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
  };
};
