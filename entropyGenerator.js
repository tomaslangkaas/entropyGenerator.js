var entropy = (function() {
  
  entropy.version = '0.1.0';
  entropy(64); // initial pool size
  
  function generateEntropy() {
    var count, timeLimit;
    while (requests.length && currentSize >= requests[0]) {
      requests[1](sampleValues.splice(0, requests.splice(0, 2)[0]));
      currentSize = sampleValues.length;
      targetSize = requests[0] || bufferSize;
    }
    if (currentSize < targetSize) {
      queueExection(generateEntropy);
      count = 0;
      timeLimit = +new Date + 1;
      while (timeLimit > +new Date) {
        count++;
      }
      sampleValues[currentSize++] = count;
    } else {
      timers--;
    }
  }

  var bufferSize,
    targetSize,
    currentSize = 0,
    sampleValues = [],
    requests = [],
    queueExection = setTimeout,
    timers = 0;

  function entropy(samples, callback) {
    if (typeof callback === 'function') {
      requests.push(samples, callback);
      targetSize = samples || bufferSize;
    } else {
      targetSize = bufferSize = samples || 0;
    }
    while (timers < 20) {
      queueExection(generateEntropy);
      timers++;
    }
  }

  return entropy;
})();
