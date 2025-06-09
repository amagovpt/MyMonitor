import axios from "axios";

// AUTH
import loginResponse from '../utils/httpResponses/login.json'
import logoutResponse from '../utils/httpResponses/logout.json'

// WEBSITES
import websitesResponse from '../utils/httpResponses/websites.json'
import websiteResponse from '../utils/httpResponses/website.json'

// PAGES ACTIONS
import removedPages from '../utils/httpResponses/removedPages.json'
import reEvaluatePages from '../utils/httpResponses/re-evaluatePage.json'
import addPageCreate from '../utils/httpResponses/addPageCreate.json'
import addPageCrawl from '../utils/httpResponses/addPageCrawl.json'
import addPageCrawlCheck from '../utils/httpResponses/addPageCrawlCheck.json'
import addPageCrawlResults from '../utils/httpResponses/addPageCrawlResults.json'
import addPageCrawlDelete from '../utils/httpResponses/addPageCrawlDelete.json'
import addPageTransfer from '../utils/httpResponses/addPageTransfer.json'

// EVALUATION
import pageEvaluation from '../utils/httpResponses/pageEvaluation.json'

const baseURLDEV = process.env.REACT_APP_AMP_DEV_SERVER;
const baseURLPPR = process.env.REACT_APP_AMP_PPR_SERVER;
const baseURLPRD = process.env.REACT_APP_AMP_PRD_SERVER;

export const apiE = axios.create({
  baseURL: baseURLDEV,
});


apiE.interceptors.request.use((config) => {
  const token = localStorage.getItem('MM-SSID');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json"
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


const apiCalls = {
  
  async login(user, pass) {
    let err
    const response = await axios.post(baseURLDEV + "/auth/login", {type: "monitor", username: user, password: pass})
    .catch(function (error) {
      err = error;
    })
  
    return {response, err}
  },  
  async loginGov() {
    let err
    window.location.href = await axios.get(baseURLDEV + "/auth/login", {type: "monitor", username: user, password: pass})
    .catch(function (error) {
      err = error;
    })
  
    return {response, err}
  },

  async loginWithCC() {
    window.location.href = apiE.getUri() + "/auth/login";
  },

  async loginRedirect(url) {
    let err
    const response = await apiE.get(url)
    .catch(function (error) {
      err = error;
    })
  
    return {response, err}
  },
      
  async logout() {
    let err
    const token = localStorage.getItem('MM-SSID');
    const response = await apiE.post("/auth/logout", {})
    .catch(function (error) {
      err = error;
    })
  
    return {response, err}
  },
      
  async getUserData() {
    let err
    const token = localStorage.getItem('MM-SSID');
    const response = await apiE.get("/website/myMonitor")
    .catch(function (error) {
      err = error;
    })
  
    return {response, err}
  },
      
  async getUserWebsite(website) {
    let err
    const token = localStorage.getItem('MM-SSID');
    const response = await apiE.get(`/page/myMonitor/website/${website}`)
    .catch(function (error) {
      err = error;
    })
  
    return {response, err}
  },

  async getPageEvaluation(website, page) {
    let err
    const token = localStorage.getItem('MM-SSID');
    const response = await apiE.get(`/evaluation/myMonitor/${website}/${page}`)
    .catch(function (error) {
      err = error;
    })
    
    return {response, err}
  },

  async removePages(pages) {
    let err
    const token = localStorage.getItem('MM-SSID');
    const response = await apiE.post(`/page/myMonitor/remove`, pages)
    .catch(function (error) {
      err = error;
    })
  
    return {response, err}
  },
  
  async reEvaluatePages(page) {
    let err
    const token = localStorage.getItem('MM-SSID');
    const response = await apiE.post(`/page/myMonitor/evaluate`, page)
    .catch(function (error) {
      err = error;
    })

    return {response, err}
  },

  async addPageCreate(pages, startingUrl, website) {
    let err
    const stringifiedPages = JSON.stringify(pages)
    const token = localStorage.getItem('MM-SSID');
    const response = await apiE.post(`/page/myMonitor/create`, {pages: stringifiedPages, startingUrl, website})
    .catch(function (error) {
      err = error;
    })

    return {response, err}
  },

  async addPageCrawl(website) {
    let err
    const token = localStorage.getItem('MM-SSID');
    const response = await apiE.post(`/crawler/crawlUser`, {website: website})
    .catch(function (error) {
      err = error;
    })

    return {response, err}
  },

  async addPageCrawlCheck(website) {
    let err
    const token = localStorage.getItem('MM-SSID');
    const response = await apiE.post(`/crawler/crawlUserCheck`, {website: website})
    .catch(function (error) {
      err = error;
    })

    return {response, err}
  },

  async addPageCrawlResults(website) {
    let err
    const token = localStorage.getItem('MM-SSID');
    const response = await apiE.post(`/crawler/crawlUserResults`, {website: website})
    .catch(function (error) {
      err = error;
    })

    return {response, err}
  },

  async addPageCrawlDelete(website) {
    let err
    const token = localStorage.getItem('MM-SSID');
    const response = await apiE.post(`/crawler/crawlUserDelete`, {website: website})
    .catch(function (error) {
      err = error;
    })

    return {response, err}
  },

  async addPageTransfer(website) {
    let err
    const token = localStorage.getItem('MM-SSID');
    const response = await apiE.post(`/website/transferObservatoryPages`, {website: website})
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

  async loginWithCC() {

  },
  async loginGov() {
    window.location.href = "https://lbc-global.com"
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

  async getPageEvaluation(page) {
    let err
    const response = pageEvaluation
    
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

  async addPageCreate() {
    let err
    const response = addPageCreate

    return {response, err}
  },

  async addPageCrawl() {
    let err
    const response = addPageCrawl

    return {response, err}
  },

  async addPageCrawlCheck() {
    let err
    const response = addPageCrawlCheck

    return {response, err}
  },

  async addPageCrawlResults() {
    let err
    const response = addPageCrawlResults

    return {response, err}
  },

  async addPageCrawlDelete() {
    let err
    const response = addPageCrawlDelete

    return {response, err}
  },

  async addPageTransfer() {
    let err
    const response = addPageTransfer

    return {response, err}
  },

  isUserLoggedIn() {
    const token = localStorage.getItem('MM-SSID');
    const expires = localStorage.getItem('expires-at');
    return token && new Date() < new Date(expires);
  }
}



//export const api = apiCalls;
export const api = local;