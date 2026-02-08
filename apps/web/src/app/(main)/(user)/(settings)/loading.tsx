import { Spinner } from '@/design-system/components/ui/spinner';

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="p-4">
      <Spinner />
    </div>
  );
}
