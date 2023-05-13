{
  (function () {
    // executes after Home Page loads
    const addNewProject = $(".add-new-project");
    const modalContainer = $(".modal-container");
    const closeModal = $(".close-modal");
    const overlay = $(".overlay");

    // open Modal
    addNewProject.click(function () {
      modalContainer.removeClass("hide");
      overlay.show();
    });

    // close Modal
    closeModal.click(function () {
      modalContainer.addClass("hide");
      overlay.hide();
    });

    // Add new project
    const addProjectForm = $("#add-project-form");
    addProjectForm.submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: $(this).attr("action"),
        data: $(this).serialize(),
        success: function (data) {
          const { addedProject } = data;

          // Add newly created project in DOM
          const htmlString = `<a href="/projects/${addedProject._id}"><li><div class="project-heading">
          <h2>${addedProject.title}</h2>
          <span class="status-indicator"></span>
          <p>0 Issues</p>
        </div>
        <p>-By ${addedProject.author}</p>
        <p>${addedProject.desc}</p></li></a>`;
          $(".projects-container > ul").prepend(htmlString);

          // clear values inside create-project form
          $("#add-project-form").each(function () {
            this.reset();
          });
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
