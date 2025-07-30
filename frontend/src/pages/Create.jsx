import CreatePost from '@/components/Post/CreatePost';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Create = () => {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Share Your Moment</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <CreatePost />
        </CardContent>
      </Card>
    </div>
  );
};

export default Create;