import { FC, PropsWithChildren } from 'react';

interface FormSectionProps extends PropsWithChildren {
  title: string;
  description: string;
}

export const FormSection: FC<FormSectionProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:gap-6">
      <div className="md:w-[30%] flex flex-col gap-2">
        <h2 className="font-semibold text-foreground">{title}</h2>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      <div className="md:w-[70%] flex flex-col gap-4">{children}</div>
    </div>
  );
};
