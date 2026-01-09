import axios from "axios";

export async function getRecommendation() {
  const res = await axios.get("/api/recommendation");
  if (!res.data.success) throw new Error("Fetch failed");
  return res.data;
}

export async function getNewRelease(size = 10) {
  const res = await axios.get(`/api/new-release?pageSize=${size}`);
  if (!res.data.success) throw new Error("Fetch failed");
  return res.data;
}

export async function getPopularRanking() {
  const res = await axios.get("/api/popular");
  if (!res.data.success) throw new Error("Fetch failed");
  return res.data;
}

export async function getDramaDetail(bookId: string) {
  if (!bookId) throw new Error("bookId is required");
  const res = await axios.get(`/api/detail?bookId=${bookId}`);
  if (!res.data?.success) throw new Error("Fetch failed");
  return res.data.data;
}
