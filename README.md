# yuitopia

あかつきゆいとのポートフォリオ。React + TypeScript + Vite の静的 SPA。SSR・API サーバーは不要です。

## 開発

```sh
bun install --frozen-lockfile
bun run dev
bun run lint
bun run build
bun run preview
```

## ページと言語

Home / Works / About / Contact。日本語・英語に対応。`#/ja/works`、`#/en/about` のようなハッシュ URL でページと言語を保持するため、GitHub Pages 上で直接アクセス・再読み込み・戻る操作が可能です。未知の URL は日本語 Home にフォールバックします。

作品・経歴・SNS・プロフィールは `src/content.ts`、表示と UI の翻訳は `src/App.tsx`。Works は新しい日付順で登録します。既存の Linkle / Cilium 画像を使用し、他のサムネイルは CSS によるタイポグラフィです。追加写真に差し替える場合は `Artwork` を編集してください。

Noto Sans JP は Google Fonts から読み込みます（オフライン時は sans-serif）。

## GitHub Pages

1. GitHub リポジトリの Settings → Pages → Source を GitHub Actions に設定。
2. Actions → Deploy GitHub Pages → Run workflow を実行。

ビルド成果物は `dist/`。`base: './'` なのでユーザーサイト・リポジトリ配下の両方で利用できます。公開は手動実行のみ。旧 Docker 配信 workflow は無効化済みです。旧 Next.js 設定と未使用のアニメーションコンポーネントは `old/legacy/` に保管しています。

SPA のためページ本文はブラウザで描画されます。ページ別の検索エンジン／SNS メタデータの静的生成は行いません。

## 画像と経歴

`src/assets/img/me/icon.png` をプロフィールに、`works/UniPro_black.png` をUniProjectに、`works/seccamp_forum_award_unique.JPG` を受賞活動に使用しています。セキュリティ・キャンプ修了日は2025年8月16日、2025年大会として確認済みです。
