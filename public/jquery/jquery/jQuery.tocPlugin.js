/* 
 * jQuery Plugin
 */
function tableOfContents(tocList) {
    jQuery(tocList).empty();
    var prevH2item = null;
    var prevH2list = null;
    var index = 0;
    jQuery("h2, h3").each(function() {
        // insert an achor
        var anchor = "<a name='"+index+"'></a>";
        jQuery(this).before(anchor);
        var li = "<li><a href='#"+index+"'>"+jQuery(this).text()+"</a></li>";
        if(jQuery(this).is("h2")) {
            prevH2list = jQuery("<ul></ul>");
            prevH2item = jQuery(li);
            prevH2item.append(prevH2list);
            prevH2item.appendTo(tocList);
        }
        else {
            prevH2list.append(li);
        }
        index++;
    });
}

