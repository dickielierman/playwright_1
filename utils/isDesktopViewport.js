export const isDesktopVeiwport = (page) => {
  const size = page.viewportSize();
  return size.width >= 600;
};
