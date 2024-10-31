import {
  Controller,
  ControllerProps,
  FieldError,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';

import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { Label } from './label';
import { Spinner } from './spinner';
import { twClassNames } from '@/lib/utils/class-names';
import { RemixIcon } from './remix-icon';

export const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  // eslint-disable-next-line no-use-before-define
  const itemContext = React.useContext(FormItemContext);
  const { formState, getFieldState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;
  return {
    formDescriptionId: `${id}-form-item-description`,
    formItemId: `${id}-form-item`,
    formMessageId: `${id}-form-item-message`,
    id,
    name: fieldContext.name,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

export const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        className={twClassNames('space-y-1 pb-2', className)}
        ref={ref}
        {...props}
      />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

export const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { formItemId } = useFormField();
  return (
    <Label
      className={twClassNames('font-medium text-base', className)}
      htmlFor={formItemId}
      ref={ref}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

const FormControlVariants = cva(
  'placeholder:text-muted-foreground focus-visible:ring-ring flex w-full items-center bg-transparent  file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default:
          'rounded-md border border-slate-400 shadow-sm transition-colors',
        plain: '',
      },
    },
  }
);

type FormControlProps = {
  isLoading?: boolean;
  skipErrorIcon?: boolean;
} & VariantProps<typeof FormControlVariants>;

export const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  FormControlProps & React.ComponentPropsWithoutRef<typeof Slot>
>(({ isLoading, skipErrorIcon, variant, ...props }, ref) => {
  const { error, formDescriptionId, formItemId, formMessageId } =
    useFormField();

  return (
    <div
      className={twClassNames(FormControlVariants({ variant }), {
        '!border-red-300': !!error,
        'form-input-with-errors': !!error,
      })}
      {...props}
    >
      <Slot
        aria-describedby={
          error
            ? `${formDescriptionId}`
            : `${formDescriptionId} ${formMessageId}`
        }
        aria-invalid={!!error}
        id={formItemId}
        ref={ref}
        {...props}
      />
      {isLoading ? <Spinner /> : undefined}

      {error && !isLoading && !skipErrorIcon ? (
        <RemixIcon
          className="pr-2 text-xl text-red-600"
          name="error-warning-fill"
        />
      ) : undefined}
    </div>
  );
});
FormControl.displayName = 'FormControl';

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      className={twClassNames('text-[0.8rem] text-muted-foreground', className)}
      id={formDescriptionId}
      ref={ref}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

type FormMessageProps = {
  resolver?: (error: FieldError) => React.ReactNode;
};

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  FormMessageProps & React.HTMLAttributes<HTMLParagraphElement>
>(({ children, className, resolver, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  if (!error) {
    return;
  }

  return (
    <p
      className={twClassNames('text-sm font-medium text-red-200', className)}
      id={formMessageId}
      ref={ref}
      {...props}
    >
      {resolver
        ? resolver(error)
        : error?.type === 'custom' && !children
          ? error.message
          : children}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';
