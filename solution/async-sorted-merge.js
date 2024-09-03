"use strict";

const MinHeap = require("../lib/min-heap");
// Print all entries, across all of the *async* sources, in chronological order.
const fetchLogs = async (logSources) => {
  const promiseArr = [];

  for(const source of logSources) {
    if(!source.drained) {
      promiseArr.push(source.popAsync());
    }
  }

  return await Promise.all(promiseArr);
}

const addLogsToHeap = (logs, minHeap) => {
  for(const logEntry of logs) {
    if(logEntry) {
      minHeap.add({ logEntry });
    }
  }
}

const processHeapLogs = async (minHeap, logSources, printer) => {
  while (!minHeap.isEmpty()) {
    const { logEntry } = minHeap.removeMin();
    printer.print(logEntry);

    let logs = await fetchLogs(logSources);
    addLogsToHeap(logs, minHeap);
  }
}

module.exports = async (logSources, printer) => {
  const minHeap = new MinHeap();
  let logs = await fetchLogs(logSources);
  addLogsToHeap(logs, minHeap);

  return new Promise(async (resolve, reject) => {
    await processHeapLogs(minHeap, logSources, printer);
    printer.done();
    resolve(console.log("Async sort complete."));
  });
};
