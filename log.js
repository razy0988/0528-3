// api/log.js
// 用途：接收前端資料，並可選擇轉送到 Google Apps Script。
// 若你有 GAS Web App URL，請在 Vercel Environment Variables 設定：GAS_URL

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Only POST is allowed." });
  }

  try {
    const data = req.body || {};
    const gasUrl = process.env.GAS_URL;

    // 沒有設定 GAS_URL 時，也先回傳成功，避免前端壞掉。
    if (!gasUrl) {
      return res.status(200).json({
        ok: true,
        mode: "local-only",
        message: "資料已送到 Vercel API，但尚未設定 GAS_URL，因此沒有寫入試算表。",
        data
      });
    }

    const gasResponse = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const text = await gasResponse.text();

    return res.status(200).json({
      ok: true,
      mode: "gas-forwarded",
      message: "資料已轉送到 Google Apps Script。",
      gasStatus: gasResponse.status,
      gasText: text
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "寫入紀錄時發生錯誤。",
      error: error.message
    });
  }
};
