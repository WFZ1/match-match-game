import IStore from '../../../types/store.type';

export const DB_NAME = 'WFZ1';

export const DB_STORES: IStore[] = [
  {
    name: 'players',
    opts: {
      keyPath: 'id',
      autoIncrement: true,
    },
  },
  {
    name: 'best-players',
    opts: {
      keyPath: 'id',
      autoIncrement: true,
    },
  },
];
