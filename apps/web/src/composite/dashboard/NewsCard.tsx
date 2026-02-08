'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/design-system/components/ui/card';
import { Separator } from '@/design-system/components/ui/separator';
import { FC } from 'react';

const newsDateFormatter = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export const NewsCard: FC<{ news: any[] }> = ({ news }) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Industry News</CardTitle>
        <CardDescription>
          Latest updates from the plastic industry
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col w-full gap-4">
          {news.map((item, index) => (
            <div key={item.id}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-2 p-2 -mx-2 rounded-md transition-colors hover:bg-muted/50"
              >
                <h4 className="font-semibold text-sm">{item.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
                <time
                  dateTime={item.date}
                  className="text-xs text-muted-foreground mt-2"
                >
                  {newsDateFormatter.format(new Date(item.date))}
                </time>
              </a>
              {index < news.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
