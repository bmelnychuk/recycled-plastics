import { AnalyticsStore } from '../../../domain/analytics/AnalyticsStore';
import {
  ViewedTarget,
  ViewsAnalyticsData,
} from '../../../domain/analytics/ViewAnalytics';
import { assertUserCanSeeAnalytics, User } from '../../auth/User';

export class GetViewsAnalytics {
  constructor(private readonly analyticsStore: AnalyticsStore) {}

  async invoke(input: {
    user: User;
    target: ViewedTarget;
  }): Promise<ViewsAnalyticsData> {
    assertUserCanSeeAnalytics(input.user);
    return this.analyticsStore.getViewsAnalytics(input.target);
  }
}
