/**
 * 右键复制黏贴
 */
const remote = require('electron').remote;
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;


const RightClickMenuFuc = () => {
  /**
  * 判断点击区域可编辑
  * @param {*} e
  */
  function isEleEditable(e: any): any {
    if (!e) {
      return false;
    }
    // 为input标签或者contenteditable属性为true
    if (e.tagName == 'INPUT' || e.contentEditable == 'true') {
      return true;
    } else {
      // 递归查询父节点
      return isEleEditable(e.parentNode)
    }
  }

  const menu = new Menu();
  menu.append(new MenuItem({ label: '粘贴', role: 'paste' }));

  const menu2 = new Menu();
  menu2.append(new MenuItem({ label: '复制', role: 'copy' }));
  window.addEventListener('contextmenu', (e) => { // 上下文监听事件
    e.preventDefault();
    if (isEleEditable(e.target)) {
      menu.popup(remote.getCurrentWindow());
    } else {
      // 判断有文本选中
      let selectText = window.getSelection().toString();
      if (!!selectText) {
        menu2.popup(remote.getCurrentWindow());
      }
    }

  }, false)
}

export default RightClickMenuFuc

