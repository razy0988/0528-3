# 校園密室逃脫｜消失的鑰匙

這是一個可直接上傳到 GitHub / Vercel 的版本，已包含背景圖片、Vercel 設定與 API。

## 檔案結構

```text
campus_escape_room/
├─ index.html
├─ README.md
├─ vercel.json
├─ api/
│  ├─ feedback.js
│  └─ log.js
└─ images/
   └─ classroom-bg.png
```

## Vercel Environment Variables

如果要使用 AI 回饋，請在 Vercel 設定：

```text
AI_KEY=你的 OpenRouter API Key
```

如果要寫入 Google 試算表，請另外設定：

```text
GAS_URL=你的 Google Apps Script Web App URL
```

若沒有設定 `AI_KEY` 或 `GAS_URL`，網頁仍可開啟，只是 AI 回饋或試算表寫入會使用備用模式。

## 使用方式

1. 將整個資料夾內的檔案上傳到 GitHub。
2. 到 Vercel 匯入這個 GitHub 專案。
3. 需要 AI 回饋時，到 Vercel 的 Environment Variables 加入 `AI_KEY`。
4. 需要寫入試算表時，到 Vercel 的 Environment Variables 加入 `GAS_URL`。
