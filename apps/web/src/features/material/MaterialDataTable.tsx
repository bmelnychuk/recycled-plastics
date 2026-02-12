import { MaterialData, MinMax } from '@rp/core';
import { FC } from 'react';
import { MaterialConditionLabel, MaterialTypeLabel } from './labels';
import {
  ColorLabel,
  ColorLabelWithPreview,
  ColorPreview,
} from './MaterialColor';

export type MaterialProperty = keyof MaterialData;
export type MaterialPropertyValue = MaterialData[MaterialProperty];

export const MaterialDataTable: FC<{ material: MaterialData }> = ({
  material,
}) => {
  const materialProperties = Object.keys(material) as MaterialProperty[];
  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="min-w-full divide-y divide-border text-sm">
        <tbody className="divide-y divide-border">
          {materialProperties
            .filter((p) =>
              Array.isArray(material[p])
                ? Boolean(material[p].length)
                : Boolean(material[p]),
            )
            .map((property) => (
              <tr key={property}>
                <th className="w-1/3 whitespace-nowrap bg-muted/50 px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {Labels[property] || property}
                </th>
                <td className="px-4 py-2.5 text-sm font-medium">
                  <MaterialDataValue property={property} data={material} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

interface MaterialDataValueProps {
  property: MaterialProperty;
  data: MaterialData;
}

export const MaterialDataValue: FC<MaterialDataValueProps> = (props) => {
  if (props == null) return null;
  switch (props.property) {
    case 'type':
      return <MaterialTypeLabel type={props.data.type} />;
    case 'color':
      return <ColorLabelWithPreview color={props.data.color} />;
    case 'condition':
      return <MaterialConditionLabel condition={props.data.condition} />;
    case 'packagingTypes':
      return (
        <>{props.data.packagingTypes?.map((v) => humanize(v)).join(', ')}</>
      );
    case 'recycledContent':
      return <>{formatMinMaxValue(props.data.recycledContent?.value)}</>;
    case 'chainOfCustody':
      return <>{humanize(props.data.chainOfCustody)}</>;
    case 'recyclingMethod':
      return <>{humanize(props.data.recyclingMethod)}</>;
    case 'source':
      return <>{humanize(props.data.source)}</>;
    case 'processingMethods':
      return (
        <>{props.data.processingMethods?.map((v) => humanize(v)).join(', ')}</>
      );
    case 'intendedMarket':
      return <>{humanize(props.data.intendedMarket)}</>;
    case 'viscosity':
      return <>{formatMinMaxValue(props.data.viscosity?.value)}</>;
    case 'density':
      return <>{formatMinMaxValue(props.data.density?.value)}</>;
    case 'bulkDensity':
      return <>{formatMinMaxValue(props.data.bulkDensity?.value)}</>;
    case 'ashContent':
      return <>{formatMinMaxValue(props.data.ashContent?.value)}</>;
    case 'residualMoistureContent':
      return (
        <>{formatMinMaxValue(props.data.residualMoistureContent?.value)}</>
      );
    case 'fillers':
      return (
        <div>
          {props.data.fillers?.map((f) => (
            <div key={f.type}>
              <span>{humanize(f.type)}:</span>
              <span>{formatMinMaxValue(f.value)}</span>
            </div>
          ))}
        </div>
      );
    case 'certificateOfAnalysis':
      return <>{props.data.certificateOfAnalysis ? 'Yes' : 'No'}</>;
  }
};

const humanize = (s?: string | null): string =>
  s
    ? s
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : '-';

const formatMinMax = (m: MinMax): string => {
  const { min, max } = m;
  if (min !== undefined && max !== undefined) return `${min} - ${max}`;
  if (min !== undefined) return `≥ ${min}`;
  if (max !== undefined) return `≤ ${max}`;
  return '—';
};

const formatMinMaxValue = (value?: MinMax | null): string =>
  value ? formatMinMax(value) : '-';

const Labels = {
  type: 'Type',
  color: 'Color',
  condition: 'Condition',
  packagingTypes: 'Packaging Types',
  recycledContent: 'Recycled Content',
  chainOfCustody: 'Chain of Custody',
  recyclingMethod: 'Recycling Method',
  source: 'Source',
  processingMethods: 'Processing Methods',
  intendedMarket: 'Intended Market',
  viscosity: 'Viscosity',
  density: 'Density',
  bulkDensity: 'Bulk Density',
  ashContent: 'Ash Content',
  residualMoistureContent: 'Residual Moisture Content',
  fillers: 'Fillers',
  certificateOfAnalysis: 'Certificate of Analysis',
};
