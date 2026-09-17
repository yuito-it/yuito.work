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


## アニメーション

GSAP 3.15 + `@gsap/react`。実装は `src/motion/` にまとめています。

- LP: 名前が文字ごとに立ち上がる（約0.7〜1秒）。ポインターを重ねると短い波。作品は視界に入ったタイミングで表示。
- Works: 見出しの文字演出と、タイムライン項目のスクロール出現。カテゴリ変更時は作品だけを再初期化。
- About: 見出し、画像・プロフィール、活動領域を段階的に表示。
- Contact: 見出し・メール・SNSを順に表示。リンクの矢印が軽く反応。

GSAP本体（CSSアニメーション機能を含む）とuseGSAPのみをimport。ScrollTrigger、SplitText等は不要なため追加していません。スクロール判定はグループ単位のIntersectionObserverで行い、表示した要素は監視を解除します。常時動くループ、スクロール乗っ取り、恒常的なwill-changeはありません。

`useGSAP`のscope / dependencies / revertOnUpdateで再描画と破棄を管理。イベントでは作成済みタイムラインを再利用するため、イベントごとの新規tweenは生成しません。ObserverとDOMリスナーも解除します。`prefers-reduced-motion`の変更はgsap.matchMediaで即時反映し、タッチ端末ではホバー演出を登録しません。短い見出しのみ文字分割し、読み上げ用の元テキストを保持します。キーボードフォーカス時は対象を即表示します。

参考: [公式useGSAP](https://github.com/greensock/react)、[公式matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/)。
