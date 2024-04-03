var totalSteps = $(".steps li").length;

$(".submit").on("click", function () {
  return false;
});

$(".steps li:nth-of-type(1)").addClass("active");
$(".myContainer .form-container:nth-of-type(1)").addClass("active");

$(".form-container").on("click", ".next", function () {
  $(".steps li")
    .eq($(this).parents(".form-container").index() + 1)
    .addClass("active");
  $(this)
    .parents(".form-container")
    .removeClass("active")
    .next()
    .addClass("active flipInX");
});

function initMap() {
  // The location of Geeksforgeeks office
  const gfg_office = {
    lat: 21.1702,
    lng: 72.8311,
  };

  // Create the map, centered at gfg_office
  const map = new google.maps.Map(document.getElementById("map"), {
    // Set the zoom of the map
    zoom: 17.56,
    center: gfg_office,
  });

  var myMarker = new google.maps.Marker({
    position: new google.maps.LatLng(gfg_office),
    map: map,
    draggable: true,
  });

  google.maps.event.addListener(myMarker, "dragend", function (evt) {
    document.getElementById("latitude").value = evt.latLng.lat().toFixed(5);
    document.getElementById("longitude").value = evt.latLng.lng().toFixed(5);
  });
}

setTimeout(function () {
  $(".alert")
    .fadeTo(500, 0)
    .slideUp(500, function () {
      $(this).remove();
    });
}, 2000);

// $(".form-container").on("click", ".back", function() {
//   $(".steps li").eq($(this).parents(".form-container").index() - totalSteps).removeClass("active");
//   $(this).parents(".form-container").removeClass("active flipInX").prev().addClass("active flipInY");
// });

/*=========================================================
*     If you won't to make steps clickable, Please comment below code 
=================================================================*/
// $(".steps li").on("click", function() {
//   var stepVal = $(this).find("span").text();
//   $(this).prevAll().addClass("active");
//   $(this).addClass("active");
//   $(this).nextAll().removeClass("active");
//   $(".myContainer .form-container").removeClass("active flipInX");
//   $(".myContainer .form-container:nth-of-type("+ stepVal +")").addClass("active flipInX");
// });

// for telephone

var countryData = window.intlTelInputGlobals.getCountryData(),
  input = document.querySelector("#phone"),
  addressDropdown = document.querySelector("#address-country");

// // init plugin
var iti = window.intlTelInput(input, {
  hiddenInput: "full_phone",
  utilsScript:
    "https://intl-tel-input.com/node_modules/intl-tel-input/build/js/utils.js?1549804213570", // just for formatting/placeholders etc
});

// // populate the country dropdown
// for (var i = 0; i < countryData.length; i++) {
//   var country = countryData[i];
//   var optionNode = document.createElement("option");
//   optionNode.value = country.iso2;
//   var textNode = document.createTextNode(country.name);
//   optionNode.appendChild(textNode);
//   addressDropdown.appendChild(optionNode);
// }
// // set it's initial value
// addressDropdown.value = iti.getSelectedCountryData().iso2;

// // listen to the telephone input for changes
// input.addEventListener("countrychange", function (e) {
//   addressDropdown.value = iti.getSelectedCountryData().iso2;
// });

// // listen to the address dropdown for changes
// addressDropdown.addEventListener("change", function () {
//   iti.setCountry(this.value);
// });
