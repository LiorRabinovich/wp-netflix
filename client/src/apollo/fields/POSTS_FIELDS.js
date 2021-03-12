export const POST_FIELDS = `
    title
    date
    content
    extraPostInfo {
      cover {
        mediaItemUrl
      }
      trailer
      description
    }
    featuredImage {
      node {
        mediaItemUrl
      }
    }
    databaseId
`;

export const POSTS_FIELDS = `
    nodes {
      ${POST_FIELDS}
    }
`;