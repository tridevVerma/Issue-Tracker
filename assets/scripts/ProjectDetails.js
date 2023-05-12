{
  (function () {
    console.log("connected");

    $("#filter-selector").click(function (e) {
      const filterText = $("#filter-text");
      const label = $("#filter-selector :selected").parent().attr("label");
      if (label === "Issue Labels") {
        $(filterText).val(e.target.value);
      }
    });

    const filterForm = $("#filter-form");
    $(filterForm).submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "POST",
        url: $(this).attr("action"),
        data: $(this).serialize(),
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
