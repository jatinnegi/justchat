import * as api from "../api";
import { AUTH_SUCCESS, AUTH_FAIL, FETCH_USER, LOGOUT } from "./types";

export const fetchUser = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUser();
    dispatch({
      type: FETCH_USER,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_FAIL,
    });
    console.log(error);
  }
};

export const login = (formData, setFormError) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    const { key } = data;

    dispatch({
      type: AUTH_SUCCESS,
      payload: key,
    });
    dispatch(fetchUser());
  } catch (error) {
    setFormError(error.response.data.non_field_errors[0]);
  }
};

export const register = (formData, setFormErrors) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    const { key } = data;

    dispatch({
      type: AUTH_SUCCESS,
      payload: key,
    });
    dispatch(fetchUser());
  } catch (error) {
    const errors = error.response.data;
    let formErrors = {};

    for (const key in errors) formErrors[key] = errors[key][0];

    setFormErrors({ ...formErrors });
  }
};

export const updateUser = (data, setSuccessMessage) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);

    if (data.profile_image)
      formData.append("profile_image", data.profile_image);

    const payloadData = await api.updateUser(formData);
    dispatch({
      type: FETCH_USER,
      payload: payloadData.data,
    });
    setSuccessMessage("Profile Updated!");
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await api.logout();
    console.log(data.detail);

    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};
