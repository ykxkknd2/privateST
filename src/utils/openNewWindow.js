export default function openNewWindow(url) {
  let a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('target', '_blank');
  a.click();
}
