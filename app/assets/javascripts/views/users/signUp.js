Wreddit.Views.SignUp = Backbone.View.extend({
  template: JST['users/signUp'],
  render: function () {
    console.log('UserNew#render')
    var renderedContent = this.template({
    });
    this.$el.html(renderedContent);
    return this;
  },
  events: {
    'click #sign-up-btn': 'signUp'
  },
  signUp: function (event){
    event.preventDefault();
    var attrs = $(event.target.form).serializeJSON();
    if(attrs.user.password !== attrs.user.confirmPassword){
          $('#sign-up-form-errors').html(' <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><div class="alert alert-danger alert-dismissable">Passwords don\'t match</div>')
      return false
    }
    attrs.authenticity_token = $('head').attr('authenticity_token')
    attrs.utf8 = "✓"

    var currentUser = new Wreddit.Models.User(attrs);
    console.log(currentUser)
    currentUser.save([],{
      success: function(model, response){
        Wreddit.router.session_token = response.token;
        Wreddit.router.navigate('#f/'+attrs.user.username, {trigger: true})
        document.cookie =
        "sessionToken="+response.token+"; expires=Thu, 18 Dec 3000 12:00:00 GMT; path=/";
      },
      error: function(model, response){
        _.each(response.responseJSON.errors, function(error){
          $('#sign-up-form-errors').html(' <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><div class="alert alert-danger alert-dismissable">'+error+'</div>')
        })

      },
    })



  }
})