export const getInterSemiBoldFont = async () => {
  const response = await fetch(
    new URL('@/assets/Inter-SemiBold.ttf', import.meta.url),
  );
  const font = await response.arrayBuffer();
  return font;
};
