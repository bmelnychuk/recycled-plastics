import Link from 'next/link';
import {
  MaterialSupply,
  MaterialDemand,
  MessageThreadViewModel,
} from '@rp/core';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/design-system/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from '@/design-system/components/ui/card';
import { CircleFlag } from 'react-circle-flags';
import { PriceValue } from '@/features/common/PriceValue';
import { CountryName } from '../common/CountryName';
import {
  MaterialTypeLabel,
  MinMaxValueLabel,
} from '@/features/material/labels';
import { ColorLabel } from '../material/MaterialColor';

export function MaterialPreviewCard({
  topic,
  material,
}: {
  topic: MessageThreadViewModel['topic'];
  material: MaterialSupply | MaterialDemand;
}) {
  const topicUrl = `/companies/${topic.companyId}/${topic.type}/${topic.id}`;
  const countryCode = material.location?.country;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold truncate">
            {'name' in material
              ? material.name
              : `${material.material.type.toUpperCase()} ${material.material.color}`}
          </h3>
          <p className="text-sm text-muted-foreground font-medium capitalize">
            {topic.type}
          </p>
        </div>
        <CardAction>
          <Link href={topicUrl} target="_blank">
            <Button variant="ghost">
              <ExternalLink />
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-muted-foreground mb-0.5">Material</div>
            <div className="text-sm font-semibold truncate">
              <MaterialTypeLabel type={material.material.type} />
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-0.5">Color</div>
            <div className="text-sm font-semibold truncate">
              <ColorLabel color={material.material.color} />
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-0.5">
              Viscosity
            </div>
            <div className="text-sm font-semibold truncate">
              <MinMaxValueLabel
                value={material.material.viscosity?.value}
                fallback="-"
              />
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-0.5">
              Price / kg
            </div>
            <div className="text-sm font-semibold truncate">
              <PriceValue price={material.price} />
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-0.5">Amount</div>
            <div className="text-sm font-semibold truncate">
              {material.amount.toLocaleString()} t
            </div>
          </div>
          {countryCode && (
            <div>
              <div className="text-xs text-muted-foreground mb-0.5">
                Location
              </div>
              <div className="text-sm font-semibold flex items-center gap-1.5 truncate">
                <CircleFlag
                  countryCode={countryCode.toLowerCase()}
                  height="14"
                  width="14"
                />
                <span className="truncate">
                  <CountryName countryCode={countryCode} />
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
