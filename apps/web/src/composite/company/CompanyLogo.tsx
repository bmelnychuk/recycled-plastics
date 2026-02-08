import { Building2 } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/design-system/components/ui/avatar';

interface CompanyLogoProps {
  logo?: string | null;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: {
    avatar: 'h-14 w-14',
    icon: 'h-6 w-6',
  },
  md: {
    avatar: 'h-16 w-16',
    icon: 'h-8 w-8',
  },
  lg: {
    avatar: 'h-20 w-20',
    icon: 'h-10 w-10',
  },
};

export const CompanyLogo = ({ logo, name, size = 'md' }: CompanyLogoProps) => {
  const classes = sizeClasses[size];

  return (
    <Avatar
      className={`${classes.avatar} flex-shrink-0 border-1 border-primary bg-transparent`}
    >
      {logo ? <AvatarImage src={logo} alt={name} /> : null}
      <AvatarFallback className="bg-transparent">
        <Building2 className={classes.icon} />
      </AvatarFallback>
    </Avatar>
  );
};
