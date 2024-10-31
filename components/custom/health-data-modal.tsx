'use client';

import { usePathname, useRouter } from 'next/navigation';
import { type User } from 'next-auth';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { HealthData } from '@/db/schema';
import { fetcher, isEmptyObject } from '@/lib/utils';

export function HealthDataModal({ user }: { user: User | undefined }) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const pathname = usePathname();
  const {
    data: healthdata,
    isLoading,
    mutate,
  } = useSWR<HealthData>(user ? '/api/profile' : null, fetcher, {
    fallbackData: undefined,    
    revalidateOnFocus: false,
  });

  useEffect(() => {
    mutate();
  }, [pathname, mutate]);

  useEffect(() => {
    if (isEmptyObject(healthdata) && !isLoading) {
      setShowDeleteDialog(true);
    }
  }, [healthdata, isLoading]);

  const handleContinue = async () => {
    router.push(`/profile/${user?.id}`);
  };

  return (
    <AlertDialog open={showDeleteDialog} onOpenChange={handleContinue}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Welcome to Should I Eat? </AlertDialogTitle>
          <AlertDialogDescription>
            For a better experience we need to collect some data first, when
            closing this alert or clicking on the continuet button you will be
            redirected to your profile so you can fill it up.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleContinue}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
