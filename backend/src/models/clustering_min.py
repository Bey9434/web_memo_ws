# backend/src/models/clustering_min.py
import json
from sentence_transformers import SentenceTransformer, models
from sklearn.cluster import AgglomerativeClustering
from clustering_db_handler import get_all_memos, update_cluster_id


# 省略: memos の取得部分を直接リストで用意
memos =  get_all_memos() 

# BERT モデルとクラスタリング
bert = models.Transformer("cl-tohoku/bert-base-japanese-v3")
pooling = models.Pooling(bert.get_word_embedding_dimension(), pooling_mode_mean_tokens=True)
model = SentenceTransformer(modules=[bert, pooling])
embeddings = model.encode([m["text"] for m in memos])

clustering = AgglomerativeClustering(
    n_clusters=None,
    distance_threshold=0.2,
    metric="cosine",
    linkage="average"
)
labels = clustering.fit_predict(embeddings)

# 4) 結果を DB に書き込む & JSON 用にまとめる
results = []
for m, label in zip(memos, labels):
    cid = int(label)
    # DB 更新
    update_cluster_id(m["id"], cid)
    results.append({"id": m["id"], "cluster_id": cid})

# 5) JSON のみを出力
print(json.dumps(results, ensure_ascii=False))