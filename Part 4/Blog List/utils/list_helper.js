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

const mostBlogs = (blogs) => {
    const map = new Map();

    blogs.forEach((blog) => {
        if (map.has(blog.author)) {
            map.set(blog.author, map.get(blog.author) + 1);
        } else {
            map.set(blog.author, 1);
        }
    });

    const mapEntryIterator = map.entries();
    let highestNumberOfBlogs = 0;
    const result = {};

    for (let i = 0; i < map.size; i++) {
        const currentEntry = mapEntryIterator.next().value;
        const [author, numberOfBlogs] = currentEntry;

        if (numberOfBlogs > highestNumberOfBlogs) {
            highestNumberOfBlogs = numberOfBlogs;
            result.author = author;
            result.blogs = numberOfBlogs;
        }
    }

    return result;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };