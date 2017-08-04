// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
let timer;
let on = false;
let simpleGit = require('simple-git')();
let {
    window,
    commands,
    Disposable,
    ExtensionContext,
    StatusBarAlignment,
    StatusBarItem,
    TextDocument
} = require('vscode');
const {
    createTimer
} = require('./src/timer');
const {
    createItem
} = require('./src/statusTimer');
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
        let item = createItem();
        let date = new Date();
        timer = createTimer(config.timerTickRate, date, item);
    });
    var disposable2 = vscode.commands.registerCommand('extension.gitCommit', function () {
        simpleGit.status((err, status) => {
            if (err) console.error(err);
            console.log(status);
            if (status.modified.length !== 0) {
              simpleGit.add(status.modified.concat(status.not_added), () => {
                console.log('Added ', status.modified);
                window.showInputBox()
                .then(res => console.log(res));
              });
            }
        });
    });
    var disposable3 = vscode.commands.registerCommand('extension.stopTimerBreak', function () {
        if (on) {clearInterval(timer);}
        else if (!on) {
            let item = createItem();
            let date = new Date();
            timer = createTimer(config.timerTickRate, date, item);
        }
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(disposable2);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;

