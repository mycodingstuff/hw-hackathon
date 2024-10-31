import { twClassNames } from '@/lib/utils/class-names';

type RemixIconProps = {
  className?: string;
  name: string;
  onClick?: () => void;
};
const remixPrefix = 'ri';
export const RemixIcon = ({ className, name, onClick }: RemixIconProps) => {
  const customProps: Record<string, unknown> = {};

  if (onClick) {
    customProps.onClick = onClick;
    customProps.onKeyDown = onClick;
    customProps.role = 'button';
    customProps.tabIndex = 0;
  }

  return (
    <i
      className={twClassNames(
        className,
        'leading-none',
        `${remixPrefix}-${name}`
      )}
      {...customProps}
    />
  );
};
