module.exports.UI = (req, res) => {
  req.flash("success", "successfully rendered Home Page!!");
  return res.render("Home", {
    title: "Home",
  });
};
