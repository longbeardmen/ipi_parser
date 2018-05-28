const mainPageUrl = "https://ipindiaonline.gov.in"
const formPath = "/tmrpublicsearch/frmmain.aspx";
const formAction = "/tmrpublicsearch/tmsearch.aspx";

var formPage = document.createElement('html');
var targetPage = document.createElement('html');

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

function parse(url = mainPageUrl + formPath) {
  formPage.innerHTML = httpGet(url);
  var form = formPage.querySelector("form#form1");
  var wordmarkInput = form.querySelector("input#ContentPlaceHolder1_TBWordmark");
  wordmarkInput.value = "TOYOTA";
  var classInput = form.querySelector("input#ContentPlaceHolder1_TBClass");
  classInput.value = 11;
  var inputs = Array.from(form.getElementsByTagName("input"));

  var body = "";

  inputs.forEach(function(input, index) {
    var inputName = input.name;
    var inputValue = input.value;

    if(index != 0 && inputValue != "" && body != "") {
      body += "&";
    }
    if(inputValue != "") {
      body += inputName;
      body += "=";
      body += inputValue;
    }
  });

  targetPage.innerHTML = httpPost(mainPageUrl + formAction, body);
  console.log(targetPage.innerHTML)
}

parse();
