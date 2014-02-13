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

function checkRegex(element_name) {
  for (var regex_name in regexes) {
    var re = new RegExp(regexes[regex_name], "i");
    if (re.test(element_name)) return regex_name;
  }
  return null;
}

function autoFill(identity) {
  for(var form_id in document.forms) {
    var elements = document.forms[form_id].elements;
    for (var element_id in elements) {
      var element = elements[element_id];
      var regexMatch = checkRegex(element.name);
      if (!regexMatch) continue;

      element.value = identity[regexMatch];
    }
      
  }
}

regexes = {
  street_address: "address.*line|address1|addr1|street",
  country: "country|countries",
  zip: "zip|postal|post.*code|pcode",
  city: "city|town",
  state: "state",
  email: "e.?mail",
  first_name: "first.*name|fname|first",
  last_name: "last.*name|lname|surname|last$|secondname",
  phone: "phone|mobile|cell",
  credit_card: "card.?number|card.?#|card.?no|cc.?num",
  cvv: "verification|card identification|security code|cvn|cvv|cvc|csc"
}

requestIdentity(autoFill);
