import Firebase from 'firebase/app';
import { EventEmitter } from 'events';
import 'firebase/database';

Firebase.initializeApp({
  databaseURL: 'https://hacker-news.firebaseio.com',
});

// https://github.com/HackerNews/API
export interface IStory {
  id: number;
  title: string;
  text: string;
  kids?: number[];
  [key: string]: any;
}

class Store extends EventEmitter {
  static readonly PER_PAGE = 30;
  private static _store: Store;
  private readonly api: Firebase.database.Reference;
  private itemsCache: {};
  private topStoryIds: number[];
  
  private constructor() {
    super();
    this.api = Firebase.database().ref('/v0');
    this.itemsCache = Object.create(null);
    this.topStoryIds = [];
    this.subscribe();
  }

  static create(): Store {
    return this._store ? this._store : (this._store = new Store());
  }

  loading(loading = false): void {
    this.emit('loading', loading);
  }

  async fetchItem(id: number): Promise<IStory> {
    if (this.itemsCache[id]) return this.itemsCache[id];
    const snapshot = await this.api.child(`item/${id}`).once('value', snapshot => snapshot);
    return this.itemsCache[id] = snapshot.val();
  }

  fetchItems(ids: number[] = []): Promise<IStory[]> {
    if (!ids.length) return Promise.resolve([]);
    return Promise.all(ids.map(id => this.fetchItem(id)));
  }

  fetchByPage(page: number): Promise<IStory[]> {
    const start = (page - 1) * Store.PER_PAGE;
    const end = page * Store.PER_PAGE;
    const ids = this.topStoryIds.slice(start, end);
    return this.fetchItems(ids);
  }

  private subscribe(): void {
    this.api.child('topstories').on('value', snapshot => {
      if (!snapshot) return;

      this.topStoryIds = snapshot.val();
      this.emit('topstories-updated');
    });
  }
}

export { Store };
export default Store.create();
