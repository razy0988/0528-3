// api/feedback.js
// 用途：呼叫 OpenRouter，產生 AI 回饋。
// 請在 Vercel Environment Variables 設定：AI_KEY
// model 預設使用 openrouter/free

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
    const { studentInfo = {}, performance = {}, answers = [] } = req.body || {};
    const aiKey = process.env.AI_KEY;

    if (!aiKey) {
      return res.status(200).json({
        ok: true,
        mode: "fallback",
        feedback: "目前尚未設定 AI_KEY，因此先顯示基本回饋：你已完成任務，請再確認每一關的答題內容與密碼碎片是否完整。"
      });
    }

    const prompt = `
你是一位國小密室逃脫學習遊戲的老師。
請根據學生資料與闖關表現，寫一段溫暖、鼓勵、具體的學習回饋。
語氣要適合國小學生，約 100～180 字，不要使用太難的詞。

學生資料：
${JSON.stringify(studentInfo, null, 2)}

闖關表現：
${JSON.stringify(performance, null, 2)}

作答紀錄：
${JSON.stringify(answers, null, 2)}
`;

    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${aiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          { role: "system", content: "你是一位親切、具鼓勵性的國小老師。" },
          { role: "user", content: prompt }
        ]
      })
    });

    const result = await openRouterResponse.json();
    const feedback = result?.choices?.[0]?.message?.content || "AI 暫時沒有產生回饋，請稍後再試。";

    return res.status(200).json({
      ok: true,
      mode: "ai",
      feedback
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "產生 AI 回饋時發生錯誤。",
      error: error.message
    });
  }
};
