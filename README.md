# AI Transformation Architect — 企業AI変革支援AIシステム

> 企業のAI変革（DX推進）を体系的に設計・支援するAIシステムです。

## 📋 概要

企業のAI変革（DX推進）を体系的に設計・支援するAIシステムです。現状診断→戦略立案→実装ロードマップ→KPI設計まで一気通貫でサポートし、AI Transformation Architect としての提案品質を高めます。

## ✨ 主な機能

- 企業AI成熟度の定量診断（5段階スコアリング）
- 業界別AI変革ロードマップ自動生成
- クイックウィン施策の自動抽出・優先順位付け
- 経営層向けビジネスケース作成支援
- 変革推進チームの組成・役割定義支援

## 🛠️ 技術スタック

| カテゴリ | 技術・ライブラリ |
|----------|----------------|
| 言語 | Python 3.10+ |
| AIフレームワーク | Claude API / LangChain |
| 出力形式 | Markdown, PowerPoint, PDF |
| フレームワーク | カスタムAIコンサルティングフレームワーク |

## 🚀 セットアップ

### 前提条件

- Python 3.9 以上
- APIキー（Claude / OpenAI 等）を `.env` ファイルに設定

### インストール

```bash
git clone https://github.com/KazuyaMurayama/AI-Transformation-Architect.git
cd AI-Transformation-Architect
pip install -r requirements.txt
```

### 環境設定

```bash
cp .env.example .env
# .env ファイルに必要なAPIキーを設定
```

## 💻 使い方

```bash
python advisor.py
```

## 👨‍💻 開発者情報

**男座員也（Kazuya Oza / おざ かずや）**

| | |
|---|---|
| GitHub | [@KazuyaMurayama](https://github.com/KazuyaMurayama) |
| 専門領域 | データサイエンス・生成AIコンサルタント |
| 主要スキル | Python, LightGBM, LangChain, RAG, Streamlit, React, TypeScript |
| 事業 | AIコンサルティング（月単価目標300万円）/ SaaS開発 / 定量投資 |

## 📄 ライセンス

© 2025 男座員也（Kazuya Oza）. All rights reserved.

---

> このリポジトリは **男座員也（Kazuya Oza）** が開発・管理しています。
> 命名・ドキュメント等での表記は必ず **男座員也** または **Kazuya Oza** を使用してください。
