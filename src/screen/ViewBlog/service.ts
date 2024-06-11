import { API_PATH } from "@/src/request/api.request";
import request from "@/src/request/request";

export const getBlogSlugDetail = (id: any) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4YmZhMTliZS1kNDBkLTQ2MTYtYjQyMC02ZmYwNGNlNjMzYzAiLCJpYXQiOjE3MTgwMTY3MTEsImV4cCI6MTcxODYyMTUxMX0.qEwSKq7azc3pClC9rPG4Mmd8fS2PLt_x9GI18YyxWBk";
    const url = token ? `${API_PATH.BLOG}/slug/auth/${id}` : `${API_PATH.BLOG}/slug/${id}`;
    return request({
      path: url,
      method: "GET",
    });
  };