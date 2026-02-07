import {
  MaterialAnalyticsByCountry,
  MaterialAnalyticsByDate,
} from './MaterialAnalytics';
import { PlatformAnalytics } from './PlatformAnalytics';
import {
  AnalyticsEvent,
  ItemViewedEvent,
  ViewedTarget,
  ViewsAnalyticsData,
} from './ViewAnalytics';

export interface AnalyticsStore {
  getViewsAnalytics(target: ViewedTarget): Promise<ViewsAnalyticsData>;
  saveViewsAnalytics(views: ViewsAnalyticsData): Promise<void>;

  getAnalyticsByDate(): Promise<MaterialAnalyticsByDate[]>;
  getAnalyticsByCountry(): Promise<MaterialAnalyticsByCountry[]>;
  saveAnalyticsByDate(data: MaterialAnalyticsByDate[]): Promise<void>;
  saveAnalyticsByCountry(data: MaterialAnalyticsByCountry[]): Promise<void>;

  savePlatformAnalytics(data: PlatformAnalytics): Promise<void>;
  getPlatformAnalytics(): Promise<PlatformAnalytics>;
}

export interface AnalyticsEventStore {
  saveEvent<T extends AnalyticsEvent>(event: T): Promise<void>;
  getItemViewedEvents(startDate: Date): Promise<ItemViewedEvent[]>;
}
