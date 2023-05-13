{
  // Get all issue's labels on a project to populate previous-issues drop-down
  const getIssueLabels = (projectID) => {
    $.ajax({
      type: "GET",
      url: `/projects/previous-issues/${projectID}`,
      success: function (data) {
        $("#previous-issues").empty();
        let htmlString = "";
        data.labels.forEach((label) => {
          htmlString += `<option value="${label}"></option>`;
        });

        $("#previous-issues").append(htmlString);
      },
      error: function (err) {
        console.log(err);
      },
    });
  };

  // Get all issue's labels on a project to populate filter-by-label drop-down
  const getAllIssueLabels = (projectID) => {
    $.ajax({
      type: "GET",
      url: `/projects/previous-issues/${projectID}`,
      success: function (data) {
        $("#label-filter-container").empty();
        let htmlString = "";
        data.labels.forEach((label) => {
          htmlString += `<option value="${label}">${label}</option>`;
        });

        $("#label-filter-container").append(htmlString);
      },
      error: function (err) {
        console.log(err);
      },
    });
  };

  (function () {
    // executes as soon as AllProjects Page loads
    const issueBtn = $(".raise-issue");
    const modalContainer = $(".modal-container");
    const closeModal = $(".close-modal");
    const overlay = $(".overlay");

    // Open Modal
    issueBtn.click(function (e) {
      modalContainer.removeClass("hide");
      getIssueLabels(this.id);
      overlay.show();
    });

    // Close Modal
    closeModal.click(function () {
      modalContainer.addClass("hide");
      overlay.hide();
    });

    // Create an Issue on a project
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
          const { newIssue } = data;

          // Insert newly created Issue in the DOM
          let htmlString = "";
          htmlString += `<li>
          <h2>${newIssue.title}</h2>
          <p>-By ${newIssue.author}</p>
          <p>${newIssue.desc}</p>
          <div class="label-tags">
            <ul>
              ${newIssue.labels.map((label) => {
                return `<li>${label}</li>`;
              })}
            </ul>
          </div>
        </li>`;

          $("#details-issues").prepend(htmlString);
          getAllIssueLabels($(issueBtn).attr("id"));
        },
        error: function (err) {
          console.log(err);
        },
      });

      // close modal after form submission
      modalContainer.addClass("hide");
      overlay.hide();
    });
  })();
}
