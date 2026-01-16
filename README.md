# Cloudflare Trace for Surge

A Surge script and module to display detailed Cloudflare CDN connection information on your dashboard.
一個適用於 Surge 的腳本與模組，用於在首頁面板顯示詳細的 Cloudflare CDN 連線資訊。

Check if your connection is routed through Cloudflare nodes and monitor WARP status in real-time.
即時確認目前的網路連線是否經過 Cloudflare 節點，以及 WARP 的連線狀態。

## ✨ Features / 功能特色

* **Detailed Node Info**: Displays Exit IP, Location (with Flag), and Data Center (Colo).
    **詳細節點資訊**：顯示出口 IP、地理位置（含國旗 Emoji）、資料中心代碼 (Colo)。
* **Protocol Detection**: Shows HTTP version, TLS version, SNI, and connection protocol.
    **連線協定偵測**：顯示 HTTP 版本、TLS 版本、SNI 以及連線協定。
* **WARP Status**: Automatically identifies WARP status (Off / On / Plus).
    **WARP 狀態監控**：自動識別 WARP 狀態（未啟用 / 已啟用 / Plus）。
* **Smart Retry**: Built-in timeout handling and automatic retry logic for stability.
    **智慧重試機制**：內建請求逾時處理與自動重試邏輯，確保資訊獲取穩定。
* **Localized**: Fully localized display with automatic time zone conversion (Asia/Taipei).
    **在地化顯示**：完全中文化的資訊顯示，並自動轉換時區為台北時間。

## 📸 Preview / 預覽

> *(Place your screenshot here / 請在此處放置截圖)*

## 🚀 Installation / 安裝方式

### Method 1: Install via Module (Recommended) / 方式一：使用模組安裝 (推薦)

**1. One-Click Install / 一鍵安裝** (Tap in Safari / 請在 Safari 點擊):
[▶️ Install to Surge](surge:///install-module?url=https://raw.githubusercontent.com/echoapus/Cloudflare-Trace-surge/main/cloudflare-trace.sgmodule)

**2. Copy Link / 複製連結**:
Copy the link below and paste it into Surge > Modules > Install New Module.
複製以下連結，在 Surge 的「模組 (Modules)」頁面選擇「安裝新模組」並貼上：

```url
[https://raw.githubusercontent.com/echoapus/Cloudflare-Trace-surge/main/cloudflare-trace.sgmodule](https://raw.githubusercontent.com/echoapus/Cloudflare-Trace-surge/main/cloudflare-trace.sgmodule)

