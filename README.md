# 校園密室逃脫｜消失的鑰匙

這是完整可上傳 GitHub / Vercel 的版本，已包含：

- index.html：主遊戲網頁
- images/classroom-bg.png：背景圖
- audio/bg-music.mp3：背景音樂
- api/log.js：將前端紀錄轉送到 Google Apps Script
- api/feedback.js：AI 回饋 API（可選）
- google_apps_script/Code.gs：Google Apps Script 試算表接收程式
- vercel.json：Vercel 設定

## 檔案結構

```text
campus_escape_room_complete/
├─ index.html
├─ README.md
├─ vercel.json
├─ api/
│  ├─ feedback.js
│  └─ log.js
├─ images/
│  └─ classroom-bg.png
├─ audio/
│  └─ bg-music.mp3
└─ google_apps_script/
   └─ Code.gs
```

## 讓資料寫入 Google 試算表

1. 建立 Google 試算表，複製試算表 URL。
2. 到 Google Apps Script，貼上 `google_apps_script/Code.gs`。
3. 把 Code.gs 內的 `SPREADSHEET_URL` 換成你的試算表 URL。
4. 部署為「網頁應用程式」。
5. 權限設定：
   - 執行身分：我
   - 誰可以存取：任何人
6. 複製 Web App URL。
7. 到 Vercel → Project → Settings → Environment Variables 加入：

```text
GAS_URL=你的 Google Apps Script Web App URL
```

## AI 回饋（可選）

若要使用 AI 回饋，到 Vercel Environment Variables 加入：

```text
AI_KEY=你的 OpenRouter API Key
```
