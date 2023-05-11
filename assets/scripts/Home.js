{
  (function () {
    const addNewProject = $(".add-new-project");
    const modalContainer = $(".modal-container");
    const closeModal = $(".close-modal");

    addNewProject.click(function () {
      modalContainer.removeClass("hide");
    });

    closeModal.click(function () {
      modalContainer.addClass("hide");
    });

    const addProjectForm = $("#add-project-form");
    addProjectForm.submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: $(this).attr("action"),
        data: $(this).serialize(),
        success: function (data) {
          console.log(data);
          $("#add-project-form").each(function () {
            this.reset();
          });
        },
        error: function (err) {
          console.log(err);
        },
      });
    });
  })();
}
