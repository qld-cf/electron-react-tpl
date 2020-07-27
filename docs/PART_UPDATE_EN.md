## Incremental update documentation
#### Prepare ahead of time
1. Prepare local or remote server or remote static file URL
```
npm i -g http-server
// enter any folder of filer folder
Http-server - P 4000 // quickly start the local service to store update files
```
2. Configure and package, get the updated file content and compress it
```
// package.json
//Turn off ASAR mode
"asar": false,
//Packing
npm run pack
//Enter the windows package
cd release\0.x.x_ setup\win-unpacked\resources
//Compressed app folder = > app.zip , copy app- update.yml and app.zip
```
Three app.zip Pass to server
3. Local process, start the client and click incremental update
```
//Entrance
// src\render\components\AutoUpdate\ index.tsx
<Button type='primary' onClick={() => checkForPartUpdates()} style={{ marginLeft: 10 }}>
Incremental update
</Button>
```

```
//Version version comparison between local check and server
//If a new version is found, it communicates with the main process and notifies checkforpartupdates to start updating
// src\render\utils\autoUpdate\ partUpdate.js
/**Check for updates*/
export async function checkForPartUpdates() {
try {
//Check version
const res = await checkVersion()
if (res &amp;&amp; res === 'OPEN_ PART_ UPDATE') {
//Incremental update
console.log ('OPEN_ PART_ UPDATE')
confirm({
Title: 'update detected',
icon: <ExclamationCircleOutlined />,
content: (
<div>
<p>Update</p>
</div>
)
Oktext: 'confirm',
Canceltext: 'Cancel',
onOk() {
ipc &amp;&amp;  ipc.send ('checkForPartUpdates')
message.info ('please wait a few seconds..')
}
onCancel() {
console.log ('Cancel');
}
};
// partUpdates()
}
if (res &amp;&amp; res === 'OPEN_ ALL_ UPDATE') {
console.log ('OPEN_ ALL_ UPDATE')
//Full update
}
} catch (error) {
console.error ('checkVersionERROR', error)
}
}
function checkVersion(params) {
return new Promise((resolve, reject) => {
const currentVersion =  remote.app.getVersion ()
//Get the latest version number
downloadFile(remoteYmlURL, localYmlUrl).then(res => {
const remoteVersion =  JSON.stringify ( res.data ).split('\\n')[0].split(' ')[1]
const remoteVersionArr =  remoteVersion.split ('.')
const currentVersionArr =  currentVersion.split ('.')
//0.1.1 y and Z comparison to turn on incremental update 1.1.1 x comparison to turn on full update
if (Number(remoteVersionArr[0]) > Number(currentVersionArr[0])) {
//Open full update
return resolve('OPEN_ ALL_ UPDATE')
} else if (Number(remoteVersionArr[2]) > Number(currentVersionArr[2]) || Number(remoteVersionArr[1]) > Number(currentVersionArr[1])) {
//Turn on incremental update
return resolve('OPEN_ PART_ UPDATE')
} else {
console.log ('No version change, no update ')
}
}).catch(e => {
console.error (E)
}
}
}
```



```
// src\main\controls\ AppAutoUpdater.js
//Download Server package
//Local decompression and backup, replacement, restart the client to complete the update
//Incremental update
ipcMain.on ('checkForPartUpdates', async (e, msg) => {
console.log ('checkForPartUpdates', msg)
// if (isElectronDev) {
//    console.log ('development mode not supported ')
//   return
// }
try {
if ( fs.existsSync ('${localresourcepath}. Back') {// delete the old backup
deleteDirSync(`${localresourcePath}.back`)
}
if ( fs.existsSync (localresourcePath)) {
fs.renameSync (localresourcepath, '${localresourcepath}. Back'); // backup directory
}
await downloadFile(remoteAppURL, appZipPath)
console.log () app.asar.unpacked . zip download complete ')
fs.mkdirSync (localresourcepath) // create an app to unzip the
try {
//Synchronous decompression
const unzip = new AdmZip(appZipPath)
unzip.extractAllTo (resourcePath, true)
console.log () app.asar.unpacked . zip decompression complete ')
console.log ('update complete, restarting...')
mainWindow.webContents.send ('partUpdateReady')
setTimeout(() => {
app.relaunch (); // restart
app.exit (0);
}, 1800);
} catch (error) {
console.error (`extractAllToERROR: ${error}`);
}
//Update window
// BrowserWindow.getAllWindows ().forEach((win: any) => {
//    win.webContents.reload ()
//   //  remote.app.relaunch (); // restart
//   //  remote.app.exit (0);
// })
console.log ('webcontents reload completed ')
} catch (error) {
console.error (`checkForPartUpdatesERROR`, error)
if ( fs.existsSync (`${localresourcePath}.back`)) {
fs.renameSync (`${localresourcePath}.back`, localresourcePath);
}
}
}
```