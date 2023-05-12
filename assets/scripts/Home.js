{
  (function () {
    const addNewProject = $(".add-new-project");
    const modalContainer = $(".modal-container");
    const closeModal = $(".close-modal");
    const overlay = $(".overlay");

    addNewProject.click(function () {
      modalContainer.removeClass("hide");
      overlay.show();
    });

    closeModal.click(function () {
      modalContainer.addClass("hide");
      overlay.hide();
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
          const { addedProject } = data;
          const htmlString = `<div class="project-heading">
          <h2>${addedProject.title}</h2>
          <span class="status-indicator"></span>
          <p>5 Issues</p>
        </div>
        <p>-By ${addedProject.author}</p>
        <p>${addedProject.desc}</p>`;
          const projectsContainer = $(".projects-container > ul");
          $(`<li>`).html(htmlString).prependTo(projectsContainer);

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
