"use client";

import { UserViewModel } from "@/backend";
import { useApiClient } from "@/backend/api/client";
import { Button } from "@/design-system/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const CheckoutStatus = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isSettingUp, setIsSettingUp] = useState(true);
  const [user, setUser] = useState<UserViewModel | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(
    "Setting up your account..."
  );
  const [hasError, setHasError] = useState(false);
  const apiFetch = useApiClient();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let messageIntervalId: NodeJS.Timeout;
    let attemptCount = 0;
    const maxAttempts = 20;
    const messages = [
      "Setting up your account...",
      "Activating Pro features...",
      "Almost ready...",
    ];
    let messageIndex = 0;

    const pollUserStatus = async () => {
      try {
        attemptCount++;
        const currentUser = await apiFetch<UserViewModel>("/me");
        if (currentUser?.plan === "pro") {
          setUser(currentUser);
          setIsSettingUp(false);
          clearInterval(intervalId);
          clearInterval(messageIntervalId);
        } else if (attemptCount >= maxAttempts) {
          setIsSettingUp(false);
          setHasError(true);
          clearInterval(intervalId);
          clearInterval(messageIntervalId);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        if (attemptCount >= maxAttempts) {
          setIsSettingUp(false);
          setHasError(true);
          clearInterval(intervalId);
          clearInterval(messageIntervalId);
        }
      }
    };

    // Start polling immediately
    pollUserStatus();

    // Poll every 500ms
    intervalId = setInterval(pollUserStatus, 500);

    // Cycle through loading messages every 2 seconds
    messageIntervalId = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setLoadingMessage(messages[messageIndex]);
    }, 2000);

    // Cleanup on unmount
    return () => {
      clearInterval(intervalId);
      clearInterval(messageIntervalId);
    };
  }, [apiFetch]);

  if (isSettingUp) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
          <h1 className="text-2xl font-bold">{loadingMessage}</h1>
          <p className="mt-2 text-muted-foreground">
            This will only take a moment.
          </p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-10 w-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold">Setup Taking Longer Than Expected</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your payment was successful, but your account setup is still in progress.
            This can take a few minutes.
          </p>

          <div className="mt-8 space-y-3">
            <Button onClick={() => window.location.reload()} size="lg" variant="default">
              Refresh Page
            </Button>
            <Button onClick={() => router.push("/")} size="lg" variant="outline">
              Go to Dashboard
            </Button>
          </div>

          {sessionId && (
            <p className="mt-6 text-xs text-muted-foreground">
              Session ID: {sessionId}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold">Welcome to Pro!</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your subscription has been successfully activated.
        </p>

        <div className="mt-8">
          <Button onClick={() => router.push("/")} size="lg">
            Go to Dashboard
          </Button>
        </div>

        {sessionId && (
          <p className="mt-6 text-xs text-muted-foreground">
            Session ID: {sessionId}
          </p>
        )}
      </div>
    </div>
  );
};
