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

  document.querySelectorAll('.action-upvote').forEach((item) => {
    const { threadId } = item.dataset;
    if (!threadId) {
      return;
    }

    item.addEventListener('click', (e) => {
      e.preventDefault();

      const element = document.querySelector(`[data-thread-id="${threadId}"]`);
      element.dataset.upvotes = Number(element.dataset.upvotes) + 1;

      var xhr = new XMLHttpRequest();
      xhr.open('POST', `/thread/${threadId}/upvote`, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 201) {
          let response = this.response;
          if (typeof response === 'string') {
            response = JSON.parse(response);
          }

          element.dataset.upvotes = response.count;
        }
      };
      xhr.send(null);
    });
  });
});
