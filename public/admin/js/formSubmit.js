$("form").submit(function (event) {
  event.preventDefault();
  var form = $(this);
  var url = form.attr("action");
  var method = form.attr("method");
  var redirect = form.attr("redirect");
  var formData = new FormData(this);
  var btnText = $("button:submit").html();
  $("button:submit").prop("disabled", true);
  $("button:submit").html(
    `<i class="fa fa-spinner fa-spin"></i>&nbsp;&nbsp;${btnText}`
  );
  $(".custom_alert").remove();
  $.ajax({
    url: url,
    type: method,
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    success: function (response) {
      sendformSuccess(response, form);
      if (redirect) {
        setTimeout(function () {
          window.location.replace(redirect);
        }, 500);
      } else {
        $("button:submit").html(btnText);
        $("button:submit").prop("disabled", false);
      }
    },
    error: function (response) {
      $("button:submit").html(btnText);
      $("button:submit").prop("disabled", false);
      sendFormError(response, form);
    },
  });
});

function sendformSuccess(response, form) {
  const html = `<div class="alert alert-success alert-dismissible fade show custom_alert">
                  <button type="button" class="close h-100" data-dismiss="alert" aria-label="Close">
                    <span class="mdi mdi-close"></span>
                  </button>
                  ${response.message}
                </div>`;
  form.prepend(html);
}

function sendFormError(response, form) {
  const html = `<div class="alert alert-danger alert-dismissible fade show custom_alert">
                  <button type="button" class="close h-100" data-dismiss="alert" aria-label="Close">
                    <span class="mdi mdi-close"></span>
                  </button>
                  ${response.responseJSON.message}
                </div>`;
  form.prepend(html);
}
