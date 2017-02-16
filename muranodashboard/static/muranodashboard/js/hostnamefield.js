/*    Copyright (c) 2013 Mirantis, Inc.

    Licensed under the Apache License, Version 2.0 (the "License"); you may
    not use this file except in compliance with the License. You may obtain
    a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
    License for the specific language governing permissions and limitations
    under the License.
*/


$(function() {
  "use strict";

  var timer = null;

  function mainCheck(div, parameter1, parameter2, text) {
    var msg = "<div class='alert alert-message alert-danger'>" + text + '</div>';
    var errorNode = div.find("div.alert-message");
    var notAdded;
    if (errorNode.length) {
      notAdded = false;
      errorNode.html(text);
    } else {
      notAdded = true;
    }
    if (parameter1 !== parameter2 && notAdded) {
      div.addClass("error");
      div.addClass("has-error");
      div.removeClass("has-success");
      div.find("label").after(msg);
    } else if (parameter1 === parameter2) {
      div.removeClass("error");
      div.removeClass("has-error");
      div.addClass("has-success");
      errorNode.remove();
    }
  }

  function checkHostName(event) {
    var $this = $(event.target);
    var hostname = $this.val();
    var inptId = $this.attr('id');
    var text = gettext("Host name length must be greater or equal 6");
    var div = $this.closest(".form-field,.form-group");
    var meetRequirements = true;

    if (hostname.length < 6) {
      meetRequirements = false;
      mainCheck(div, meetRequirements, true, text);
    } else {
        if(timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(function() {
          $.getJSON("/horizon/api/check/hostname/", {'hostname': hostname, 'app_id': inptId})
            .done(function(json) {
              console.log("JSON Data: " + json.status);
              if (json.status == '404') {
                meetRequirements = false;
                var newHostname = "<a id='hostname-insert' class='has-success' data-value='"+ json.hostname +"'>" + json.hostname + "</a>";
                text = gettext("Host name already exists, try") + "<br/>" + newHostname;
                console.log("JSON Data: " + json.hostname);
              }
              mainCheck(div, meetRequirements, true, text);
            })
            .fail(function(jqxhr, textStatus, error) {
              var err = textStatus + ", " + error;
              console.log("Request Failed: " + err);
              meetRequirements = false;
              mainCheck(div, meetRequirements, true, text);
          });
        }, 500);
    }
    if (!div.hasClass('has-feedback')){
      div.addClass("has-feedback");
    }
  }

  function insertHostName(event) {
    var $this = $(event.target);
    var input = $("input[name$='unitNamingPattern']");

    input.val($this.data('value'));
    input.target = input;
    console.log(input.target);
    checkHostName(input);
  }

  $(document).on("click", "#hostname-insert", insertHostName);
  $(document).on("keyup", "input[name$='unitNamingPattern']", checkHostName);
});
