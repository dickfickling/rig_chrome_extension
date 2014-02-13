function requestIdentity(callback) {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", "http://randomautofill.com", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        var rig = response.rig;
        var regexes = response.regexes;
        callback(rig, regexes);

      } else {
        alert("Identity server is down");
      }
    }
  };

  xhr.send(null);
}

function checkRegex(element_name, regexes) {
  for (var regex_name in regexes) {
    var re = new RegExp(regexes[regex_name], "i");
    if (re.test(element_name)) return regex_name;
  }
  return null;
}

function autoFill(identity, regexes) {
  for(var form_id in document.forms) {
    var elements = document.forms[form_id].elements;
    for (var element_id in elements) {
      var element = elements[element_id];
      var regexMatch = checkRegex(element.name, regexes);
      if (!regexMatch) continue;

      element.value = identity[regexMatch];
    }
      
  }
}

requestIdentity(autoFill);
