export const GET_MENU = `
  menu(id: "main", idType: NAME) {
    menuItems {
      nodes {
        url
        label
      }
    }
  }
`;