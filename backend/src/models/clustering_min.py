# clustering_min.py

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import AgglomerativeClustering
import json
from sklearn.metrics.pairwise import cosine_similarity
import MeCab


# MeCab Taggerオブジェクトを作成
mecab = MeCab.Tagger()

# 分かち書き用の関数定義
def tokenize(text):
    tagger = MeCab.Tagger("-Owakati")
    return tagger.parse(text).strip()

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
    {"id": 30, "text": "感情を言語化することは難しい"}
]
# TF-IDFベクトル化
texts = [tokenize(m["text"]) for m in memos]
vectorizer = TfidfVectorizer(ngram_range=(1, 2))
X = vectorizer.fit_transform(texts)

# 階層クラスタリング（距離しきい値で自動グループ化）
clustering = AgglomerativeClustering(
    n_clusters=None,              # 自動でクラスタ数を決定
    distance_threshold=0.85,       # しきい値（小さいほど分かれる）
    metric='cosine',
    linkage='average'
)
labels = clustering.fit_predict(X.toarray())

# group_id をメモに追加
for i, label in enumerate(labels):
    memos[i]["group_id"] = int(label)

# 結果をJSONで出力
print(json.dumps(memos, ensure_ascii=False, indent=2))
sim = cosine_similarity(X.toarray())
print("\n📊 類似度行列（cosine similarity）:")
for row in sim:
    print(["{0:.2f}".format(val) for val in row])

