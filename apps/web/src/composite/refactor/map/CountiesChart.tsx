import { CircleFlag } from "react-circle-flags";

const chartData = [
  { month: "Germany", desktop: 305, mobile: 200, code: "DE" },
  { month: "France", desktop: 237, mobile: 120, code: "FR" },
  { month: "Italy", desktop: 214, mobile: 140, code: "IT" },
  { month: "Spain", desktop: 209, mobile: 130, code: "ES" },
  { month: "Portugal", desktop: 186, mobile: 80, code: "PT" },
  { month: "Greece", desktop: 73, mobile: 190, code: "GR" },
  { month: "Poland", desktop: 73, mobile: 190, code: "PL" },
  { month: "Czech Republic", desktop: 73, mobile: 190, code: "CZ" },
  { month: "Hungary", desktop: 73, mobile: 190, code: "HU" },
  { month: "Slovakia", desktop: 73, mobile: 190, code: "SK" },
  { month: "Croatia", desktop: 73, mobile: 190, code: "HR" },
  { month: "Slovenia", desktop: 73, mobile: 190, code: "SI" },
  { month: "Montenegro", desktop: 73, mobile: 190, code: "ME" },
  { month: "Albania", desktop: 73, mobile: 190, code: "AL" },
  { month: "Serbia", desktop: 73, mobile: 190, code: "RS" },
  { month: "Kosovo", desktop: 73, mobile: 190, code: "XK" },
  { month: "Moldova", desktop: 73, mobile: 190, code: "MD" },
  { month: "Romania", desktop: 73, mobile: 190, code: "RO" },
  { month: "Bulgaria", desktop: 73, mobile: 190, code: "BG" },
];

export const CountiesChart = () => {
  const maxValue = Math.max(...chartData.map((data) => data.desktop));
  return (
    <div className="flex flex-col gap-4 w-full py-4">
      {chartData.map((data, index) => {
        const value = (data.desktop / maxValue) * 100;
        return (
          <div className="flex items-center gap-4 w-full" key={index}>
            <CircleFlag
              countryCode={data.code.toLowerCase()}
              height="22"
              width="22"
            />
            <div className="flex flex-col gap-1.5 w-full">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{data.month}</span>
                <span>{data.desktop} tons</span>
              </div>
              <div className="w-full h-2 rounded-full bg-primary/20 overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
