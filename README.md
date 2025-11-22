
# 🎮 Save Game Backupper

![License](https://img.shields.io/badge/license-ISC-blue.svg)

A sleek, modern, and easy-to-use desktop application for automatically backing up your game saves. Never lose your progress again!

***

### ✨ Features

*   **📁 Simple Folder Selection:** Easily select your game's save folder and a destination for your backups.
*   **⏱️ Automated Backups:** Set a custom backup interval in seconds or minutes. The process runs automatically in the background.
*   **⏯️ Full Control:** A stylish, visible timer shows you when the next backup will occur. Pause and Resume the backup process at any time.
*   **🗄️ Organized Storage:** Each backup is stored in a neatly timestamped folder, ensuring no backups are ever overwritten.
*   **😎 Modern UI:** A clean, dark-mode interface that is responsive and scales with the window size.
*   **⚙️ Lightweight:** Built with Electron for cross-platform compatibility.

***

### 🚀 Getting Started

To run the Save Game Backupper on your local machine, follow these simple steps.

#### Prerequisites

You need to have [Node.js](https://nodejs.org/) and npm installed on your system.

#### Installation & Launch

1.  Clone this repository or download the source code.
2.  Navigate to the project directory in your terminal:
    ```sh
    cd GameSaveBackupper_Distribution
    ```
3.  Install the required dependencies:
    ```sh
    npm install
    ```
4.  Launch the application:
    ```sh
    npm start
    ```

***

### 🔧 How to Use

1.  Click **"Browse..."** for the "Source Folder" to select the directory where your game saves are located.
2.  Click **"Browse..."** for the "Output Folder" to select where you want the backups to be stored.
3.  Enter a number for the **Backup Interval** and select whether it's in `Minutes` or `Seconds`.
4.  Click **"Apply"**. The timer will start, and the first backup will be created immediately.
5.  Use the **"Pause"** and **"Resume"** buttons to control the backup process.

***

### 🛠️ Built With

*   [Electron](https://www.electronjs.org/)
*   [Node.js](https://nodejs.org/)
*   HTML/CSS/JavaScript
