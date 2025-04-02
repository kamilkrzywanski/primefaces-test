function setContent(content) {
    tinyMCE.activeEditor.setContent(content);
}
function readonlyMode() {
    tinymce.activeEditor.setMode('readonly');
}

function designMode() {
    tinymce.activeEditor.setMode('design');
}

function setEditorContentStyle(css) {
  const head = tinymce.activeEditor.getDoc().head;
  let styleElement = head.querySelector('#dynamic-content-style');

  if (!styleElement) {
    styleElement = tinymce.activeEditor.dom.create('style', { id: 'dynamic-content-style', type: 'text/css' });
    head.appendChild(styleElement);
  }

  styleElement.innerHTML = css;
}
