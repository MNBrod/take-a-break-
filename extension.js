// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
let windowTimer;
const {
    Timer
} = require('./src/timer');
const config = require('./takeABreakConfig');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "take-a-break-" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    //let controller = new TimerController();
    var disposable = vscode.commands.registerCommand('extension.startTimerBreak', function () {
        windowTimer = new Timer(config.timerTickRate, new Date());
    });
    var disposable3 = vscode.commands.registerCommand('extension.stopTimerBreak', function () {
            windowTimer.endTimer();
    });
    context.subscriptions.push(disposable3);
    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
