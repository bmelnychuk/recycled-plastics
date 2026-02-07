import { NewsRepository } from '../../../domain/news/NewsRepository';
import { News } from '../../../domain/news/News';

export class GetLatestNewsUseCase {
  constructor(private readonly newsRepository: NewsRepository) {}

  public async invoke(): Promise<News[]> {
    return this.newsRepository.getLatest();
  }
}
