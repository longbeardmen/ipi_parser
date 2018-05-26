var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

const defaultUrl = 'https://ipindiaonline.gov.in/tmrpublicsearch';
const formIndex = 8;

function parse(url = defaultUrl + "/frmmain.aspx") {
  var formPage = $.parseHTML(httpGet(url));
  var formElement = formPage[formIndex];
  var formValues = {
    wordmark: "TOYOTA",
    class: 11
  }
  var filledForm = fillForm(formElement, formValues);
  var targetPage = submitForm(filledForm);
}

function httpGet(url) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

function httpPost(url, body) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true);
  xmlHttp.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
  xmlHttp.send(body);
  return xmlHttp.responseText;
}

function fillForm(form, inputValues) {
  var wordmarkField = $(form).find("#ContentPlaceHolder1_TBWordmark")[0];
  var classField = $(form).find("#ContentPlaceHolder1_TBClass")[0];
  $(wordmarkField).val(inputValues.wordmark);
  $(classField).val(inputValues.class);

  return form;
}

function submitForm(form) {
  var body = "";
  $(form).find("input").each(function (index) {
    if(index != 0 && this.value != "" && body != "" ) {
      body += "&";
    }
    if(this.value != ''){
      body += this.name
      body += "="
      body += encodeURIComponent(this.value);
    }
  });
  debugger;
  return httpPost(form.action, body)
}
