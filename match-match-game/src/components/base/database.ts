import IStore from '../../types/store.type';
import IPlayer from '../../types/player.type';

const DB_NAME = 'WFZ1';
const DB_STORES = [
  {
    name: 'players',
    options: {
      key: 'id',
      autoIncrement: true,
    },
  },
  {
    name: 'best-players',
    options: {
      key: 'id',
      autoIncrement: true,
    },
  },
];

class Database {
  public db?: IDBDatabase;

  players: IPlayer[] | IDBDatabase = [];

  constructor() {
    this.OpenInitDB();
  }

  OpenInitDB(): void {
    const req = window.indexedDB.open(DB_NAME, 1);

    // Create db and objects of stores
    req.onupgradeneeded = (e) => this.addStores(e);

    req.onsuccess = (e: Event): void => {
      // If db is exist, onupgradeneeded won't be in progress, it means need to do initialization this.db here
      this.db = (e.target as IDBOpenDBRequest).result;
      // console.log((e.target as IDBOpenDBRequest).result);
    };

    req.onerror = (/* e: any */): void => {
      // console.log(`Database error: ${ e.target.errorCode }`);
    };
  }

  addStores(e: Event): void {
    this.db = (e.target as IDBOpenDBRequest).result;

    DB_STORES.forEach((store) => {
      const parms = {
        keyPath: store.options.key,
        autoIncrement: store.options.autoIncrement,
      };

      this.db?.createObjectStore(store.name, parms);
    });
  }

  addData(store: string, player: IPlayer): void {
    if (!this.db) return;

    const trans = this.db.transaction(store, 'readwrite');
    const players = trans.objectStore(store);
    const req = players.put(player);

    req.onsuccess = () => {
      // console.log('Player added', req.result);
    };

    req.onerror = () => {
      // console.log('Error', req.error);
    };

    if (store === 'players') {
      players.getAll().onsuccess = (e: Event) => {
        this.players = (e.target  as IDBOpenDBRequest).result;
      };
    }
  }

  getLastPlayer(): IPlayer {
    const arr = this.players as [];
    return arr[arr.length - 1];
  }
}

const db = new Database();
export default db;
