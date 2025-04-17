import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'receipt',
  connector: 'mongodb',
  url: 'mongodb://root@127.0.0.1:27017/factmongo',
  host: 'localhost',
  port: 27017,
  user: 'root',
  password: '',
  database: 'factmongo',
  useNewUrlParser: false
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ReceiptDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'receipt';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.receipt', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
