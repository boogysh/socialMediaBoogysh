const initialState = {
  token: null,
  user: null,
  profile: null,
  userFriends: null,
  profileFriends: null,
  posts: [],
  guests: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case "LOGOUT":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case "USER_FRIENDS":
      return {
        ...state,
        userFriends: action.payload,
      };

    case "PROFILE_FRIENDS":
      return {
        ...state,
        profileFriends: action.payload,
      };

    case "POSTS":
      return {
        ...state,
        posts: action.payload.posts,
      };

    case "POST":
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      return {
        ...state,
        posts: updatedPosts,
      };

    case "GUESTS":
      return {
        ...state,
        guests: action.payload,
      };

    // case "RECIEVIED_COMMENTS":
    //   return {
    //     ...state,
    //     recievedComments: action.payload,
    //   };

    case "PROFILE":
      return {
        ...state,
        profile: action.payload,
      };

    default:
      return state;
  }
}
export default userReducer;
