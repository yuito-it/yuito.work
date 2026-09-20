# yuitopia

My portfolio.

## Development

```sh
bun install --frozen-lockfile
bun run dev
bun run lint
bun run build
bun run preview
```

## OGP

`bun run build`（または `vite build`）で `scripts/ogp.ts` が1200×630のPNGを生成し、`dist/ogp-<内容ハッシュ>.png` として出力します。OGP・Twitter Card・canonicalタグも生成HTMLへ埋め込むため、JavaScriptを実行しないクローラーにも対応します。画像生成ライブラリとフォントはビルド専用で、ブラウザーのJSには含まれません。

公開URLの初期値は `https://yuito.work/`。変更する場合はプロジェクトルートの `.env.production.local` またはCIの環境変数に `SITE_URL=https://example.com/portfolio/` を指定してください。サブディレクトリを含む絶対URLに対応します。ハッシュルーティングのため全ページで共通OGPです。

画像のデザイン・コピーは `scripts/ogp.ts`、プロフィール画像は `src/assets/img/me/icon.png` を編集します。同梱フォントにより生成時のネットワーク接続とOSフォントへの依存はありません。画像の内容が変わるとファイル名も変わります（SNS側の投稿キャッシュ更新は各サービスに依存します）。
