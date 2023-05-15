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

  (function () {
    getAuthors();

    // Get authorID from url and populate all issue labels associated to that label
    const urlString = window.location.href;
    const authorID = urlString.split("/")[4];
    getAllIssueLabels(authorID);

    $("#get-all-issues-btn").click(function () {
      window.location.reload();
    });

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
              msg = "Filtered";
            } else {
              msg = "Nothing to show";
            }
            $("#show-filtered-heading").text(`${msg} Issues`);

            // Empty the issues container and populate filtered issues in it
            const container = $(".issues-container > ul");
            $(container).empty();

            // Render new filtered data in DOM
            data.filteredData.forEach((issue) => {
              const htmlString = htmlGenerator(issue);
              $(container).append(htmlString);
            });

            // reset the filter form
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
