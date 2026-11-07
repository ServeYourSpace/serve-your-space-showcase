import { Dumbbell, GraduationCap, Hammer, House, PaintRoller, Scissors, Sparkles, Sprout, Wrench, Zap } from 'lucide-react';

const ICONS = { Wrench, Zap, PaintRoller, Sparkles, Hammer, Sprout, House, GraduationCap, Scissors, Dumbbell };

export default function ServiceIcon({ name, ...props }) {
  const Icon = ICONS[name] || Wrench;
  return <Icon aria-hidden {...props} />;
}
