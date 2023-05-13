{
  // Generate HTML string for new issues
  const htmlGenerator = (issue) => {
    return `<li>
    <h2>${issue.title}</h2>
    <p>-By ${issue.author}</p>
    <p>${issue.desc}</p>
    <div class="label-tags">
      <ul>
        ${issue.labels.map((label) => {
          return `<li>${label}</li>`;
        })}
      </ul>
    </div>
  </li>`;
  };

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
    getAuthors();

    // Get authorID from url and populate all issue labels associated to that label
    const urlString = window.location.href;
    const authorID = urlString.split("/")[4];
    getAllIssueLabels(authorID);

    const labelForm = $("#filter-by-issue-labels");
    const authorForm = $("#filter-by-author");
    const searchForm = $("#search-title-desc");

    // Attach listener to all types of fiters
    [labelForm, authorForm, searchForm].forEach((filterForm) => {
      $(filterForm).submit(function (e) {
        e.preventDefault();

        $.ajax({
          type: "POST",
          url: $(this).attr("action"),
          data: $(this).serialize(),
          success: function (data) {
            // Give message after filtered applied
            let msg = "";
            if (data.filteredData?.length > 0) {
              msg = "Filters Applied";
            } else {
              msg = "Nothing to show";
            }
            $("#show-filtered-heading").text(`Issues : ${msg}`);
            const container = $(".issues-container > ul");
            $(container).empty();

            // Render new filtered data in DOM
            data.filteredData.forEach((issue) => {
              const htmlString = htmlGenerator(issue);
              $(container).append(htmlString);
            });

            $(filterForm).each(function () {
              this.reset();
            });
          },
          error: function (err) {
            console.log(err.Message);
          },
        });
      });
    });
  })();
}
