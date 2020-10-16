# electron-react-umi-tpl change log

### 选中右键复制黏贴

```
// app.ts

// 注入右键复制黏贴
import RightClickMenuFuc from './utils/rightClickMenuFuc'

RightClickMenuFuc()

```


```
// RightClickMenuFuc.ts

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




```


# electron-react-umi-tpl change log

### Right click to copy and paste

```
// app.ts

// Inject right click to copy and paste
import RightClickMenuFuc from'./utils/rightClickMenuFuc'

RightClickMenuFuc()

```


```
// RightClickMenuFuc.ts

/**
 * Right click to copy and paste
 */
const remote = require('electron').remote;
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;


const RightClickMenuFuc = () => {
  /**
  * Judging that the click area can be edited
  * @param {*} e
  */
  function isEleEditable(e: any): any {
    if (!e) {
      return false;
    }
    // is the input tag or the contenteditable attribute is true
    if (e.tagName =='INPUT' || e.contentEditable =='true') {
      return true;
    } else {
      // Query the parent node recursively
      return isEleEditable(e.parentNode)
    }
  }

  const menu = new Menu();
  menu.append(new MenuItem({ label:'paste', role:'paste' }));

  const menu2 = new Menu();
  menu2.append(new MenuItem({ label:'copy', role:'copy' }));
  window.addEventListener('contextmenu', (e) => {// Context listener event
    e.preventDefault();
    if (isEleEditable(e.target)) {
      menu.popup(remote.getCurrentWindow());
    } else {
      // Determine that there is text selected
      let selectText = window.getSelection().toString();
      if (!!selectText) {
        menu2.popup(remote.getCurrentWindow());
      }
    }

  }, false)
}

export default RightClickMenuFuc




```