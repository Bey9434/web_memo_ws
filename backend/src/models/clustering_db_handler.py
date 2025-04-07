import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "../db/database.sqlite")

def update_cluster_id(memo_id: int, cluster_id: int):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("UPDATE memos SET cluster_id = ? WHERE id = ?", (cluster_id, memo_id))
    conn.commit()
    conn.close()

def get_all_memos():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("SELECT id, content FROM memos")
    rows = cur.fetchall()
    conn.close()
    # rows: [(1, "text1"), (2, "text2"), ...]
    return [{"id": row[0], "text": row[1]} for row in rows]
