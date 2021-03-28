import css from 'styled-jsx/css'

export const essentialCSS = css.global`
  .toggleVisibilityUL {
    @apply hidden;
  }
  .toggleVisibilityUL:checked ~ ul {
    @apply block;
  }
  #main-form {
    @apply flex flex-wrap items-center;
  }
  #main-form input[type='radio'] {
    @apply mr-2 focus:ring-0;
  }
  #main-form #right-answer {
    @apply hidden;
  }
  #main-form #right-answer + label {
    @apply text-white my-4 mr-2 inline-block text-sm font-bold flex-none border border-purple-700 bg-purple-600 hover:bg-purple-700 rounded order-1 cursor-pointer;
  }
  #main-form #right-answer:checked + label {
    @apply bg-purple-700 opacity-75 text-opacity-80 cursor-not-allowed;
  }
  #main-form #right-answer:checked ~ input[type='radio'] {
    @apply text-red-500;
  }
  #main-form #right-answer:checked ~ input[type='radio']:checked {
    @apply text-red-500 ring-red-500;
  }
  #main-form #right-answer:checked ~ input[type='radio']:checked + label {
    @apply bg-red-200 border-red-300;
  }
  #main-form input[type='radio']:checked + label {
    @apply bg-blue-200 border-blue-300;
  }
  #main-form label {
    flex: 0 calc(100% - 30px);
    @apply p-2 border border-white rounded;
  }
  #main-form #solution {
    @apply hidden order-3;
  }
  #main-form #solution + label {
    @apply text-gray-500 text-sm my-4 mr-2 inline-block font-semibold border border-gray-200 flex-none bg-gray-100 hover:bg-gray-200 rounded order-2 cursor-pointer;
  }
  #main-form #solution:checked + label {
    @apply bg-gray-100 opacity-75 text-opacity-80;
  }
  #main-form .q {
    flex-basis: 100%;
  }
  #main-form .r,
  .s {
    @apply hidden;
  }
  #main-form #solution:checked ~ .s {
    @apply block order-4;
    flex-basis: 100%;
  }
`

export const CSS = css.global`
  .CodeMirror {
    height: 100%;
    z-index: 0;
  }
  #nprogress .bar {
    @apply bg-blue-500;
  }
  body {
    @apply bg-white;
  }
`
