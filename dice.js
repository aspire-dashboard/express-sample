/*dice.js*/
const { trace, metrics } = require('@opentelemetry/api');
const logsAPI = require('@opentelemetry/api-logs');

const tracer = trace.getTracer('dice-lib');
const meter = metrics.getMeter('dice-lib');
const logger = logsAPI.logs.getLogger('dice-lib');

const counter = meter.createCounter('dice-lib.rolls.counter');

function rollOnce(i, min, max) {

    counter.add(1);
    return tracer.startActiveSpan(`rollOnce:${i}`, (span) => {
      const result = Math.floor(Math.random() * (max - min) + min);
  
      // Add an attribute to the span
      span.setAttribute('dicelib.rolled', result.toString());
  
      span.end();
      return result;
    });
  }
  
  
  function rollTheDice(rolls, min, max) {
    logger.emit({
      severityNumber: logsAPI.SeverityNumber.INFO,
      severityText: 'INFO',
      body: 'rollTheDice called',
      attributes: { 'log.type': 'LogRecord' },
    });
    // Create a span. A span must be closed.
    return tracer.startActiveSpan('rollTheDice',
        { attributes: { 'dice-lib.rolls': rolls.toString() } },
    (parentSpan) => {
      const result = [];
      for (let i = 0; i < rolls; i++) {
        result.push(rollOnce(i, min, max));
      }
      // Be sure to end the span!
      parentSpan.end();
      return result;
    });
  }
  

module.exports = { rollTheDice };
