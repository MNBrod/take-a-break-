// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
const TimerInterval = 3000;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "take-a-break-" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    var disposable = vscode.commands.registerCommand('extension.sayHello', function () {
        vscode.window.showInformationMessage('Starting Take-A-Break');
        let date = new Date();
        var timer = setInterval(() => {
            timerCallback(timer, date);
        }, TimerInterval);
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        //vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;

function timerCallback(timer, date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    // console.log("date:", diff);
    vscode.window.showInformationMessage(`Time Difference: ${makeTime(diff)}`);
}

function makeTime(milli) {
    let sec, minutes;
    if (milli > 60000) {
        console.log('60,000');
        minutes = Math.floor(milli / 60000);
        sec = Math.round((milli - (minutes * 60000)) / 1000);
        if (sec < 10) sec = '0' + sec;
        return `${minutes}:${sec}`;
    }
    if (milli > 1000) {
        console.log('1000');
        sec = Math.round(milli / 1000);
        if (sec < 10) sec = '0' + sec;
        return `0:${sec}`;
    } else {
        console.log('other');
        return milli;
    }
}
