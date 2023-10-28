export function fetchAllPosts() {
  return new Promise(async (resolve) => {
    const response = await fetch("/post/");
    const data = await response.json();
    resolve({ data });
  });
} 
export function fetchPostByID(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/post/${id}`);
    const data = await response.json();
    resolve({ data });
  });
}
