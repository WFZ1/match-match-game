import IStore from '../../types/store.type';
import IPlayer from '../../types/player.type';

const DB_NAME = 'WFZ1';
const DB_STORES: IStore[] = [
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

  bestPlayers: IPlayer[] | IDBDatabase = [];

  constructor() {
    this.OpenInitDB();
  }

  OpenInitDB(): void {
    const req = window.indexedDB.open(DB_NAME, 1);

    // Create db and objects of stores
    req.onupgradeneeded = () => this.addStores(req);

    req.onsuccess = () => {
      // If db is exist, onupgradeneeded won't be in progress, need to do initialization here
      this.db = req.result;
      this.getData('best-players');
    };

    req.onerror = (/* e: any */) => {
      /* console.log(`Database error: ${ e.target.errorCode }`); */
    };
  }

  addStores(req: IDBOpenDBRequest): void {
    this.db = req.result;

    DB_STORES.forEach((store) => {
      const parms = {
        keyPath: store.options.key,
        autoIncrement: store.options.autoIncrement,
      };

      this.db?.createObjectStore(store.name, parms);
    });
  }

  private getStore(store: string): IDBObjectStore | undefined {
    if (!this.db) return undefined;

    const trans = this.db.transaction(store, 'readwrite');
    const objStore = trans.objectStore(store);

    return objStore;
  }

  addData(store: string, player: IPlayer): void {
    const objStore = this.getStore(store);
    if (!objStore) return;

    const req = objStore.put(player);
    Database.handleRequestResult(req);

    this.selectArr(objStore, store);
  }

  getData(store: string): void {
    const objStore = this.getStore(store);
    if (!objStore) return;

    this.selectArr(objStore, store);
  }

  private selectArr(objStore: IDBObjectStore, store: string): void {
    if (store === 'players') {
      this.getAllData(objStore, this.updatePlayersArr);
    } else if (store === 'best-players') {
      this.getAllData(objStore, this.updateBestPlayersArr);
    }
  }

  private updatePlayersArr(data: IPlayer[] | IDBDatabase): void {
    this.players = data;
  }

  private updateBestPlayersArr(data: IPlayer[] | IDBDatabase): void {
    this.bestPlayers = Database.sortBestPlayers(data as IPlayer[]);
  }

  private getAllData(
    store: IDBObjectStore,
    func: (data: IPlayer[] | IDBDatabase) => void,
  ): void {
    store.getAll().onsuccess = (e: Event) => {
      const data = (e.target as IDBOpenDBRequest).result;
      func.call(this, data);
    };
  }

  getLastPlayer(): IPlayer {
    const arr = this.players as [];
    return arr[arr.length - 1];
  }

  private static handleRequestResult(req: IDBRequest): void {
    req.onsuccess = () => {
      /* console.log('Player added', req.result); */
    };
    req.onerror = () => {
      /* console.log('Error', req.error); */
    };
  }

  private static sortBestPlayers(data: IPlayer[]): IPlayer[] {
    return data.sort((a, b) => (b.score || 0) - (a.score || 0));
  }
}

const db = new Database();
export default db;
