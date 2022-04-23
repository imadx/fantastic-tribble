window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.created-at').forEach((item) => {
    item.innerText = dateFns.distanceInWords(
      new Date(),
      new Date(item.innerText),
      {
        addSuffix: true,
      }
    );
  });
});
