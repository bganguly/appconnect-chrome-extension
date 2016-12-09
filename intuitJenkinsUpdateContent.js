// define jenkins functions
var hideJenkinsTabs = function() {
    var selector = document.getElementsByClassName("tab");
    for (var idx=0; idx<  selector.length; idx++){
        if (selector[idx].querySelector("a").innerText !== 'AppConnect') {
            selector[idx].style['display']='none';
        }
    }
};
var hideJiraSelectedAppConnectJobs = function() {
    var selector = document.getElementById("projectstatus").querySelectorAll("tr");
    var childAnchorSelector;
    var childAnchorAttr;
    for (var idx=0; idx<  selector.length; idx++){
        childAnchorSelector = selector[idx].querySelector("td>a");
        if ( childAnchorSelector != null) {
            childAnchorAttr = childAnchorSelector.getAttribute("href");
            if ( ! (childAnchorAttr.indexOf('nightly') > -1) &&
                ! (childAnchorAttr.indexOf('appconnect-deploy-preprod-all-instances') > -1) &&
                ! (childAnchorAttr.indexOf('appconnect-ui-commit') > -1) &&
                ! (childAnchorAttr.indexOf('appconnect-ui-develop-build-commit') > -1) &&
                (! (childAnchorAttr.indexOf('appconnect-create') > -1) ||
                (childAnchorAttr.indexOf('ec2-instance') > -1) ||
                (childAnchorAttr.indexOf('hotfix-package') > -1))) {
                    selector[idx].style['display']='none';
            }
        }
    }
};
// script to run on jira dashboard
if (window.location.host.startsWith("fmsscm.corp.intuit.net") &&
    window.location.pathname.endsWith("/fms-build/view/AppConnect/")) {
    "use strict";
    hideJenkinsTabs();
    hideJiraSelectedAppConnectJobs();
}

