/// <reference path="../../../typings/require.d.ts" />
let hljs = require("highlightjs");

let wrapper = function(code) {
  return "<pre class=\"hljs\"><code>" + code + "</code></pre>";
};

let md = require("markdown-it")({
  html: false,
  linkify: true,
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return wrapper(hljs.highlight(lang, code, true).value);
      } catch (e) { }
    }
    return wrapper(md.utils.escapeHtml(code));
  }
});
export default md;
