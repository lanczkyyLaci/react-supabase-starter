import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner.tsx';
import { usersQuery } from '@/api/query-options/query-users.ts';
import { ContentLayout } from '@/components/layouts/content-layout.tsx';

const Profile = () => {
  const { data: users, isLoading } = useQuery(usersQuery());

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <Spinner className="size-8 text-muted-foreground" />
      </div>
    );
  }

  return (
    <ContentLayout title="Profile">
      <div className="space-y-2">
        {users?.map((user, index) => (
          <div key={index}>
            <p>{user.id}</p>
            <p>{user.role}</p>
          </div>
        ))}
      </div>
    </ContentLayout>
  );
};

export default Profile;
