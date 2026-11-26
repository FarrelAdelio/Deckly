<div align="center">

# aku mau yang seperti ini untuk overlay ku
<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    
    <linearGradient id="glass-bg" x1="20" y1="20" x2="236" y2="236" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#A5D8FF" stop-opacity="0.45" />
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#FFD8A8" stop-opacity="0.4" />
    </linearGradient>

    
    <linearGradient id="glass-border" x1="20" y1="20" x2="236" y2="236" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9" />
      <stop offset="40%" stop-color="#FFFFFF" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.75" />
    </linearGradient>

    
    <linearGradient id="card-fill" x1="60" y1="56" x2="196" y2="200" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#F1F3F5" stop-opacity="0.8" />
    </linearGradient>

    
    <filter id="drop-shadow" x="10" y="14" width="236" height="236" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000000" flood-opacity="0.15" />
    </filter>
  </defs>

  
  <g filter="url(#drop-shadow)">
    <rect x="24" y="24" width="208" height="208" rx="48" fill="url(#glass-bg)" />
    <rect x="25.5" y="25.5" width="205" height="205" rx="46.5" stroke="url(#glass-border)" stroke-width="3" />
  </g>

  
  <ellipse cx="128" cy="30" rx="56" ry="6" fill="#FFFFFF" fill-opacity="0.45" />

  
  <g>
    <rect x="64" y="62" width="128" height="26" rx="13" fill="url(#card-fill)" />
    <path d="M77 75.5L81 79.5L88.5 71" stroke="#495057" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" />
    <rect x="98" y="72.5" width="44" height="5" rx="2.5" fill="#868E96" />
  </g>

  
  <g>
    <rect x="64" y="97" width="128" height="26" rx="13" fill="url(#card-fill)" />
    <rect x="78" y="107.5" width="52" height="5" rx="2.5" fill="#868E96" />
  </g>

  
  <g>
    <rect x="64" y="132" width="94" height="26" rx="13" fill="url(#card-fill)" />
    <rect x="78" y="142.5" width="42" height="5" rx="2.5" fill="#868E96" />
    
    
    <rect x="164" y="132" width="28" height="26" rx="13" fill="url(#card-fill)" />
    <path d="M178 140V150M173 145H183" stroke="#495057" stroke-width="3" stroke-linecap="round" />
  </g>

  
  <g>
    <rect x="64" y="167" width="128" height="26" rx="13" fill="url(#card-fill)" />
    <rect x="78" y="177.5" width="52" height="5" rx="2.5" fill="#868E96" />
  </g>
</svg> Deckly

**A simple, tidy, and comfortable taskboard in your Chrome side panel.**

</div>

---

## Features

### Built for Side-Panel Productivity

- **Clean Side-Panel Taskboard** — Keep your tasks organized right beside your active browser tab without cluttering your main workspace.
- **Fast & Lightweight** — Designed to stay responsive and distraction-free while you browse, research, or work.
- **Native Chrome Integration** — Built using Chrome Extensions Manifest V3 and the Side Panel API for seamless everyday use.

---

## Installation

Follow these steps to install **Deckly** locally in Google Chrome:

1. **Download ZIP**
   - Open the repository at `https://github.com/FarrelAdelio/Deckly`.
   - Click the green **`<> Code`** button and select **Download ZIP**.

2. **Extract All**
   - Locate the downloaded `.zip` archive on your computer.
   - Right-click the file and select **Extract All...** (or extract it to a folder of your choice).

3. **Open Chrome Extensions**
   - Open Google Chrome and go to `chrome://extensions/` in the address bar.
   - Turn on **Developer mode** using the toggle in the top-right corner.

4. **Load unpacked**
   - Click **Load unpacked** in the top-left corner.
   - Select the extracted **`Deckly`** folder (the folder containing `manifest.json`).


> [!NOTE]
> Make sure you select the inner **`Deckly`** folder containing `manifest.json` rather than a parent wrapper folder if Chrome reports a missing manifest.

<details>
<summary>Uninstall</summary>

1. Go to `chrome://extensions/`.
2. Find **Deckly** in your extensions list and click **Remove**.
3. Confirm removal in the dialog prompt.

</details>

---

## Usage

- Open the **Side panel** in Google Chrome and select **Deckly** from the side panel switcher.
- Manage your daily tasks directly from the side panel while keeping your current page visible.

---

## Project Structure

```text
Deckly/
├── icons/          # Extension icons
├── background.js   # Background service worker
├── manifest.json   # Chrome extension manifest
├── sidepanel.css   # Side panel styles
├── sidepanel.html  # Side panel markup
├── sidepanel.js    # Side panel logic
└── README.md       # Project documentation
