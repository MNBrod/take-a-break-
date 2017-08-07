var vscode = require('vscode');
const fs = require('fs');
const simpleGit = require('simple-git')();
let windowTimer;
const fileName = './takeABreakConfig.json';
const {
    Timer
} = require('./src/timer');
const config = require('./takeABreakConfig');


let {
    window
  } = require('vscode');
const generateMessage = require('./src/messageParser');
const {createCommitInput} = require('./src/gitCommits');
function activate(context) {
    console.log('Congratulations, your extension "take-a-break-" is now active!');
    var disposable = vscode.commands.registerCommand('extension.startTimerBreak', function () {
        windowTimer = new Timer(config.timerTickRate, new Date());
    });
    var disposable3 = vscode.commands.registerCommand('extension.stopTimerBreak', function () {
        windowTimer.endTimer();
        // vscode.commands.executeCommand('extension.startTimerBreak');
        // simpleGit.diff(['--stat'], (err, result) => console.log(result, err));
    });
    var disposable2 = vscode.commands.registerCommand('extension.gitCommit', function () {
        // vscode.commands.executeCommand('extension.startTimerBreak');
        const message = "You haven't committed in a while! All has been added for you. If you want to commit, type a message! otherwise, submit an empty message";
        createCommitInput(message)
          .then((result, error) => {
            if (error) {
              console.error(error);
            } else if (result && result.length !== 0) {
              result = generateMessage(result);
              simpleGit.status((err, status) => {
                if (err) console.error(err);
                if (status.modified.length !== 0) {
                  simpleGit.add(status.modified.concat(status.not_added), () => {
                    console.log('Added ', status.modified);
                    console.log('commiting message: ', result);
                    simpleGit.commit(result, () => {
                      window.showInformationMessage('success! changes committed');
                      reset();
                    });
                  });
                }
              });
            } else {
              window.showInformationMessage('nothing was added or committed');
              config.queryTickRate += 10000;
            }
          });

    });
    context.subscriptions.push(disposable3);
    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
