import axios from "axios";

import loginResponse from '../utils/httpResponses/login.json'
import logoutResponse from '../utils/httpResponses/logout.json'
import websitesResponse from '../utils/httpResponses/websites.json'
import websiteResponse from '../utils/httpResponses/website.json'
import removedPages from '../utils/httpResponses/removedPages.json'
import reEvaluatePages from '../utils/httpResponses/re-evaluatePage.json'


export const apiE = axios.create({
  baseURL: "http://10.55.37.16:/api",
});

const apiCalls = {
  
  async login(user, pass) {
    let err
    const response = await apiE.post("/auth/login", {type: "monitor", username: user, password: pass})
    .catch(function (error) {
      err = error;
    })
  
    return {response, err}
  },
      
  async logout() {
    let err
    const token = localStorage.getItem('MM-SSID');
    const response = await apiE.post("/auth/logout", {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .catch(function (error) {
      err = error;
    })
  
    return {response, err}
  },
      
  async getUserData() {
    let err
    const token = localStorage.getItem('MM-SSID');
    const response = await apiE.get("/website/myMonitor", {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .catch(function (error) {
      err = error;
    })
  
    return {response, err}
  },
      
  async getUserWebsite(website) {
    let err
    const token = localStorage.getItem('MM-SSID');
    const response = await apiE.get(`/page/myMonitor/website/${website}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .catch(function (error) {
      err = error;
    })
  
    return {response, err}
  },

  async removePages(pages) {
    let err
    const token = localStorage.getItem('MM-SSID');
    const response = await apiE.post(`/page/myMonitor/remove`, pages, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .catch(function (error) {
      err = error;
    })
  
    return {response, err}
  },
  
  async reEvaluatePages(page) {
    let err
    const token = localStorage.getItem('MM-SSID');
    const response = await apiE.post(`/page/myMonitor/evaluate`, page, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .catch(function (error) {
      err = error;
    })

    return {response, err}
  },

  isUserLoggedIn() {
    const token = localStorage.getItem('MM-SSID');
    const expires = localStorage.getItem('expires-at');
    return token && new Date() < new Date(expires);
  }
}








const local = {
  async login(user, pass) {
    let err
    const response = loginResponse
    
    return {response, err}
  },
      
  async logout() {
    let err
    const response = logoutResponse
    
    return {response, err}
  },
      
  async getUserData() {
    let err
    const response = websitesResponse
    
    return {response, err}
  },
      
  async getUserWebsite(website) {
    let err
    const response = websiteResponse
    
    return {response, err}
  },

  async removePages(pages) {
    let err
    const response = removedPages

    return {response, err}
  },

  async reEvaluatePages(page) {
    let err
    const response = reEvaluatePages

    return {response, err}
  },

  isUserLoggedIn() {
    const token = localStorage.getItem('MM-SSID');
    const expires = localStorage.getItem('expires-at');
    return token && new Date() < new Date(expires);
  }
}




export const api = apiCalls;
// export const api = local;