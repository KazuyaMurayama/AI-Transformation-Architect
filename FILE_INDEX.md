# FILE_INDEX.md — AI-Transformation-Architect

> **新セッション開始時に必ずこのファイルを読む。**
> ファイル追加・削除・移動時は必ずこのファイルを更新すること。
> 最終更新: 2026-04-30

## 概要
AI変革アーキテクトのQ&Aドキュメント生成・比較システム。PatternA/B、PersonaBの複数パターンのQ&AをWordファイルとして出力する。

**スタック:** JavaScript, Node.js

---

## 📋 最初に読むべきファイル

| 優先度 | ファイル | 内容 |
|---|---|---|
| ★★★ | `ai_architect_qa_instructions.md` | Q&A作成指示・ガイドライン |
| ★★★ | `create_qa_document.js` | Q&Aドキュメント生成（PatternA） |
| ★★ | `qa_data.js` | Q&Aデータ（PatternA） |
| ★★ | `qa_comparison.js` | パターン比較スクリプト |

---

## 🗂️ ディレクトリ構造

```
AI-Transformation-Architect/
├── ai_architect_qa_instructions.md ← Q&A指示書
├── create_qa_document.js           ← 生成スクリプト（PatternA）
├── create_qa_document_patternB.js  ← 生成スクリプト（PatternB）
├── qa_comparison.js                ← パターン比較
├── qa_data.js                      ← Q&Aデータ（PatternA）
├── qa_data_patternB.js             ← Q&Aデータ（PatternB）
├── qa_data_personaB.js             ← Q&Aデータ（PersonaB）
├── AI_Architect_QA_Guide.docx      ← 生成済みWord（PatternA）
├── AI_Architect_QA_PatternB.docx   ← 生成済みWord（PatternB）
└── package.json
```

---

## 📑 全ファイル一覧

| パス | 種別 | 説明 |
|---|---|---|
| `ai_architect_qa_instructions.md` | ドキュメント | Q&A作成指示・ガイドライン |
| `create_qa_document.js` | JavaScript | Q&AドキュメントWord生成（PatternA） |
| `create_qa_document_patternB.js` | JavaScript | Q&AドキュメントWord生成（PatternB） |
| `qa_comparison.js` | JavaScript | パターン間比較スクリプト |
| `qa_data.js` | JavaScript | Q&Aデータ定義（PatternA） |
| `qa_data_patternB.js` | JavaScript | Q&Aデータ定義（PatternB） |
| `qa_data_personaB.js` | JavaScript | Q&Aデータ定義（PersonaB） |
| `AI_Architect_QA_Guide.docx` | 資料 | 生成済みQ&AガイドWord（PatternA） |
| `AI_Architect_QA_PatternB.docx` | 資料 | 生成済みQ&AガイドWord（PatternB） |
| `package.json` | 設定 | Node.js依存関係 |

---

## 🔖 ファイル更新ルール

1. 新ファイル追加時: 該当セクションに1行追加
2. ファイル削除・移動時: 該当行を削除または更新
3. 更新後: `git add FILE_INDEX.md && git commit -m "docs: FILE_INDEX.md更新"`
