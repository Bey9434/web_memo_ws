module.exports = {
  presets: [
    "@babel/preset-env", // 最新のJavaScriptをサポート
    ["@babel/preset-react", { runtime: "automatic" }], // JSXの自動トランスパイル
  ],
};
