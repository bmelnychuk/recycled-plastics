import { Building2 } from 'lucide-react';
import { FC } from 'react';

export const CompanyVerificationIcon: FC<{ verified: boolean }> = ({
  verified,
}) => {
  return (
    <Building2
      size={16}
      className={verified ? 'text-green-500' : 'text-gray-500'}
    />
  );
};
