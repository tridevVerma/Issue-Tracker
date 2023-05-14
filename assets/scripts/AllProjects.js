// Get all the authors to populate filter-by-author dropdown
const getAuthors = () => {
  $.ajax({
    type: "GET",
    url: "/issues/authors",
    success: function (data) {
      const authorSelector = $("#author-selector");
      $(authorSelector).empty();
      $(authorSelector).append(
        '<option value="" selected disabled>Filter By Author</option>'
      );
      let htmlString = "";

      data.data.authors.forEach((author) => {
        htmlString += `<option value="${author}">${author}</option>`;
      });
      $(authorSelector).append(htmlString);
    },
    error: function (err) {
      console.log(err);
    },
  });
};

// Get all issue's labels on a project to populate previous-issues drop-down
const getPreviousIssueLabels = (projectID) => {
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

{
  (function () {
    // executes as soon as AllProjects Page loads
    const issueBtn = $(".raise-issue");
    const modalContainer = $(".modal-container");
    const closeModal = $(".close-modal");
    const overlay = $(".overlay");
    let authorID;
    // Open Modal
    issueBtn.click(function (e) {
      modalContainer.removeClass("hide");
      authorID = this.id;
      getPreviousIssueLabels(authorID);
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

      // aggregate all the data needed to create an issue
      const dataToSend = $(this).serializeArray();
      dataToSend.push({ name: "projectID", value: authorID });

      // Make ajax call
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

          // Re-populate all issues labels in filter (including new one)
          getAllIssueLabels(authorID);

          // Re-populate all authors of issues (including new one)
          getAuthors();

          // Update new issue-count
          const currentIssuesCount = $(`#issues-count-${authorID}`).text();
          $(`#issues-count-${authorID}`).text(parseInt(currentIssuesCount) + 1);

          // Remove the text which shows no-content found
          $(".no-issues").empty();
        },
        error: function (err) {
          console.log(err);
        },
      });

      // reset the create-issue form
      $(createIssueForm).each(function () {
        this.reset();
      });

      // close modal after form submission
      modalContainer.addClass("hide");
      overlay.hide();
    });
  })();
}
