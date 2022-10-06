import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type LogsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CameraTypeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChampMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Logs {
  readonly id: string;
  readonly champId?: string | null;
  readonly date?: string | null;
  readonly latitude?: number | null;
  readonly longitude?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Logs, LogsMetaData>);
  static copyOf(source: Logs, mutator: (draft: MutableModel<Logs, LogsMetaData>) => MutableModel<Logs, LogsMetaData> | void): Logs;
}

export declare class CameraType {
  readonly id: string;
  readonly nom?: string | null;
  readonly angle?: string | null;
  readonly etat?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<CameraType, CameraTypeMetaData>);
  static copyOf(source: CameraType, mutator: (draft: MutableModel<CameraType, CameraTypeMetaData>) => MutableModel<CameraType, CameraTypeMetaData> | void): CameraType;
}

export declare class Champ {
  readonly id: string;
  readonly label?: string | null;
  readonly latitude?: number | null;
  readonly longitude?: number | null;
  readonly etat?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Champ, ChampMetaData>);
  static copyOf(source: Champ, mutator: (draft: MutableModel<Champ, ChampMetaData>) => MutableModel<Champ, ChampMetaData> | void): Champ;
}