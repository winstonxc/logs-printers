"use strict";

const MinHeap = require("../lib/min-heap");

// Print all entries, across all of the sources, in chronological order.
module.exports = (logSources, printer) => {
  const minHeap = new MinHeap();

  for (const source of logSources) {
    if(!source.drained) {
      minHeap.add({ hasMoreLogs: !source.drained, logEntry: source.pop(), source });
    }
  }

  // Keep processing logs until the heap is empty and all the logs are drained
  while (!minHeap.isEmpty()) {
    const { logEntry, source, hasMoreLogs } = minHeap.removeMin();
    printer.print(logEntry);

    if (hasMoreLogs) {
      const nextLogEntry = source.pop();
      if(nextLogEntry) {
        minHeap.add({ hasMoreLogs: !source.drained, logEntry: nextLogEntry, source });
      }
    }
  }

  printer.done();
};
