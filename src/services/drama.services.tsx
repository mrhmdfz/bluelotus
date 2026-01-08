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
