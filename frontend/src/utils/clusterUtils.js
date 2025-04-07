export async function fetchClusters() {
  const res = await fetch("http://localhost:3001/api/clusters");
  if (!res.ok) throw new Error("Failed to fetch clusters");
  return res.json();
}

export async function createCluster(name) {
  const res = await fetch("http://localhost:3001/api/clusters", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to create cluster");
  return res.json();
}
