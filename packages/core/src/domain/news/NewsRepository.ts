import { News } from './News';

export interface NewsRepository {
  save(news: News): Promise<void>;
  getLatest(): Promise<News[]>;
}
