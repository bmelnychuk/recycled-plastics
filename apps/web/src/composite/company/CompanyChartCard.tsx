import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/design-system/components/ui/card';
import { AreaChartInteractive } from './AreaChartInteractive';

export const CompanyChartCard = () => {
  return (
    <Card className="h-[300px]">
      <CardHeader>
        <CardTitle>Company visibility</CardTitle>
        <CardDescription>People interested in this company</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <AreaChartInteractive />
      </CardContent>
    </Card>
  );
};
