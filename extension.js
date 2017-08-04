var vscode = require('vscode');
const fs = require('fs');
const jsonEdit = require('./src/jsonParser.js');
let windowTimer;
const fileName = './takeABreakConfig.json';
const {
    Timer
} = require('./src/timer');
const config = require('./takeABreakConfig');

function activate(context) {
    console.log('Congratulations, your extension "take-a-break-" is now active!');
    var disposable = vscode.commands.registerCommand('extension.startTimerBreak', function () {
        windowTimer = new Timer(config.timerTickRate, new Date());
    });
    var disposable3 = vscode.commands.registerCommand('extension.stopTimerBreak', function () {
            windowTimer.endTimer();
            vscode.commands.executeCommand('extension.startTimerBreak');
    });
    context.subscriptions.push(disposable3);
    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;


/*

{
  "timerTickRate": 1000, //timer ticks once every second by default
  "queryTickRate": 100000, // how often the user is querired about committing
  "gitCheckRate": 10000, //how often program checks for new git-commits
  "snippets": { //roughly ƒfollows karma conventions
    "a": "adds: ",
    "r": "removes: ",
    "f": "fixes: ",
    "d": "docs: ",
    "s": "styles: ",
    "t": "tests: "
  }
}

*/
