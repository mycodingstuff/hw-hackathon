import { twClassNames } from '@/lib/utils/class-names';

type SpinnerProps = {
  customClassName?: string;
};
export const Spinner = ({ customClassName }: SpinnerProps) => {
  return (
    <div
      className={twClassNames(
        'mr-3 size-5 animate-spin rounded-full border-t-2 border-solid border-purple-600',
        customClassName
      )}
    />
  );
};
