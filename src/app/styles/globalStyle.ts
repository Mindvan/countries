import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-bg: #f8fafc;
    --color-surface: #ffffff;
    --color-border: #e2e8f0;
    --color-text: #0f172a;
    --color-text-muted: #64748b;
    --color-hover-bg: #f1f5f9;
    --color-hover-text: #0f172a;
    --color-outline: #6366f1;
  }

  [data-theme='dark'] {
    --color-bg: #0b1220;
    --color-surface: #111827;
    --color-border: #1f2937;
    --color-text: #e5e7eb;
    --color-text-muted: #9ca3af;
    --color-hover-bg: #1f2937;
    --color-hover-text: #f9fafb;
    --color-outline: #818cf8;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    font-family:
      'DM Sans',
      system-ui,
      -apple-system,
      'Segoe UI',
      sans-serif;
    background: var(--color-bg);
    color: var(--color-text);
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  ul,
  ol {
    list-style: none;
    padding: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`
