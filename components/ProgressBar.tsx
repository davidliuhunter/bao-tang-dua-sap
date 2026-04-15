'use client';

import { AppProgressBar as NProgressBar } from 'next-nprogress-bar';

export default function ProgressBar() {
  return (
    <NProgressBar
      height="3px"
      color="#f59e0b"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
