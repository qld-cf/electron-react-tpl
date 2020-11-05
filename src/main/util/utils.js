
/**
 * 工具集
 */
const fs = require('fs')
const path = require('path')
const log = require('electron-log');
const axios = require('axios').default;

/**
 * 删除文件或文件夹
 * @param {string} dir 文件夹位置
 */
function deleteDirSync(dir) {
    let files = fs.readdirSync(dir)
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0;i < files.length;i++) {
        let newPath = path.join(dir, files[i]);
        let stat = fs.statSync(newPath)
        if (stat.isDirectory()) {
            // 如果是文件夹就递归下去
            deleteDirSync(newPath);
        } else {
            // 删除文件
            fs.unlinkSync(newPath);
        }
    }
    fs.rmdirSync(dir)// 如果文件夹是空的，删除自身
}


/**
 * 通过main进程发送事件给renderer进程，提示更新信息
 * @param {string} text 信息
 * @param {object} mainWindow 实例
 */
function sendUpdateMessage(text, mainWindow) {
    log.info('enter sendUpdateMessage', text);
    mainWindow.webContents.send('message', text)
}

/**
  * 下载远程压缩包并写入指定文件
  * @param {string} 远程地址
  * @param {string} 文件名
  */
function downloadFile(uri, filename) {
    const writer = fs.createWriteStream(filename)
    axios.get(uri, { responseType: 'stream' }).then(res => {
        res.data.pipe(writer);
    });
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

module.exports = {
    deleteDirSync,
    downloadFile,
    sendUpdateMessage
}