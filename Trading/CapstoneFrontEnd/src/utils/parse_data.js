import { timeParse } from "d3-time-format";

const parseDate = timeParse("%Y-%m-%d");

function initializeAndAssign(target, source, targetKey) {
  for (let key in source) {
    if (!target[key]) {
      target[key] = {};
    }

    if (!target[key].date) {
      target[key].date = parseDate(key);
    }
    
    target[key][targetKey] = source[key];
  }
}

export function processData(data) {
  const {open, close, high, low, sma_5, sma_10, sma_20, sma_62} = data;
  let chartData = {};

  initializeAndAssign(chartData, open, 'open');
  initializeAndAssign(chartData, high, 'high');
  initializeAndAssign(chartData, low, 'low');
  initializeAndAssign(chartData, close, 'close');
  initializeAndAssign(chartData, sma_5, 'sma_5');
  initializeAndAssign(chartData, sma_10, 'sma_10');
  initializeAndAssign(chartData, sma_20, 'sma_20');
  initializeAndAssign(chartData, sma_62, 'sma_62');

  return Object.values(chartData).sort((a, b) => a.date > b.date);
}