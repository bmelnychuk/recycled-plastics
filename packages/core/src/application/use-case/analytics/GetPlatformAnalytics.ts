import { AnalyticsStore } from '../../../domain/analytics/AnalyticsStore';
import { PlatformAnalytics } from '../../../domain/analytics/PlatformAnalytics';
import { assertUserCanSeeAnalytics, User } from '../../auth/User';

export class GetPlatformAnalytics {
  constructor(private readonly analyticsStore: AnalyticsStore) {}

  async invoke(user: User): Promise<PlatformAnalytics> {
    assertUserCanSeeAnalytics(user);
    return this.analyticsStore.getPlatformAnalytics();
  }
}
