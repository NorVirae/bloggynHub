module.exports = {
    ensureAuthenticated: function(req,res,next){
        if(req.authenticated) {
            return next();
        }
        req.flash("error_msg", "Please log in to view this resource");
        res.redirect("/login");
    }
}