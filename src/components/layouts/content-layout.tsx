import * as React from 'react';

interface ContentLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <div className="space-y-3 p-3">
      <div className="mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      </div>
      <div className="mx-auto">{children}</div>
    </div>
  );
};
