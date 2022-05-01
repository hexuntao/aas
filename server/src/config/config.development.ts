export default {
  rootRoleId: 1,
  /** jwt sign secret */
  jwt: {
    secret: process.env.JWT_SECRET || '123456',
  },
  /** typeorm config */
  database: {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root123456',
    database: 'aas',
    synchronize: true,
    logging: false,
    timezone: '+08:00', // 东八区
  },
  /** swagger config */
  swagger: {
    enable: true,
    title: 'api文档',
    desc: 'api文档描述',
    path: '/api',
  },
  /** redis config */
  redis: {
    host: '127.0.0.1', // default value
    port: 6379, // default value
    password: '',
    db: 0,
  },
  /** logger config */
  logger: {
    // level:'info',
    // consoleLevel:'info',
    // timestamp:false,
    // maxFiles:'15d',
    // maxFileSize:'2m',
    // disableConsoleAtProd:true,
    // dir:'',
    // errorLogName:'',
    // appLogName:'',
  },
};
