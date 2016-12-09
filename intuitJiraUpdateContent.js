// define jira functions
var hideJiraSections = function() {
    var issuesInProgressCount = 0;
    var selector = document.getElementById("announcement-banner");
    var innerSelector;
    selector.style['display']='none';
    selector = document.getElementById("ghx-header");
    selector.style['display']='none';
    //document.getElementsByClassName("aui-sidebar-wrapper")[0].style['display']='none';
    //document.querySelectorAll('.aui-sidebar[aria-expanded="false"]~.aui-page-panel')[0].style['padding-left']='0px';
    selector = document.getElementById("ghx-operations");
    selector.style['margin-top']='10px';
    selector = document.getElementsByClassName("ghx-detail-term");
    for (var idx=0; idx<  selector.length; idx++){
        selector[idx].style['padding']='0';
    }
    selector = document.getElementsByClassName("ghx-detail-description");
    for (var idx=0; idx<  selector.length; idx++){
        selector[idx].style['padding']='0';
    }
};
var getJiraInProgressCount = function() {
    // find count of in progress or earlier
    var issuesInProgressCount = 0;
    var selector = document.querySelectorAll(".ghx-swimlane");
    var innerSelector;
    var node;
    var textNode;
    var anchorNode;
    for (var idx=0; idx<  selector.length; idx++){
        innerSelector = selector[idx].querySelectorAll('.ghx-column');
        console.log(idx);
        // onlu count in progress or earlier
        for (var idxInner=0; idxInner<  3; idxInner++){
            issuesInProgressCount += innerSelector[idxInner].querySelectorAll('.ghx-issue').length;
        }
    }

    // display out of sla bugs
    node = document.createElement("dd");
    anchorNode = document.createElement("a");
    anchorNode.setAttribute('role','button');
    anchorNode.setAttribute('href','https://jira.intuit.com/secure/Dashboard.jspa?selectPageId=36366');
    anchorNode.setAttribute('target','_blank');
    anchorNode.setAttribute('class','js-quickfilter-button');
    anchorNode.setAttribute('title','out of sla');
    textNode = document.createTextNode("Bugs - Out Of SLA");
    anchorNode.appendChild(textNode);
    node.appendChild(anchorNode);
    document.getElementById("js-work-quickfilters").appendChild(node);

    // display in progress jiras
    node = document.createElement("span");
    textNode = document.createTextNode("issues still in progress : " +issuesInProgressCount);
    node.appendChild(textNode);
    document.getElementById("js-work-quickfilters").appendChild(node);
};
var hideJiraIssueDetails = function() {
    var selector = document.getElementsByClassName("ghx-detail-section");
    for (var idx=0; idx<  selector.length; idx++){
        selector[idx].style['margin-bottom']='5px';
    }
    selector = document.getElementsByClassName("ghx-header");
    for (var idx=0; idx<  selector.length; idx++){
        selector[idx].style['display']='none';
    }
    selector = document.querySelectorAll(".ghx-tab-section");
    for (var idx=0; idx<  selector.length; idx++){
        if (idx != 1 && idx != 4) {
            selector[idx].style['display']='none';
        } else if (idx == 1 ) {
            selector[idx].querySelector("h4").style['display']='none';
        }
    }
    selector = document.getElementsByClassName("ghx-detail-term");
    for (var idx=0; idx<  selector.length; idx++){
        selector[idx].style['padding']='0';
    }
    selector = document.getElementsByClassName("ghx-detail-description");
    for (var idx=0; idx<  selector.length; idx++){
        selector[idx].style['padding']='0';
    }
};
var jiraIssueClickHandler = function() {
    setTimeout(hideJiraIssueDetails, 1500);
};
var hideJiraTileAttributes = function() {
    var selector = document.getElementsByClassName("ghx-column-headers");
    if (typeof selector !== 'undefined' && selector.length >0) {
        selector[0].style['padding-top']='0px';
    }
    selector = document.getElementsByClassName("ghx-avatar");
    for (var idx=0; idx<  selector.length; idx++){
        selector[idx].style['display']='none';
    }
    selector = document.getElementsByClassName("ghx-summary");
    for (var idx=0; idx<  selector.length; idx++){
        selector[idx].style['margin-left']='-25px';
    }
    selector = document.querySelectorAll(".ghx-issue.ghx-has-avatar .ghx-issue-fields");
    for (var idx=0; idx<  selector.length; idx++){
        selector[idx].style['padding-right']='0px';
    }
    selector = document.getElementsByClassName("ghx-flags");
    for (var idx=0; idx<  selector.length; idx++){
        selector[idx].style['top']='10px';
        selector[idx].style['left']='140px';
    }
    selector = document.querySelectorAll(".ghx-issue .ghx-end");
    for (var idx=0; idx<  selector.length; idx++){
        selector[idx].style['top']='7px';
        selector[idx].style['bottom']='inherit';
    }
};
var addJiraEventHandlers = function () {
    var selector = document.querySelectorAll(".ghx-issue");
    for (var idx=0; idx<  selector.length; idx++){
        selector[idx].addEventListener('click', jiraIssueClickHandler, false);
    }
    selector = document.getElementById('js-work-quickfilters').querySelectorAll('dd:not(.ghx-quickfilter-trigger)');
    for (var idx=0; idx<  selector.length; idx++){
        selector[idx].addEventListener('click', hideJiraTileAttributes, false);
    }
};
// script to run on jira dashboard
if (window.location.host.startsWith("jira.intuit.com") &&
    window.location.pathname.startsWith("/secure/RapidBoard.jspa")) {
    "use strict";
    hideJiraSections();
    setTimeout(function() {
        "use strict";
        getJiraInProgressCount();
        hideJiraTileAttributes();
        addJiraEventHandlers();
        hideJiraIssueDetails();
    }, 4000);
}

