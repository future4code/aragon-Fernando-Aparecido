export const goToFeedPage = (navigate) => {
    navigate("/");
};

export const goToPostDetailsPage = (navigate, postId) => {
    navigate(`/post/${postId}`);
};

export const goToLoginPage = (navigate) => {
    navigate("/login");
};

export const goToSignUpPage = (navigate) => {
    navigate("/signup");
};