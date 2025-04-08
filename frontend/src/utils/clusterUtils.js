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

export async function updateCluster(id, name) {
  const res = await fetch(`http://localhost:3001/api/clusters/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to update cluster");
  return res.json();
}

export async function deleteCluster(id) {
  const res = await fetch(`http://localhost:3001/api/clusters/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete cluster");
  return res.json();
}
