// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Logs, CameraType, Champ } = initSchema(schema);

export {
  Logs,
  CameraType,
  Champ
};