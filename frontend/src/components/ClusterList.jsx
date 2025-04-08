export function ClusterList({ clusters, onRename, onDelete }) {
  return (
    <ul>
      {clusters.map((c) => (
        <li key={c.id}>
          {c.name} ({c.origin})
          {c.origin === "manual" && (
            <>
              <button
                onClick={() => {
                  const newName = prompt("新しいクラスタ名", c.name);
                  if (newName) onRename(c.id, newName);
                }}
              >
                編集
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`クラスタ「${c.name}」を削除しますか？`)) {
                    onDelete(c.id);
                  }
                }}
              >
                削除
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
