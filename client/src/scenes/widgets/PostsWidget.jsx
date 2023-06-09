import { useState } from "react";
import PostWidget from "./PostWidget";
import { useGetPosts } from "../../hooks/UseGetPosts";
import { useSelector } from "react-redux";
import Error500 from "../Errors/Error500";
import Loader from "../../components/Loader/Loader";

const PostsWidget = ({ userId }) => {
  const [postsUpdate, setPostsUpdate] = useState(0);
  const { token } = useSelector((state) => state.userReducer);
  const isProfile = window.location.href.includes(userId);

  ////--------GET POSTS----custom hook--------------------------

  const postsUrl = `${process.env.REACT_APP_URL}/posts`;
  const { posts, isLoading, error } = useGetPosts(
    postsUrl,
    token,
    isProfile,
    postsUpdate
  );
  //!!! postsUpdate force posts to update, onClick on send-comment-btn

  if (error) return <Error500 />;
  return isLoading ? (
    <Loader />
  ) : (
    <section>
      {posts?.length > 0 &&
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
            postImgUrl,
            userUrl,
            payloadType,
            createdAt,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
              postImgUrl={postImgUrl}
              userUrl={userUrl}
              payloadType={payloadType}
              postsUpdate={postsUpdate}
              setPostsUpdate={setPostsUpdate}
              createdAt={createdAt}
            />
          )
        )}
    </section>
  );
};

export default PostsWidget;
