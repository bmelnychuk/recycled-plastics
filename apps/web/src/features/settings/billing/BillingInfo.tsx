'use client';

import { Button } from '@/design-system/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from '@/design-system/components/ui/card';
import { Check } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';
import { useState } from 'react';
import { SignedInUser } from '@rp/core';
import { Badge } from '@/design-system/components/ui/badge';

const FREE_FEATURES = [
  'Basic material listings',
  'Up to 10 active listings',
  'Community support',
  'Basic analytics',
];

const PRO_FEATURES = [
  '<strong>Unlimited</strong> material listings',
  '<strong>Advanced analytics</strong> dashboard',
  '<strong>Priority</strong> customer support',
  '<strong>API access</strong> for integrations',
  '<strong>Custom branding</strong> options',
  '<strong>Export</strong> data & reports',
];

export const BillingInfo: FC<{ user: SignedInUser }> = ({ user }) => {
  const [isUpgrading, setIsUpgrading] = useState(false);
  const isPro = false;

  const handleUpgradeToPro = async () => {
    setIsUpgrading(true);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error('Failed to start checkout session');
      }
    } catch (error) {
      toast.error('Failed to start checkout session');
    } finally {
      setIsUpgrading(false);
    }
  };

  const handleManageSubscription = async () => {
    setIsUpgrading(true);
    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error('Failed to open billing portal');
      }
    } catch (error) {
      toast.error('Failed to open billing portal');
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Choose Your Plan
        </h1>
        <p className="mt-2 text-muted-foreground">
          Select the plan that best fits your needs
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Free Plan */}
        <Card className="relative">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">Free</CardTitle>
                <div className="mt-3 flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight">
                    $0
                  </span>
                  <span className="ml-2 text-muted-foreground">/month</span>
                </div>
                <CardDescription className="mt-2">
                  Perfect for getting started
                </CardDescription>
              </div>
            </div>
            {!isPro && (
              <CardAction>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  Active
                </Badge>
              </CardAction>
            )}
          </CardHeader>

          <CardContent className="flex-1">
            <ul className="space-y-3 text-sm">
              {FREE_FEATURES.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Pro Plan */}
        <Card className="relative border-2 border-primary shadow-lg">
          <div className="absolute -top-4 left-6">
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              MOST POPULAR
            </span>
          </div>

          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">Pro</CardTitle>
                <div className="mt-3 flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight">
                    $29
                  </span>
                  <span className="ml-2 text-muted-foreground">/month</span>
                </div>
                <CardDescription className="mt-2">
                  To unlock all features
                </CardDescription>
              </div>
            </div>
            {isPro && (
              <CardAction>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  Active
                </Badge>
              </CardAction>
            )}
          </CardHeader>

          <CardContent className="flex-1">
            <ul className="space-y-3 text-sm">
              {PRO_FEATURES.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span dangerouslySetInnerHTML={{ __html: feature }} />
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter>
            <Button
              type="button"
              onClick={isPro ? handleManageSubscription : handleUpgradeToPro}
              disabled={isUpgrading}
              className="w-full"
            >
              {isUpgrading
                ? 'Processing...'
                : isPro
                  ? 'Manage Subscription'
                  : 'Upgrade to Pro'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
