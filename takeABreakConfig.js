module.exports = {
  timerTickRate: 1000, //timer ticks once every second by default
  queryTickRate: 20000, // how often the user is querired about committing
  gitCheckRate: 10000,
  snippets: { //roughly follows karma conventions
    a: 'adds: ',
    r: 'removes: ',
    f: 'fixes: ',
    d: 'docs: ',
    s: 'styles: ',
    t: 'tests: '
  }
};

