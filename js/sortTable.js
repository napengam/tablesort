function sortTable(id) {
    'use strict';
    //
    // build in default function to extract a value from table cell    
    //
    var getValue = function (cell) {
        return cell.textContent.trim();
    };
    //
    // build in default function to compare values    
    //
    var compareValues = function (v1, v2) {
       return v1.localeCompare(v2);
    };
    //
    // walk up the DOM starting at the object where the click event happened 
    // to find cellindex and table.
    //
    function walkUp(obj) {

        var col = 0, table = null;
        while (obj !== null) {
            if (obj.tagName === 'TD' || obj.tagName === 'TH') {
                col = obj.cellIndex;
            } else if (obj.tagName === 'TABLE' && obj.id === id) {
                table = obj;
                break;
            }
            obj = obj.parentNode;
        }
        return {'col': col, 'table': table};

    }
    function sortCore(dir, grepValue = getValue, compare = compareValues) {

        var tBody, rows, o, col;

        o = walkUp(window.event.currentTarget);
        if (o.table === null) {
            return;
        }

        o.table.style.visibility = 'hidden';
        col = o.col;
        tBody = o.table.tBodies[0];
        rows = Array.from(tBody.rows);
        o.table.removeChild(tBody);
        rows.sort((a, b) => {
            const cellA = grepValue(a.cells[col]);
            const cellB = grepValue(b.cells[col]);
            return compare(cellA, cellB) * dir;
        });
        let tbody = document.createElement("tbody");
        rows.forEach(row => tbody.appendChild(row));
        o.table.appendChild(tbody);
        o.table.style.visibility = '';

    }

    function sortUp(grepValue, compare) {
        sortCore(1, grepValue, compare);

    }
    function sortDown(grepValue, compare) {
        sortCore(-1, grepValue, compare);
    }
    //
    // overwrites default build in function 
    //
    function setGrepValue(funcName) {
        getValue = funcName;
    }
    //
    // overwrites default build in function
    //
    function setCompareValues(funcName) {
        compareValues = funcName;
    }
    return {
        sortUp: sortUp,
        sortDown: sortDown,
        sortCore: sortCore, //(dir)
        setGrepValue: setGrepValue, //(funcName)
        setCompareValues: setCompareValues //(funcName)
    };
}
