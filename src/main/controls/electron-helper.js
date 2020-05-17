// /**
//  * electron 辅助工具集
//  */

// const { ipcMain } = require('electron')

// // 打印标签 - webcontent方式

// function initPrintEvent(printWindow, mainWindow, url) {
//   ipcMain.on('print-start', (event, obj) => {
//     console.log('print-start')
//     printWindow.webContents.send('print-edit', obj);
//   })
//   // 获得打印机列表
//   ipcMain.on('getPrinters', () => {
//     console.log('received getPrinters msg');
//     const printers = printWindow.webContents.getPrinters();
//     mainWindow.send('printerList', { printers, url })
//   })
//   // 验证打印机状态并打印
//   ipcMain.on('tagPrint', (event, deviceName) => {
//     const printers = printWindow.webContents.getPrinters();
//     console.log('printers：', printers)
//     printers.forEach(element => {
//       if (element.name === deviceName && element.status !== 0) {
//         mainWindow.send('print-error', deviceName + '打印机异常');
//         printWindow.webContents.print({
//           silent: false,
//           printBackground: false,
//           deviceName: ''
//         },
//           (data) => {
//             console.log("回调", data);
//           });
//       } else if (element.name === deviceName && !element.status) { // 打印机正常
//         console.log(element.status + '-' + deviceName)
//         printWindow.webContents.print({
//           silent: true,
//           printBackground: false,
//           deviceName: element.name
//         }, (success, failureReason) => {
//           if (success) {
//             console.log('print success')
//           }
//           if (failureReason === 'cancelled') {
//             console.log('print cancelled');
//           }
//           if (failureReason === 'failed') {
//             console.log('print failed');
//           }
//         });
//       }
//     });

//   })
// }

// module.exports  = {
//   initPrintEvent
// }