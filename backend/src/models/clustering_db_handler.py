import sqlite3

def update_cluster_id(memo_id: int, cluster_id: int):
    conn = sqlite3.connect("../db/database.sqlite")
    cur = conn.cursor()
    cur.execute("UPDATE memos SET cluster_id = ? WHERE id = ?", (cluster_id, memo_id))
    conn.commit()
    conn.close()
