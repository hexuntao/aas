import * as qiniu from 'qiniu';

const parseZone = (zone: string) => {
  switch (zone) {
    case 'Zone_as0':
      return qiniu.zone.Zone_as0;
    case 'Zone_na0':
      return qiniu.zone.Zone_na0;
    case 'Zone_z0':
      return qiniu.zone.Zone_z0;
    case 'Zone_z1':
      return qiniu.zone.Zone_z1;
    case 'Zone_z2':
      return qiniu.zone.Zone_z2;
  }
};

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
    path: process.env.DOCS_PREFIX,
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
  /** qiniu config */
  qiniu: {
    accessKey: process.env.QINIU_ACCESSKEY,
    secretKey: process.env.QINIU_SECRETKEY,
    domain: process.env.QINIU_DOMAIN,
    bucket: process.env.QINIU_BUCKET,
    zone: parseZone(process.env.QINIU_ZONE || 'Zone_z2'),
    access: (process.env.QINIU_ACCESS_TYPE as any) || 'public',
  },
};
