function requestIdentity(callback) {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", "http://fickling.us/rig", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status == 200) {
        var rig = JSON.parse(xhr.responseText);
        callback(rig);

      } else {
        alert("Identity server is down");
      }
    }
  };

  xhr.send(null);
}

function autoFill(identity) {
  if (!document.forms.length) {
    alert("Could not find form");
  }
  var form = document.forms[0];
  form["account[first_name]"].value = identity.first_name;
  form["account[last_name]"].value = identity.last_name;
  form["account[email]"].value = identity.email;
  form["billing_info[address1]"].value = identity.street_address;
  form["billing_info[city]"].value = identity.city;
  form["billing_info[state]"].value = identity.state;
  form["billing_info[zip]"].value = identity.zip;
  form["billing_info[country]"].value = "US";
  form["billing_info[number]"].value = identity.credit_card;
  form["billing_info[verification_value]"].value = identity.cvv;
}

requestIdentity(autoFill);

