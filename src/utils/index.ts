/** @description 生成元素 */
export const _createEl = (element: HTMLElement) => {
  const { x, y, width, height } = element.getBoundingClientRect();
  const el = document.createElement("div");
  el.style.position = "fixed";
  el.style.top = `${y + height / 2}px`;
  el.style.left = `${x + width / 2}px`;
  el.style.width = "2px";
  el.style.height = "2px";
  el.style.borderRadius = "50%";

  el.style.backgroundColor = "red";
  document.body!.appendChild(el);
};
