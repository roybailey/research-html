/* 
 * DataGrid Plugin
 */

jQuery.fn.datagrid = function(configOverride, data) {

    var configDefault = {
        headCellClass: "datagridHeadCell"
        ,oddRowClass: "datagridOddRow"
        ,evenRowClass: "datagridEvenRow"
        ,cellClass: "datagridCell"
        ,selectedClass: "datagridSelectedRow"
    };
    var config = jQuery.extend(true, configDefault, configOverride);

    var functions = {
        header: function(config, table) {
            for (i = 0, row = ""; i < config.columns.length; i++) {
                row += "<td class='" + config.headCellClass + "'>" + config.columns[i].title + "</td>";
            }
            table.append("<tr>" + row + "</tr>");
        }
        ,
        rows: function(config, table, data) {
            for (i = 0; i < data.length; i++) {
                var rowClass = this.rowClass(config, i);
                var row = "<tr class='" + rowClass + "'>";

                for (j = 0; j < config.columns.length; j++) {
                    var width = this.widthAttr(config.columns[j].width);
                    var div = "<div class='" + config.cellClass + "' style='" + width + "'>"
                            + data[i][config.columns[j].property] + "</div>";
                    var align = this.alignAttr(config.columns[j].align);
                    row += "<td " + align + ">" + div + "</td>";
                }
                var rowObj = jQuery(row + "</tr>");

                var functions = this;
                rowObj.click(function(event) {
                    functions.rowClick(event, this);
                });
                if (config.onDoubleclick !== null) {
                    rowObj.dblclick(function(event) {
                        config.onDoubleclick(event, this);
                    });
                }
                rowObj.data("config", config);
                table.append(rowObj);
            }
        }
        ,
        rowClass: function(config, rowIndex) {
            if ((rowIndex % 2) === 0)
                return config.evenRowClass;
            return config.oddRowClass;
        }
        ,
        widthAttr: function(width) {
            if (width !== null)
                return "width: " + width + ";";
            return "";
        }
        ,
        alignAttr: function(align) {
            if (align !== null)
                return "align='" + align + "'";
            return "";
        }
        ,
        rowClick: function(event, selectedRow) {
            var row = jQuery(selectedRow);
            var config = row.data("config");
            var rowAlreadySelected = (row.attr("class") === config.selectedClass);
            var rowAlreadyUnselected = false;

            if (!event.metaKey) {
                this.unselectAll(config);
                rowAlreadyUnselected = true;
            }

            if (rowAlreadySelected) {
                if (!rowAlreadyUnselected) {
                    row.attr("class", row.data("origClass"));
                    if (config.onUnselect !== null)
                        config.onUnselect();
                }
            } else {
                row.data("origClass", row.attr("class"));
                row.attr("class", config.selectedClass);
                if (config.onSelect !== null)
                    config.onSelect();
            }
        }
        ,
        unselectAll: function(config) {

            jQuery("." + config.selectedClass).each(function() {
                var row = jQuery(this);
                row.attr("class", row.data("origClass"));

                if (config.onUnselect !== null)
                    config.onUnselect();
            });

        }
    };

    this.each(function() {
        var table = jQuery(this);
        table.data("config", config);
        table.empty();
        functions.header(config, table);
        functions.rows(config, table, data);
    });
};

