<div align="center">

# 📋 Deckly

**A simple, tidy, and comfortable taskboard in your Chrome side panel.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-4285F4?logo=googlechrome&logoColor=white)](#compatibility)
[![Status](https://img.shields.io/badge/Status-Active-success)](#features)

[Features](#features) · [Installation](#installation) · [Usage](#usage) · [Project Structure](#project-structure) · [Compatibility](#compatibility)

</div>

<p align="center">
  <img src="assets/hero-banner.png" alt="Deckly taskboard running inside the Google Chrome side panel" width="100%" />
</p>

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

   <p align="center">
     <img src="assets/download-zip.png" alt="Click Code and select Download ZIP on GitHub" width="100%" />
   </p>

2. **Extract All**
   - Locate the downloaded `.zip` archive on your computer.
   - Right-click the file and select **Extract All...** (or extract it to a folder of your choice).

3. **Open Chrome Extensions**
   - Open Google Chrome and go to `chrome://extensions/` in the address bar.
   - Turn on **Developer mode** using the toggle in the top-right corner.

4. **Load unpacked**
   - Click **Load unpacked** in the top-left corner.
   - Select the extracted **`Deckly`** folder (the folder containing `manifest.json`).

   <p align="center">
     <img src="assets/load-unpacked.png" alt="Click Load unpacked on chrome://extensions/" width="100%" />
   </p>

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
