{
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
    const labelForm = $("#filter-by-issue-labels");
    const authorForm = $("#filter-by-author");
    const searchForm = $("#search-title-desc");

    [labelForm, authorForm, searchForm].forEach((filterForm) => {
      $(filterForm).submit(function (e) {
        e.preventDefault();

        $.ajax({
          type: "POST",
          url: $(this).attr("action"),
          data: $(this).serialize(),
          success: function (data) {
            console.log();
            const container = $(".issues-container > ul");
            $(container).empty();

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
