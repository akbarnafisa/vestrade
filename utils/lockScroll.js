export const lockScroll = (val) => {
  const $body = document.querySelector(`body`);
  val
    ? $body.classList.add(`no-scroll-100`)
    : $body.classList.remove(`no-scroll-100`);
};
