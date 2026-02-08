import { MaterialColor } from '@rp/core';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/design-system/components/ui/tooltip';
import { FC } from 'react';

const materialTailwindColorMap: Record<string, string> = {
  red: 'bg-red-500',
  green: 'bg-emerald-500',
  blue: 'bg-sky-500',
  yellow: 'bg-amber-400',
  orange: 'bg-orange-400',
  gray: 'bg-gray-400',
  brown: 'bg-stone-500',
  black: 'bg-black',
  white: 'bg-white border border-gray-300',
  purple: 'bg-purple-400',
  pink: 'bg-pink-400',
  cyan: 'bg-cyan-400',
  teal: 'bg-teal-500',
  lime: 'bg-lime-400',
  indigo: 'bg-indigo-500',
  violet: 'bg-violet-400',
  gold: 'bg-yellow-400',
  silver: 'bg-gray-300',
  bronze: 'bg-orange-700',
  transparent: 'bg-transparent border border-gray-300',
  mixed: 'bg-gradient-to-r from-red-500 via-blue-500 to-green-500',
  natural: 'bg-amber-100 border border-amber-300',
  terracotta: 'bg-orange-600',
  // Add more mappings as needed
};

export const ColorLabel: FC<{ color: MaterialColor }> = ({ color }) => {
  return <div className="capitalize">{color}</div>;
};

export const ColorPreview: FC<{ color: MaterialColor }> = ({ color }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`w-4 h-4 rounded-full ${
            materialTailwindColorMap[color.toLowerCase()] || 'bg-gray-300'
          }`}
        />
      </TooltipTrigger>
      <TooltipContent>
        <ColorLabel color={color} />
      </TooltipContent>
    </Tooltip>
  );
};

export const ColorLabelWithPreview: FC<{ color: MaterialColor }> = ({
  color,
}) => {
  return (
    <div className="flex items-center gap-2">
      <ColorPreview color={color} />
      <ColorLabel color={color} />
    </div>
  );
};
