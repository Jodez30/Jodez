import { onRequestGet as __api_profiles_js_onRequestGet } from "/agent/repos/Jodez/secret-santa/functions/api/profiles.js"
import { onRequestOptions as __api_profiles_js_onRequestOptions } from "/agent/repos/Jodez/secret-santa/functions/api/profiles.js"
import { onRequestOptions as __api_submit_js_onRequestOptions } from "/agent/repos/Jodez/secret-santa/functions/api/submit.js"
import { onRequestPost as __api_submit_js_onRequestPost } from "/agent/repos/Jodez/secret-santa/functions/api/submit.js"

export const routes = [
    {
      routePath: "/api/profiles",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_profiles_js_onRequestGet],
    },
  {
      routePath: "/api/profiles",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_profiles_js_onRequestOptions],
    },
  {
      routePath: "/api/submit",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_submit_js_onRequestOptions],
    },
  {
      routePath: "/api/submit",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_submit_js_onRequestPost],
    },
  ]