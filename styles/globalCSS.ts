import css from 'styled-jsx/css'

export const globalCSS = css.global`
  html,
  body {
    padding: 0;
    margin: 0;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    line-height: 1.5;
    color: #24292e;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif,
      Apple Color Emoji, Segoe UI Emoji;
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
  amp-img.contain img {
    object-fit: contain;
  }
  .fixed-height-container {
    position: relative;
    width: 100%;
    height: 300px;
  }
  /* .katex .base {
    overflow: auto;
    max-width: calc(100vw - 60px);
} */

  input[type='checkbox'] {
    outline: none;
  }
  #right-answer {
    display: none;
  }
  #right-answer + label {
    flex: inherit;
    margin: 20px 0;
    margin-right: 8px;
    order: 100;
    text-align: right;
    position: relative;
    display: inline-block;
    padding: 6px 16px;
    font-family: inherit;
    font-weight: 600;
    line-height: 20px;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border-radius: 6px;
    appearance: none;
    text-decoration: none;
    text-align: center;
    font-size: 14px;
    color: rgb(255, 255, 255);
    background-color: rgb(46, 164, 79);
    border: 1px solid rgb(34, 134, 58);
    box-shadow: rgba(20, 70, 32, 0.1) 0px 1px 0px, rgba(255, 255, 255, 0.03) 0px 2px 0px;
  }
  #right-answer + label:hover {
    background-color: rgb(44, 151, 75);
    border-color: rgba(27, 31, 35, 0.15);
  }
  #right-answer:checked + label {
    color: rgb(255 255 255 / 80%);
    background-color: #94d3a2;
    border-color: rgba(27, 31, 35, 0.1);
  }
  #right-answer:checked ~ input[type='radio']:checked + label {
    background-color: rgb(255, 227, 230);
    border-color: rgba(158, 28, 35, 0.2);
  }
  input[type='radio']:checked + label {
    background-color: rgb(219, 237, 255);
    border-color: rgba(4, 66, 137, 0.2);
  }
  .qmd label {
    flex: 0 calc(100% - 30px);
    padding: 16px;
    border-radius: 6px;
    border: solid 1px #fff;
  }
  #solution {
    margin-left: 16px;
    order: 103;
    display: none;
  }
  #solution + label {
    flex: inherit;
    text-align: right;
    order: 102;
    position: relative;
    display: inline-block;
    padding: 6px 16px;
    font-family: inherit;
    font-weight: 600;
    line-height: 20px;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border-radius: 6px;
    appearance: none;
    text-decoration: none;
    text-align: center;
    font-size: 14px;
    color: rgb(36, 41, 46);
    background-color: rgb(250, 251, 252);
    border: 1px solid rgba(27, 31, 35, 0.12);
    box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 2px 0px;
  }
  #solution:checked + label {
    color: rgb(149, 157, 165);
    background-color: rgb(250, 251, 252);
    border-color: rgb(234, 236, 239);
  }
  .q {
    flex-basis: 100%;
  }
  .r,
  .s {
    display: none;
  }
  #solution:checked ~ .s {
    display: block;
    order: 104;
    flex-basis: 100%;
  }

  .qmd {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .qmd label > p {
    margin: 0;
  }

  @media (max-width: 767px) {
    .qmd {
      padding: 0;
    }
  }

  .qmd :global(.octicon) {
    display: inline-block;
    fill: currentColor;
    vertical-align: text-bottom;
  }

  .qmd :global(.anchor) {
    float: left;
    line-height: 1;
    margin-left: -20px;
    padding-right: 4px;
  }

  .qmd :global(.anchor:focus) {
    outline: none;
  }

  .qmd h1 :global(.octicon-link),
  .qmd h2 :global(.octicon-link),
  .qmd h3 :global(.octicon-link),
  .qmd h4 :global(.octicon-link),
  .qmd h5 :global(.octicon-link),
  .qmd h6 :global(.octicon-link) {
    color: #1b1f23;
    vertical-align: middle;
    visibility: hidden;
  }

  .qmd h1:hover :global(.anchor),
  .qmd h2:hover :global(.anchor),
  .qmd h3:hover :global(.anchor),
  .qmd h4:hover :global(.anchor),
  .qmd h5:hover :global(.anchor),
  .qmd h6:hover :global(.anchor) {
    text-decoration: none;
  }

  .qmd h1:hover :global(.anchor) :global(.octicon-link),
  .qmd h2:hover :global(.anchor) :global(.octicon-link),
  .qmd h3:hover :global(.anchor) :global(.octicon-link),
  .qmd h4:hover :global(.anchor) :global(.octicon-link),
  .qmd h5:hover :global(.anchor) :global(.octicon-link),
  .qmd h6:hover :global(.anchor) :global(.octicon-link) {
    visibility: visible;
  }

  .qmd h1:hover :global(.anchor) :global(.octicon-link:before),
  .qmd h2:hover :global(.anchor) :global(.octicon-link:before),
  .qmd h3:hover :global(.anchor) :global(.octicon-link:before),
  .qmd h4:hover :global(.anchor) :global(.octicon-link:before),
  .qmd h5:hover :global(.anchor) :global(.octicon-link:before),
  .qmd h6:hover :global(.anchor) :global(.octicon-link:before) {
    width: 16px;
    height: 16px;
    content: ' ';
    display: inline-block;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' width='16' height='16' aria-hidden='true'%3E%3Cpath fill-rule='evenodd' d='M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z'%3E%3C/path%3E%3C/svg%3E");
  }

  .qmd {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    line-height: 1.5;
    color: #24292e;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif,
      Apple Color Emoji, Segoe UI Emoji;
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
  }

  .qmd details {
    display: block;
  }

  .qmd summary {
    display: list-item;
  }

  .qmd a {
    background-color: initial;
  }

  .qmd a:active,
  .qmd a:hover {
    outline-width: 0;
  }

  .qmd strong {
    font-weight: inherit;
    font-weight: bolder;
  }

  .qmd h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  .qmd img {
    border-style: none;
  }

  .qmd code,
  .qmd kbd,
  .qmd pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  .qmd hr {
    box-sizing: initial;
    height: 0;
    overflow: visible;
  }

  .qmd input[type='radio'] {
    font: inherit;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    overflow: visible;
    margin: 0;
    width: 15px;
    outline: none;
    margin-right: 15px;
  }

  .qmd [type='checkbox'] {
    box-sizing: border-box;
    padding: 0;
  }

  .qmd * {
    box-sizing: border-box;
  }

  .qmd a {
    color: #0366d6;
    text-decoration: none;
  }

  .qmd a:hover {
    text-decoration: underline;
  }

  .qmd strong {
    font-weight: 600;
  }

  .qmd hr {
    height: 0;
    margin: 15px 0;
    overflow: hidden;
    background: transparent;
    border: 0;
    border-bottom: 1px solid #dfe2e5;
  }

  .qmd hr:after,
  .qmd hr:before {
    display: table;
    content: '';
  }

  .qmd hr:after {
    clear: both;
  }

  .qmd table {
    border-spacing: 0;
    border-collapse: collapse;
  }

  .qmd td,
  .qmd th {
    padding: 0;
  }

  .qmd details summary {
    cursor: pointer;
  }

  .qmd kbd {
    display: inline-block;
    padding: 3px 5px;
    font: 11px SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
    line-height: 10px;
    color: #444d56;
    vertical-align: middle;
    background-color: #fafbfc;
    border: 1px solid #d1d5da;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 #d1d5da;
  }

  .qmd h1,
  .qmd h2,
  .qmd h3,
  .qmd h4,
  .qmd h5,
  .qmd h6 {
    margin-top: 0;
    margin-bottom: 0;
  }

  .qmd h1 {
    font-size: 32px;
  }

  .qmd h1,
  .qmd h2 {
    font-weight: 600;
  }

  .qmd h2 {
    font-size: 24px;
  }

  .qmd h3 {
    font-size: 20px;
  }

  .qmd h3,
  .qmd h4 {
    font-weight: 600;
  }

  .qmd h4 {
    font-size: 16px;
  }

  .qmd h5 {
    font-size: 14px;
  }

  .qmd h5,
  .qmd h6 {
    font-weight: 600;
  }

  .qmd h6 {
    font-size: 12px;
  }

  .qmd p {
    margin-top: 0;
    margin-bottom: 10px;
  }

  .qmd blockquote {
    margin: 0;
  }

  .qmd ol,
  .qmd ul {
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0;
  }

  .qmd ol ol,
  .qmd ul ol {
    list-style-type: lower-roman;
  }

  .qmd ol ol ol,
  .qmd ol ul ol,
  .qmd ul ol ol,
  .qmd ul ul ol {
    list-style-type: lower-alpha;
  }

  .qmd dd {
    margin-left: 0;
  }

  .qmd code,
  .qmd pre {
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
    font-size: 12px;
  }

  .qmd pre {
    margin-top: 0;
    margin-bottom: 0;
  }

  .qmd input::-webkit-inner-spin-button,
  .qmd input::-webkit-outer-spin-button {
    margin: 0;
    -webkit-appearance: none;
    appearance: none;
  }

  .qmd :checked + :global(.radio-label) {
    position: relative;
    z-index: 1;
    border-color: #0366d6;
  }

  .qmd :global(.pl-c) {
    color: #6a737d;
  }

  .qmd :global(.pl-c1),
  .qmd :global(.pl-s .pl-v) {
    color: #005cc5;
  }

  .qmd :global(.pl-e),
  .qmd :global(.pl-en) {
    color: #6f42c1;
  }

  .qmd :global(.pl-s) :global(.pl-s1),
  .qmd :global(.pl-smi) {
    color: #24292e;
  }

  .qmd :global(.pl-ent) {
    color: #22863a;
  }

  .qmd :global(.pl-k) {
    color: #d73a49;
  }

  .qmd :global(.pl-pds),
  .qmd :global(.pl-s),
  .qmd :global(.pl-s) :global(.pl-pse) :global(.pl-s1),
  .qmd :global(.pl-sr),
  .qmd :global(.pl-sr) :global(.pl-cce),
  .qmd :global(.pl-sr) :global(.pl-sra),
  .qmd :global(.pl-sr) :global(.pl-sre) {
    color: #032f62;
  }

  .qmd :global(.pl-smw),
  .qmd :global(.pl-v) {
    color: #e36209;
  }

  .qmd :global(.pl-bu) {
    color: #b31d28;
  }

  .qmd :global(.pl-ii) {
    color: #fafbfc;
    background-color: #b31d28;
  }

  .qmd :global(.pl-c2) {
    color: #fafbfc;
    background-color: #d73a49;
  }

  .qmd :global(.pl-c2:before) {
    content: '^M';
  }

  .qmd :global(.pl-sr) :global(.pl-cce) {
    font-weight: 700;
    color: #22863a;
  }

  .qmd :global(.pl-ml) {
    color: #735c0f;
  }

  .qmd :global(.pl-mh),
  .qmd :global(.pl-mh) :global(.pl-en),
  .qmd :global(.pl-ms) {
    font-weight: 700;
    color: #005cc5;
  }

  .qmd :global(.pl-mi) {
    font-style: italic;
    color: #24292e;
  }

  .qmd :global(.pl-mb) {
    font-weight: 700;
    color: #24292e;
  }

  .qmd :global(.pl-md) {
    color: #b31d28;
    background-color: #ffeef0;
  }

  .qmd :global(.pl-mi1) {
    color: #22863a;
    background-color: #f0fff4;
  }

  .qmd :global(.pl-mc) {
    color: #e36209;
    background-color: #ffebda;
  }

  .qmd :global(.pl-mi2) {
    color: #f6f8fa;
    background-color: #005cc5;
  }

  .qmd :global(.pl-mdr) {
    font-weight: 700;
    color: #6f42c1;
  }

  .qmd :global(.pl-ba) {
    color: #586069;
  }

  .qmd :global(.pl-sg) {
    color: #959da5;
  }

  .qmd :global(.pl-corl) {
    text-decoration: underline;
    color: #032f62;
  }

  .qmd hr {
    border-bottom-color: #eee;
  }

  .qmd kbd {
    display: inline-block;
    padding: 3px 5px;
    font: 11px SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
    line-height: 10px;
    color: #444d56;
    vertical-align: middle;
    background-color: #fafbfc;
    border: 1px solid #d1d5da;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 #d1d5da;
  }

  .qmd:after,
  .qmd:before {
    display: table;
    content: '';
  }

  .qmd:after {
    clear: both;
  }

  .qmd a:not([href]) {
    color: inherit;
    text-decoration: none;
  }

  .qmd blockquote,
  .qmd details,
  .qmd dl,
  .qmd ol,
  .qmd p,
  .qmd pre,
  .qmd table,
  .qmd ul {
    margin-top: 0;
    margin-bottom: 16px;
  }

  .qmd hr {
    height: 0.25em;
    padding: 0;
    margin: 24px 0;
    background-color: #e1e4e8;
    border: 0;
  }

  .qmd blockquote {
    padding: 0 1em;
    color: #6a737d;
    border-left: 0.25em solid #dfe2e5;
  }

  .qmd blockquote > :first-child {
    margin-top: 0;
  }

  .qmd blockquote > :last-child {
    margin-bottom: 0;
  }

  .qmd h1,
  .qmd h2,
  .qmd h3,
  .qmd h4,
  .qmd h5,
  .qmd h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
  }

  .qmd h1 {
    font-size: 2em;
  }

  .qmd h1,
  .qmd h2 {
    padding-bottom: 0.3em;
    border-bottom: 1px solid #eaecef;
  }

  .qmd h2 {
    font-size: 1.5em;
  }

  .qmd h3 {
    font-size: 1.25em;
  }

  .qmd h4 {
    font-size: 1em;
  }

  .qmd h5 {
    font-size: 0.875em;
  }

  .qmd h6 {
    font-size: 0.85em;
    color: #6a737d;
  }

  .qmd ol,
  .qmd ul {
    padding-left: 2em;
  }

  .qmd ol ol,
  .qmd ol ul,
  .qmd ul ol,
  .qmd ul ul {
    margin-top: 0;
    margin-bottom: 0;
  }

  .qmd li {
    word-wrap: break-all;
  }

  .qmd li > p {
    margin-top: 16px;
  }

  .qmd li + li {
    margin-top: 0.25em;
  }

  .qmd dl {
    padding: 0;
  }

  .qmd dl dt {
    padding: 0;
    margin-top: 16px;
    font-size: 1em;
    font-style: italic;
    font-weight: 600;
  }

  .qmd dl dd {
    padding: 0 16px;
    margin-bottom: 16px;
  }

  .qmd table {
    display: block;
    width: 100%;
    overflow: auto;
  }

  .qmd table th {
    font-weight: 600;
  }

  .qmd table td,
  .qmd table th {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
  }

  .qmd table tr {
    background-color: #fff;
    border-top: 1px solid #c6cbd1;
  }

  .qmd table tr:nth-child(2n) {
    background-color: #f6f8fa;
  }

  .qmd img {
    max-width: 100%;
    box-sizing: initial;
    background-color: #fff;
  }

  .qmd img[align='right'] {
    padding-left: 20px;
  }

  .qmd img[align='left'] {
    padding-right: 20px;
  }

  .qmd code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
  }

  .qmd pre {
    word-wrap: normal;
  }

  .qmd pre > code {
    padding: 0;
    margin: 0;
    font-size: 100%;
    word-break: normal;
    white-space: pre;
    background: transparent;
    border: 0;
  }

  .qmd :global(.highlight) {
    margin-bottom: 16px;
  }

  .qmd :global(.highlight) pre {
    margin-bottom: 0;
    word-break: normal;
  }

  .qmd :global(.highlight) pre,
  .qmd pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 3px;
  }

  .qmd pre code {
    display: inline;
    max-width: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    line-height: inherit;
    word-wrap: normal;
    background-color: initial;
    border: 0;
  }

  .qmd :global(.commit-tease-sha) {
    display: inline-block;
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
    font-size: 90%;
    color: #444d56;
  }

  .qmd :global(.full-commit) :global(.btn-outline:not(:disabled):hover) {
    color: #005cc5;
    border-color: #005cc5;
  }

  .qmd :global(.blob-wrapper) {
    overflow-x: auto;
    overflow-y: hidden;
  }

  .qmd :global(.blob-wrapper-embedded) {
    max-height: 240px;
    overflow-y: auto;
  }

  .qmd :global(.blob-num) {
    width: 1%;
    min-width: 50px;
    padding-right: 10px;
    padding-left: 10px;
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
    font-size: 12px;
    line-height: 20px;
    color: rgba(27, 31, 35, 0.3);
    text-align: right;
    white-space: nowrap;
    vertical-align: top;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .qmd :global(.blob-num:hover) {
    color: rgba(27, 31, 35, 0.6);
  }

  .qmd :global(.blob-num:before) {
    content: attr(data-line-number);
  }

  .qmd :global(.blob-code) {
    position: relative;
    padding-right: 10px;
    padding-left: 10px;
    line-height: 20px;
    vertical-align: top;
  }

  .qmd :global(.blob-code-inner) {
    overflow: visible;
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
    font-size: 12px;
    color: #24292e;
    word-wrap: normal;
    white-space: pre;
  }

  .qmd :global(.pl-token.active),
  .qmd :global(.pl-token:hover) {
    cursor: pointer;
    background: #ffea7f;
  }

  .qmd :global(.tab-size[data-tab-size='1']) {
    -moz-tab-size: 1;
    tab-size: 1;
  }

  .qmd :global(.tab-size[data-tab-size='2']) {
    -moz-tab-size: 2;
    tab-size: 2;
  }

  .qmd :global(.tab-size[data-tab-size='3']) {
    -moz-tab-size: 3;
    tab-size: 3;
  }

  .qmd :global(.tab-size[data-tab-size='4']) {
    -moz-tab-size: 4;
    tab-size: 4;
  }

  .qmd :global(.tab-size[data-tab-size='5']) {
    -moz-tab-size: 5;
    tab-size: 5;
  }

  .qmd :global(.tab-size[data-tab-size='6']) {
    -moz-tab-size: 6;
    tab-size: 6;
  }

  .qmd :global(.tab-size[data-tab-size='7']) {
    -moz-tab-size: 7;
    tab-size: 7;
  }

  .qmd :global(.tab-size[data-tab-size='8']) {
    -moz-tab-size: 8;
    tab-size: 8;
  }

  .qmd :global(.tab-size[data-tab-size='9']) {
    -moz-tab-size: 9;
    tab-size: 9;
  }

  .qmd :global(.tab-size[data-tab-size='10']) {
    -moz-tab-size: 10;
    tab-size: 10;
  }

  .qmd :global(.tab-size[data-tab-size='11']) {
    -moz-tab-size: 11;
    tab-size: 11;
  }

  .qmd :global(.tab-size[data-tab-size='12']) {
    -moz-tab-size: 12;
    tab-size: 12;
  }

  .qmd :global(.task-list-item) {
    list-style-type: none;
  }

  .qmd :global(.task-list-item) + :global(.task-list-item) {
    margin-top: 3px;
  }

  .qmd :global(.task-list-item) input {
    margin: 0 0.2em 0.25em -1.6em;
    vertical-align: middle;
  }
`
