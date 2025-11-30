// client-entry.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

const PLUGIN_NAME = 'growi-plugin-view-char-counter';
const COUNTER_ID = 'growi-view-char-counter-floating';

let observer: MutationObserver | null = null;
const cleanupFns: (() => void)[] = [];

// ページ本文のルート候補を覚えておく
let contentRoots: Element[] = [];

/**
 * node が親要素 parent の中に含まれているかを判定
 */
const isNodeInside = (parent: Element, node: Node | null): boolean => {
  if (!node) return false;
  let cur: Node | null = node;
  while (cur) {
    if (cur === parent) return true;
    cur = cur.parentNode;
  }
  return false;
};

/**
 * view モードの本文ルートを探す
 * GROWI のバージョンによりクラス名が違うことがあるので、いくつか候補を試す
 */
const findContentRoots = (): Element[] => {
  const selectors = [
    '[data-testid="page-content"]', // v7 以降でよくあるテストID
    '.wiki',                        // 旧来の GROWI でよくあるクラス
    '.page-content',
    '.content-main',
  ];

  for (const sel of selectors) {
    const nodes = Array.from(document.querySelectorAll(sel));
    if (nodes.length > 0) {
      return nodes;
    }
  }
  return [];
};

/**
 * フローティングの文字数カウンタ要素を取得 or 作成
 */
const ensureFloatingCounter = (): HTMLDivElement => {
  let counter = document.getElementById(COUNTER_ID) as HTMLDivElement | null;
  if (!counter) {
    counter = document.createElement('div');
    counter.id = COUNTER_ID;

    Object.assign(counter.style, {
      position: 'fixed',
      right: '12px',
      bottom: '12px',
      zIndex: '9999',
      fontSize: '12px',
      opacity: '0.8',
      padding: '6px 10px',
      borderRadius: '4px',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      color: '#fff',
      pointerEvents: 'none',  // クリック透過
      maxWidth: '50vw',
      textAlign: 'right',
      whiteSpace: 'nowrap',
    });

    document.body.appendChild(counter);

    cleanupFns.push(() => {
      counter?.remove();
    });
  }
  return counter;
};

/**
 * 文字数カウンタの表示を更新
 */
const updateCounter = () => {
  const counter = ensureFloatingCounter();

  // 本文ルートを最新化
  if (contentRoots.length === 0) {
    contentRoots = findContentRoots();
  }

  if (contentRoots.length === 0) {
    counter.textContent = 'ページ全体: 0 文字';
    return;
  }

  // ページ全体テキスト（本文ルート全体）
  const fullText = contentRoots
    .map((root) => root.textContent ?? '')
    .join('\n');

  const countChars = (s: string) => s.length;
  // Unicode コードポイント基準にしたい場合:
  // const countChars = (s: string) => Array.from(s).length;

  const sel = window.getSelection();
  let selected = '';

  if (sel && sel.rangeCount > 0) {
    const range = sel.getRangeAt(0);
    // selection が本文のどれかのルート内にあるときだけカウント対象にする
    const insideAny = contentRoots.some((root) =>
      isNodeInside(root, range.commonAncestorContainer),
    );
    if (insideAny) {
      selected = sel.toString();
    }
  }

  if (selected.length > 0) {
    counter.textContent = `選択中: ${countChars(selected)} 文字 / ページ全体: ${countChars(fullText)} 文字`;
  } else {
    counter.textContent = `ページ全体: ${countChars(fullText)} 文字`;
  }
};

/**
 * view モード用の監視を開始
 */
const startObserveView = () => {
  // 初期の本文ルートとカウンタ更新
  contentRoots = findContentRoots();
  updateCounter();

  // SPA 遷移などで本文が差し替えられることがあるので監視
  observer = new MutationObserver((mutations) => {
    let shouldUpdateRoots = false;

    for (const m of mutations) {
      m.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;

        if (
          node.matches('[data-testid="page-content"], .wiki, .page-content, .content-main') ||
          node.querySelector('[data-testid="page-content"], .wiki, .page-content, .content-main')
        ) {
          shouldUpdateRoots = true;
        }
      });
    }

    if (shouldUpdateRoots) {
      contentRoots = findContentRoots();
      updateCounter();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // キー入力・クリック・選択変化で更新
  // （viewモードなので主に選択変化で動くはず）
  document.addEventListener('keyup', updateCounter);
  document.addEventListener('mouseup', updateCounter);
  document.addEventListener('selectionchange', updateCounter);

  cleanupFns.push(() => {
    document.removeEventListener('keyup', updateCounter);
    document.removeEventListener('mouseup', updateCounter);
    document.removeEventListener('selectionchange', updateCounter);
  });
};

const activate = (): void => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  startObserveView();
};

const deactivate = (): void => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
  cleanupFns.splice(0).forEach((fn) => fn());
};

// GROWI にこのプラグインを登録
if ((window as any).pluginActivators == null) {
  (window as any).pluginActivators = {};
}
(window as any).pluginActivators[PLUGIN_NAME] = {
  activate,
  deactivate,
};

