import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SuggestedUser {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  mutualFollowers: number;
}

interface SuggestedUsersProps {
  users: SuggestedUser[];
}

const SuggestedUsers = ({ users }: SuggestedUsersProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Suggested for you</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">{user.username}</p>
                <p className="text-xs text-muted-foreground">
                  {user.mutualFollowers} mutual followers
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Follow
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SuggestedUsers;