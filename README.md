
# 業務管理ダッシュボード


Next.js と NestJS を使用して開発する、ウェブベースの業務管理ダッシュボードです。

フロントエンドとバックエンドを分離した構成で、REST API を通じて案件情報を取得・表示する機能を実装しています。今後、データベース連携や業務管理機能の拡張を予定しています。

## 主な機能

- 案件一覧の表示
- NestJS REST API によるデータ取得
- Next.js による画面の構築
- 通信エラーの検知とエラーメッセージの表示

## 使用技術

| 分類 | 技術 |
|---|---|
| 画面側 | Next.js、React、TypeScript |
| サーバー側 | NestJS、Node.js、TypeScript |
| 通信方式 | REST API、JSON |
| 開発環境 | npm |

## フォルダ構成

```text
business-dashboard/
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── app.controller.ts
│   │   ├── app.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
└── README.md
```

※ 実際のフォルダ構成に合わせて適宜更新してください。

## 動作環境

- Node.js
- npm

## 導入手順

### 1. リポジトリの取得

```bash
git clone <リポジトリURL>
cd business-dashboard
```

### 2. サーバー側の起動

```bash
cd backend
npm install
npm run start:dev
```

API サーバーは、ポート `3001` で起動します。

### 3. 画面側の起動

別のターミナルを開き、`frontend` フォルダで以下のコマンドを実行します。

```bash
cd frontend
npm install
npm run dev
```

開発用サーバーは、通常ポート `3000` で起動します。

## API 仕様

### 案件一覧の取得

| 項目 | 内容 |
|---|---|
| 通信方式 | GET |
| 接続先 | `/api/projects` |
| 接続先 URL | `http://localhost:3001/api/projects` |
| 応答形式 | JSON |

応答例：

```json
[
  {
    "id": 1,
    "name": "倉庫管理Webアプリ",
    "status": "進行中"
  },
  {
    "id": 2,
    "name": "配送管理Webアプリ",
    "status": "完了"
  },
  {
    "id": 3,
    "name": "部品物流ポータル",
    "status": "計画中"
  }
]
```

## システム構成と処理の流れ

1. 利用者が画面にアクセスします。
2. 画面側がサーバー側の REST API にリクエストを送信します。
3. コントローラーがリクエストを受け付け、サービスを呼び出します。
4. サービスが案件情報を返します。
5. API が JSON 形式でデータを返し、画面側が案件一覧を表示します。

## 今後の開発予定

- PostgreSQL によるデータの永続化
- Prisma によるデータベース操作
- 案件の登録・編集・削除機能
- 入力フォームと入力内容の検証
- 読み込み中の表示とエラー処理の改善
- 利用者認証とアクセス権限の管理
- 自動テストの整備

## 利用条件

現在、利用条件は未設定です。公開時には、必要に応じてライセンスを設定します。
