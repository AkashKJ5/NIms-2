export const tabHandling = (value) => {
  const Tabs = [
    { label: "Home", route: "/dashboard" },
    { label: "Snag", route: "/projects" },
    { label: "Desnag", route: "/projects" },
    { label: "Fix", route: "/projects" },
    { label: "Account", route: "/user-profile" },
  ];
  localStorage.setItem("tab", JSON.stringify({ id: value, name: Tabs[value] }));
  return JSON.parse(localStorage.getItem("tab"));
};
