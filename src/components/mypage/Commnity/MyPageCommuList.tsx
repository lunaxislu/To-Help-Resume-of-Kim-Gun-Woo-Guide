import { Post } from '../../../pages/community/api/model';
import MyPageCommuCard from './MyPageCommuCard';

interface MyPageCommuProps {
  posts: Post[];
  selectCategory: string;
}
const MyPageCommuList = ({ posts, selectCategory }: MyPageCommuProps) => {
  return (
    <div>
      {posts && posts.length > 0 && (
        <MyPageCommuCard posts={posts} selectCategory={selectCategory} />
      )}
    </div>
  );
};

export default MyPageCommuList;
