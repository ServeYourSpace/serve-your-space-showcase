import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

/**
 * Official stacked SERVE YOUR SPACE logo.
 * variant "auto" follows the theme; "white" is for coloured backgrounds.
 */
export default function Wordmark({ variant = 'auto', className }) {
  const { isDark } = useTheme();
  const src =
    variant === 'white' ? '/logo/sys-wordmark-white.png' : isDark ? '/logo/sys-wordmark-dark.png' : '/logo/sys-wordmark-color.png';
  return <img src={src} alt="ServeYourSpace" width="167" height="106" className={cn('h-16 w-auto', className)} dir="ltr" />;
}
