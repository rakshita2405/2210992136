const fetch = require('../utils/fetchWithTimeout');
const windowStore = require('../data/windowStore');

const apiMap = {
  p: 'http://20.244.56.144/evaluation-service/primes',
  f: 'http://20.244.56.144/evaluation-service/fibo',
  e: 'http://20.244.56.144/evaluation-service/even',
  r: 'http://20.244.56.144/evaluation-service/rand'
};

const WINDOW_SIZE = 10;

exports.getNumbers = async (req, res) => {
  const id = req.params.numberid;

  if (!apiMap[id]) {
    return res.status(400).json({ error: 'Invalid number ID' });
  }

  const prevState = [...windowStore[id]];
  const response = await fetchWithTimeout(apiMap[id]);

  const fetchedNumbers = response?.numbers || [];
  const uniqueSet = new Set(windowStore[id]);

  for (let num of fetchedNumbers) {
    if (!uniqueSet.has(num)) {
      windowStore[id].push(num);
      uniqueSet.add(num);
      if (windowStore[id].length > WINDOW_SIZE) {
        const removed = windowStore[id].shift();
        uniqueSet.delete(removed);
      }
    }
  }

  const currState = [...windowStore[id]];
  const average = currState.length
    ? +(currState.reduce((a, b) => a + b, 0) / currState.length).toFixed(2)
    : 0;

  res.json({
    windowPrevState: prevState,
    windowCurrState: currState,
    numbers: fetchedNumbers,
    avg: average
  });
};