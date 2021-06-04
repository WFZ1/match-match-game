import Store from './models/store';
import Player from './models/player';

export default class Database {
  public db?: IDBDatabase;

  constructor(private dbName: string, public stores: Store[]) {
    this.OpenInitDB();
  }

  OpenInitDB(): void {
    const req = window.indexedDB.open(this.dbName, 1);

    // Create db and objects of stores
    req.onupgradeneeded = (e) => this.addStores(e, this.stores);

    req.onsuccess = (e: Event): void => {
      // If db is exist, onupgradeneeded won't be in progress, it means need to do initialization this.db here
      this.db = (e.target as IDBOpenDBRequest).result;
      // console.log((e.target as IDBOpenDBRequest).result);
    };

    req.onerror = (/* e: any */): void => {
      // console.log(`Database error: ${ e.target.errorCode }`);
    };
  }

  addStores(e: Event, stores: Store[]): void {
    this.db = (e.target as IDBOpenDBRequest).result;

    stores.forEach((store) => {
      const parms = {
        keyPath: store.options.key,
        autoIncrement: store.options.autoIncrement,
      };

      this.db?.createObjectStore(store.name, parms);
    });
  }

  addData(store: string, player: Player): void {
    if (!this.db) return;

    const trans = this.db.transaction(store, 'readwrite');
    const players = trans.objectStore(store);
    const req = players.add(player);

    req.onsuccess = () => {
      // console.log('Player added', req.result);
    };

    req.onerror = () => {
      // console.log('Error', req.error);
    };
  }
}
