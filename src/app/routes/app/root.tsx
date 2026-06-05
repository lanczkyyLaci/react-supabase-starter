import { Outlet, useNavigation } from 'react-router';
import { DashboardLayout } from '@/components/layouts';
import { Spinner } from '@/components/ui/spinner.tsx';

export const ErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};

function ContentArea() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  if (isNavigating) {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <Spinner className="size-8 text-muted-foreground" />
      </div>
    );
  }

  return <Outlet />;
}

const AppRoot = () => {
  return (
    <DashboardLayout>
      <ContentArea />
    </DashboardLayout>
  );
};

export default AppRoot;
