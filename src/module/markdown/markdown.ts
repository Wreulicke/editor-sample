/// <reference path="../../../typings/require.d.ts" />
let hljs = require("highlightjs");
let md = require("markdown-it")({
  html: false,
  linkify: true,
  highlight: function(code, lang) {

    if (lang && hljs.getLanguage(lang)) {
      try {
        return "<pre class=\"hljs\"><code>" +
          hljs.highlight(lang, code, true).value +
          "</code></pre>";
      } catch (e) { }
    }
    return "<pre class=\"hljs\"><code>" + md.utils.escapeHtml(code) + "</code></pre>";
  }
});
export default md;
