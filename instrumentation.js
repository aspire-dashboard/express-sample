/*instrumentation.js*/
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations,} = require('@opentelemetry/auto-instrumentations-node');
const logsAPI = require('@opentelemetry/api-logs');
const {
  SimpleLogRecordProcessor,
  ConsoleLogRecordExporter,
} = require('@opentelemetry/sdk-logs');

const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
const { OTLPMetricExporter} = require('@opentelemetry/exporter-metrics-otlp-grpc');
const { OTLPLogExporter } = require('@opentelemetry/exporter-logs-otlp-grpc');

const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} = require('@opentelemetry/sdk-metrics');
const { Resource } = require('@opentelemetry/resources');
const {
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_VERSION,
} = require('@opentelemetry/semantic-conventions');

const sdk = new NodeSDK({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: 'dice-server',
    [SEMRESATTRS_SERVICE_VERSION]: '0.1.0',
  }),
  logRecordProcessor: new SimpleLogRecordProcessor(new OTLPLogExporter()),
  traceExporter: new OTLPTraceExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter(),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
