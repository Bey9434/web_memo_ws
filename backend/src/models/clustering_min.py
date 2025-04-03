# clustering_min.py

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import AgglomerativeClustering
import json
from sklearn.metrics.pairwise import cosine_similarity

from collections import defaultdict
from sentence_transformers import SentenceTransformer
import numpy as np
from sentence_transformers import models

import matplotlib.pyplot as plt
from sklearn.decomposition import PCA

from clustering_db_handler import update_cluster_id

# 仮のメモデータ
memos = [
    {"id": 1, "text": "魚介系のスープが効いていたラーメン"},
    {"id": 2, "text": "塩ラーメンのスープが透き通っていた"},
    {"id": 3, "text": "辛味噌ラーメンにチャーシューが合う"},
    {"id": 4, "text": "家系ラーメンを久々に食べた"},
    {"id": 5, "text": "味噌ラーメンが最高だった"},
    {"id": 6, "text": "つけ麺のコシが良かった"},
    {"id": 7, "text": "人間の存在意義について考えた"},
    {"id": 8, "text": "生きる意味は主観的かもしれない"},
    {"id": 9, "text": "自由意志とは幻想なのか"},
    {"id": 10, "text": "社会的役割にアイデンティティは縛られるのか"},
    {"id": 11, "text": "倫理は文化によって相対的か"},
    {"id": 12, "text": "死後の世界は科学で説明できるのか"},
    {"id": 13, "text": "Pythonは学習コストが低く人気"},
    {"id": 14, "text": "ReactはUI開発に強い"},
    {"id": 15, "text": "Webのトレンドは常に変化する"},
    {"id": 16, "text": "バックエンドとフロントの分離が重要"},
    {"id": 17, "text": "Dockerでの環境構築が簡単になった"},
    {"id": 18, "text": "アルゴリズムの設計が難しい"},
    {"id": 19, "text": "今日は雨だったので家で読書した"},
    {"id": 20, "text": "最近、睡眠の質が悪い"},
    {"id": 21, "text": "断捨離をして部屋がすっきりした"},
    {"id": 22, "text": "散歩中に猫を見かけた"},
    {"id": 23, "text": "朝食にパンとコーヒーをとった"},
    {"id": 24, "text": "夜更かしが続いて体調が悪い"},
    {"id": 25, "text": "失敗から学ぶ姿勢が大事だと思った"},
    {"id": 26, "text": "自己肯定感が下がっている"},
    {"id": 27, "text": "やる気が出ない原因を考えていた"},
    {"id": 28, "text": "目標を持たないと日々流される"},
    {"id": 29, "text": "小さな成功体験を積み上げたい"},
    {"id": 30, "text": "感情を言語化することは難しい"},
    {"id": 31, "text": "火星探査機の打ち上げに成功した"},
    {"id": 32, "text": "株価が急上昇し経済に影響を与えた"},
    {"id": 33, "text": "日本の伝統芸能である歌舞伎を観賞した"},
    {"id": 34, "text": "オーロラが見える北欧への旅行を計画している"},
    {"id": 34, "text": "胎児よ退治よなぜ踊る。母親の心がわかって恐ろしいのか。ではじまる小説は夢野久作のドグラマグラです"}
]
# TF-IDFベクトル化
texts = [m["text"] for m in memos]

# ransformer モデルを指定
bert = models.Transformer("cl-tohoku/bert-base-japanese-v3")

# プーリング層を追加
pooling = models.Pooling(
    bert.get_word_embedding_dimension(),
    pooling_mode_mean_tokens=True
)

# 3. SentenceTransformer として統合
model = SentenceTransformer(modules=[bert, pooling])


embeddings = model.encode(texts)

clustering = AgglomerativeClustering(
    n_clusters=None, distance_threshold=0.2, metric='cosine',      # cosine 類似度で距離計算
    linkage='average'
)
labels = clustering.fit_predict(embeddings)

# group_id をメモに追加
for i, label in enumerate(labels):
    memos[i]["cluster_id"] = int(label) + 1  # 1から始まるIDにする

# クラスタリング結果をデータベースに保存
for m in memos:
    update_cluster_id(m["id"], m["cluster_id"])



# 結果をJSONで出力
print(json.dumps(memos, ensure_ascii=False, indent=2))
sim = cosine_similarity(embeddings)
print("\n📊 類似度行列（cosine similarity）:")
for row in sim:
    print(["{0:.2f}".format(val) for val in row])

print("\n📌 各クラスタの代表キーワード（TF-IDF）:")


# クラスタごとのメモをまとめる
clustered = defaultdict(list)
for m in memos:
    clustered[m["cluster_id"]].append(m["text"])

# クラスタごとに出力
for gid, texts in clustered.items():
    print(f"\n🧠 Group {gid} ({len(texts)}件)")
    for t in texts:
        print(f" - {t}")

# PCAで次元を2に圧縮
pca = PCA(n_components=2)
reduced = pca.fit_transform(embeddings)

# group_idごとに色分けしてプロット
plt.figure(figsize=(10, 6))
for gid in set(labels):
    idx = [i for i, l in enumerate(labels) if l == gid]
    plt.scatter(reduced[idx, 0], reduced[idx, 1], label=f'Group {gid}', alpha=0.6)

# ラベルつけて表示
plt.title("🧠 クラスタリング結果の2次元プロット（PCA）")
plt.xlabel("主成分1")
plt.ylabel("主成分2")
plt.legend()
plt.grid(True)
plt.tight_layout()
plt.show()
