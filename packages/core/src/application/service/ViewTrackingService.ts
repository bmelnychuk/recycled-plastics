import { startOfMinute } from 'date-fns';
import {
  ItemViewedEventSchema,
  ViewedTarget,
} from '../../domain/analytics/ViewAnalytics';

import { newUuid } from '../../lib/identity';
import { User } from '../auth/User';
import { AnalyticsEventStore } from '../../domain/analytics/AnalyticsStore';

export class ViewTrackingService {
  constructor(private readonly eventStore: AnalyticsEventStore) {}

  public async trackView(user: User, target: ViewedTarget): Promise<void> {
    const viewEvent = ItemViewedEventSchema.parse({
      type: 'ItemViewed',
      id: newUuid(),
      eventDate: new Date().toISOString(),
      payload: {
        visitor: { id: user.id, companyId: user.companyId },
        target,
      },
    });

    const startDate = startOfMinute(new Date());
    const recent = await this.eventStore.getItemViewedEvents(startDate);

    const userEvents = recent.filter(
      ({ payload }) =>
        payload.visitor.id === user.id &&
        payload.target.targetId === viewEvent.payload.target.targetId,
    );

    if (userEvents.length > 0) return;

    await this.eventStore.saveEvent(viewEvent);
  }
}
