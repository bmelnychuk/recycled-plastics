import { Button } from "@/design-system/components/ui/button";
import { SignInButton as ClerkSignInButton } from "@clerk/nextjs";
import { FC } from "react";

export const SignInButton: FC<{ variant?: "outline" | "default" }> = ({ variant = "default" }) => {
  return (
    <ClerkSignInButton mode="modal">
      <Button variant={variant}>
        Sign in
      </Button>
    </ClerkSignInButton>
  );
};
