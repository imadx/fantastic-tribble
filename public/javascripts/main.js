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

  document.querySelectorAll('.action-reply').forEach((item) => {
    const { threadId } = item.dataset;
    if (!threadId) {
      return;
    }

    item.addEventListener('click', (e) => {
      e.preventDefault();

      const form = document.querySelector(`form[data-thread-id="${threadId}"]`);
      form.classList.toggle('discussion-thread--form--visible');
    });
  });
});
