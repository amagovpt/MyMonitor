import axios from "axios";
// import dataJSON from '../utils/data.json'

export const api = axios.create({
  baseURL: "http://10.55.37.16:/api2",
});


export const login = async (user, pass) => {
  let err
  const response = await api.post("/auth/login", {type: "myMonitor", username: user, password: pass})
  .catch(function (error) {
    err = error;
  })

  return {response, err}
}

export const logout = async () => {
  let err
  const response = await api.post("/auth/logout")
  .catch(function (error) {
    err = error;
  })

  return {response, err}
}

export const getUserData = async () => {
  let err
  const response = await api.get("/website/myMonitor")
  .catch(function (error) {
    err = error;
  })

  return {response, err}
}

export const getUserWebsite = async (website) => {
  let err
  const response = await api.get(`/page/myMonitor/website/${website}`)
  .catch(function (error) {
    err = error;
  })

  return {response, err}
}