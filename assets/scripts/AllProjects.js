{
  (function () {
    const issueBtn = $(".raise-issue");
    const modalContainer = $(".modal-container");
    const closeModal = $(".close-modal");
    const overlay = $(".overlay");

    issueBtn.click(function (e) {
      modalContainer.removeClass("hide");
      overlay.show();
    });

    closeModal.click(function () {
      modalContainer.addClass("hide");
      overlay.hide();
    });

    const createIssueForm = $("#create-issue-form");
    $(createIssueForm).submit(function (e) {
      e.preventDefault();
      const dataToSend = $(this).serializeArray();
      dataToSend.push({ name: "projectID", value: $(issueBtn).attr("id") });
      $.ajax({
        type: "post",
        url: $(this).attr("action"),
        data: dataToSend,
        success: function (data) {
          console.log(data);
        },
        error: function (err) {
          console.log(err);
        },
      });
    });
  })();
}
