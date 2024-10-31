import { motion } from 'framer-motion';
import Link from 'next/link';

import { ExtendedSession } from '@/app/(auth)/auth';

interface OverviewProps {
  session: ExtendedSession;
}

export const Overview = ({ session }: OverviewProps) => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
        <Link
          href={`/profile/${session.user.id}`}
          className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
        >
          Edit my profile
        </Link>
      </div>
    </motion.div>
  );
};
