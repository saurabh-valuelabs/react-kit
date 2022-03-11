const tempEnv = {
  myEndPoint: '',
};

switch (process.env.DEPLOYMENT_ENV) {
  default:
  case 'local':
    tempEnv.myEndPoint = 'http://localhost:3001/';
    tempEnv.imagePath = 'http://localhost:3001/upload/';
    break;
  case 'development':
  case 'production':
    tempEnv.myEndPoint = 'http://localhost:3001';
    tempEnv.imagePath = 'http://localhost:3001/upload/';
    break;
}

export const { myEndPoint, imagePath } = tempEnv;
