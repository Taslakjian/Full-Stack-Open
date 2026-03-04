const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
    let mostLikes = 0;
    let mostLikesBlog = {};

    blogs.forEach((blog) => {
        if (blog.likes > mostLikes)  {
            mostLikes = blog.likes;
            mostLikesBlog = blog
        };
    });

    return mostLikesBlog;
};

module.exports = { dummy, totalLikes, favoriteBlog };