import axios from "axios";

export function fetchChats(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/chat/${id}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function createChat(data) {
  return axios.post("/chat", data);
}
 