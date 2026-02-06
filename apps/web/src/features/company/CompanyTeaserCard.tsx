import { FC } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Button } from "@/design-system/components/ui/button";
import { Building2 } from "lucide-react";
import Link from "next/link";
import { SignInButton } from "@/features/auth/SignInButton";


export const CompanyTeaserCard: FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col ">
          <div className="mb-6">
            <div className="flex items-start gap-4 blur-[5px]">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Building2 className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-slate-900">
                  Lorem Ipsum Dolor Sit
                </p>
                <p className="text-sm text-muted-foreground">
                  Consectetur adipiscing elit
                </p>
              </div>
            </div>
          </div>

          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            Sign in to view company details
          </h3>
          <ul className="mb-6 space-y-2 text-sm">
            <li className="flex items-center gap-2 text-slate-700">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Get in touch with the company
            </li>
            <li className="flex items-center gap-2 text-slate-700">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Access uploaded material datasheets
            </li>
            <li className="flex items-center gap-2 text-slate-700">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Free and simple setup
            </li>
          </ul>

          <div className="flex justify-end gap-3">
            <SignInButton variant="outline" />           
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
