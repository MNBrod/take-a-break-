module.exports = {
  timerTickRate: 1000, //timer ticks once every second by default
  queryTickRate: 60000, // how often the user is querired about committing
  gitCheckRate: 10000, //how often program checks for new git-commits
  snippets: { //roughly follows karma conventions
    a: 'adds: ',
    r: 'removes: ',
    f: 'fixes: ',
    d: 'docs: ',
    s: 'styles: ',
    t: 'tests: '
  }
};

