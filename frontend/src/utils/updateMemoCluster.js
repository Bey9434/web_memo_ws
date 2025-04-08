/**
 * メモのクラスタIDを更新するAPI通信関数
 * @param {number} id - 更新対象のメモID
 * @param {number} cluster_id - 新しいクラスタID
 * @returns {Promise<object>} - APIレスポンス
 */
export async function updateMemoCluster(id, cluster_id) {
  const response = await fetch(
    `http://localhost:3001/api/memos/${id}/cluster`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cluster_id }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "クラスタIDの更新に失敗しました");
  }

  return data;
}
