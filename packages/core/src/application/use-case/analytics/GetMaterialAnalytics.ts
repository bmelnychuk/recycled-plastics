import { AnalyticsStore } from '../../../domain/analytics/AnalyticsStore';
import { MaterialAnalytics } from '../../../domain/analytics/MaterialAnalytics';
import { assertUserCanSeeAnalytics, User } from '../../auth/User';

export class GetMaterialAnalytics {
  constructor(private readonly analyticsStore: AnalyticsStore) {}

  async invoke(input: {
    user: User;
    category: string;
  }): Promise<MaterialAnalytics[]> {
    assertUserCanSeeAnalytics(input.user);

    switch (input.category) {
      case 'by-date': {
        return this.analyticsStore.getAnalyticsByDate();
      }
      case 'by-country': {
        return this.analyticsStore.getAnalyticsByCountry();
      }
      default:
        throw new Error('Invalid category');
    }
  }
}
