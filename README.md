# Zettly

Zettly is a cross-platform note-taking application built with Tauri, React, and TypeScript, using Vite as the build tool. It allows users to create, edit, organize, and export notes in various formats, including Markdown and a custom `.zet` format. The app features a modern UI, supports rich content blocks (text, images, code, tables, etc.), and provides a canvas for drawing and visual notes.

## Features

- **Multi-format Notes**: Create and manage notes with support for text, images, videos, code blocks, tables, and more.
- **Export Options**: Export notes as Markdown or `.zet` files for easy sharing or backup.
- **Canvas Editor**: Draw and export visual notes in PNG, JPG, SVG, or JSON formats.
- **Modern UI**: Responsive and visually appealing interface with smooth animations.
- **Local Storage**: Notes are stored locally using Tauri’s secure file APIs.
- **Cross-platform**: Runs as a desktop app on Windows, macOS, and Linux via Tauri.

## Main Technologies

- **Tauri**: For building secure, lightweight desktop applications.
- **React + TypeScript**: For the frontend UI and logic.
- **Vite**: Fast development and build tool.
- **Editor.js**: Block-style editor for rich content editing.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Lucide Icons**: Icon set for UI elements.

## Project Structure

- containers: Main app views (Editor, Canvas, MarkdownView, ViewNotes).
- manageNotes.ts: Handles note storage, export, and parsing logic.
- extensions: Custom Editor.js block extensions (image, video, code, etc.).
- components: UI components (buttons, dialogs, etc.).
- src-tauri: Tauri backend configuration and Rust source.

## How It Works

- Users can create and edit notes using a block-based editor.
- Notes are saved locally in a secure directory.
- Notes can be exported as Markdown or `.zet` files.
- The Canvas view allows drawing and exporting visual notes.
- The Markdown view provides a live preview/editor for Markdown files.

## Views

![(1)](https://github.com/user-attachments/assets/671b2ca2-52f9-4528-8edc-f23d9fd9d246)
![(5)](https://github.com/user-attachments/assets/91465b81-39fc-47b8-8173-b829522c8a2b)
![(4)](https://github.com/user-attachments/assets/3b9ee1c7-bbb1-4067-ae97-6291222deec5)
![(3)](https://github.com/user-attachments/assets/267aa26e-d23b-4c4e-91cb-8bb4ce83a7f1)
![(2)](https://github.com/user-attachments/assets/385dc8ee-80b5-49c6-bfe0-d0ca5807e93d)


## Getting Started


1. **Install dependencies**:
   ```sh
   npm install
   ```
2. **Run the app in development**:
   ```sh
   npm run tauri dev
   ```
3. **Build for production**:
   ```sh
   npm run tauri build
   ```

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) with:
  - [Tauri Extension](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
  - [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

---
