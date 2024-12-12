/**
 * 共通エラーハンドリング関数
 * @param {Object} res - Expressのレスポンスオブジェクト
 * @param {Error} err - エラーオブジェクト
 * @param {number} statusCode - HTTPステータスコード (デフォルト: 500)
 * @param {string} message - エラーメッセージ (デフォルト: "An error occurred")
 */

const error_handler = (
  res,
  err,
  statusCode = 500,
  message = "An error occurred"
) => {
  console.error("Error:", err.message || err);
  res.status(statusCode).json({ error: message });
};

/*使い方
error_handler(res,new Error(""),ステータスコード,"エラーメッセージ"
*/
module.exports = { error_handler };
