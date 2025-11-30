// client-entry.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

const PLUGIN_NAME = 'growi-plugin-view-char-counter';
const COUNTER_CLASS = 'growi-view-char-counter';

let observer: MutationObserver | null = null;
const cleanupFns: (() => void)[] = [];

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
 * ページ本文(root)に文字数カウンタをアタッチ
 */
const attachCharCounterToView = (contentRoot: Element) => {
  // すでに付いていれば何もしない
  if (contentRoot.querySelector(`.${COUNTER_CLASS}`)) return;

  // カウンタ用の <div>
  const counter = document.createElement('div');
  counter.className = COUNTER_CLASS;

  Object.assign(counter.style, {
    fontSize: '12px',
    opacity: '0.7',
    padding: '4px 8px',
    marginTop: '8px',
    textAlign: 'right',
    borderTop: '1px solid rgba(0,0,0,0.1)',
  });

  // 本文の直下に付ける（必要なら parentElement に付けてもOK）
  contentRoot.appendChild(counter);

  const countChars = (s: string) => s.length;
  // Unicode コードポイント基準にしたければ:
  // const countChars = (s: string) => Array.from(s).length;

  const update = () => {
    const fullText = contentRoot.textContent ?? '';

    const sel = window.getSelection();
    let selected = '';

    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      if (isNodeInside(contentRoot, range.commonAncestorContainer)) {
        selected = sel.toString();
      }
    }

    if (selected.length > 0) {
      counter.textContent = `選択中: ${countChars(selected)} 文字 / ページ全体: ${countChars(fullText)} 文字`;
    } else {
      counter.textContent = `ページ全体: ${countChars(fullText)} 文字`;
    }
  };

  const handler = () => update();

  // ページ本文内のクリックやキー入力時に更新
  contentRoot.addEventListener('keyup', handler);
  contentRoot.addEventListener('mouseup', handler);
  // 選択変化は document レベルで監視
  document.addEventListener('selectionchange', handler);

  // 初期表示
  update();

  // deactivate() 用のクリーンアップを登録
  cleanupFns.push(() => {
    contentRoot.removeEventListener('keyup', handler);
    contentRoot.removeEventListener('mouseup', handler);
    document.removeEventListener('selectionchange', handler);
    counter.remove();
  });
};

/**
 * view モードの本文ルートを探して、カウンタを付ける
 * GROWI のバージョンによりクラス名が微妙に違う場合があるので、
 * いくつか候補を試している
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

const startObserveView = () => {
  // すでに表示されているページにも付ける
  const roots = findContentRoots();
  roots.forEach((root) => attachCharCounterToView(root));

  // SPA 遷移で本文が差し替えられることがあるので監視
  observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;

        // 追加された要素自身が本文のルート
        if (
          node.matches('[data-testid="page-content"], .wiki, .page-content, .content-main')
        ) {
          attachCharCounterToView(node);
        }

        // 追加された要素の配下に本文ルートがある場合
        node
          .querySelectorAll?.('[data-testid="page-content"], .wiki, .page-content, .content-main')
          .forEach((el) => attachCharCounterToView(el));
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

const activate = (): void => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // 必要なら location.pathname で「/admin」「/login」等を除外してもよい
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

