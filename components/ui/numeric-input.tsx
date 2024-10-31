import * as React from 'react';

import { cn } from '@/lib/utils';
import { UseFormReturn } from 'react-hook-form';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  formHandler: UseFormReturn<any, any, undefined>;
}

const NumericInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, formHandler, ...props }) => {
    const handleKeyPress = (event: {
      key: string;
      preventDefault: () => void;
    }) => {
      // Check if the key is a letter (using regex)
      if (/[a-zA-Z]/.test(event.key)) {
        event.preventDefault(); // Prevent the input if it's a letter
      }
    };

    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-md border-zinc-400 bg-muted px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...formHandler.register(props.name, {
          setValueAs: (v) =>
            !v ? undefined : Number(v.toString().replace(/[a-zA-Z]/g, '')),
        })}
        onKeyPress={handleKeyPress}
      />
    );
  }
);
NumericInput.displayName = 'NumericInput';

export { NumericInput };
