// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
let simpleGit = require('simple-git');
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
const TimerInterval = 1000;

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
        let timer = createTimer(TimerInterval, date, item);
    });
    // context.subscriptions.push(controller);
    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;

// class TimerController {
//     constructor() {
//         this.subscriptions = [];
//         this._disposable = Disposable.from(...this.subscriptions);
//         window.onDidChangeActiveTextEditor(this._onEvent, this, this.subscriptions);
//     }

//     _onEvent () {
//         console.log('hi');
//         let item = createItem();
//         const date = new Date();
//         let timerTwo = createTimer(TimerInterval, date, item);
//     }

//     dispose () {
//         this._disposable.dispose();
//     }
// }
