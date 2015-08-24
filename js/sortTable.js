function sortTable(id) {
    'use strict';
    //
    // build in default function to extract a value from table cell    
    //
    var getValue = function (cell) {
        return cell.textContent;
    };
    //
    // build in default function to compare values    
    //
    var compareValues = function (v1, v2) {
        if (v1 > v2) {
            return 1;
        } else if (v1 < v2) {
            return -1;
        }
        return 0;
    };
    //
    // walk up the DOM starting at the object where the click event happened 
    // to find cellindex and table 
    //
    function walkUp(obj) {

        var col = 0, table = null;
        while (obj !== null) {
            obj = obj.parentNode;
            if (obj.tagName === 'TD' || obj.tagName === 'TH') {
                col = obj.cellIndex;
                continue;
            }
            if (obj.tagName === 'TABLE' && obj.id === id) {
                table = obj;
                break;
            }
        }
        return {'col': col, 'table': table};

    }
    function sortCore(dir, grepValue, compare) {

        var tBody, rows, trFrom, trTo, o, col,
                nr, cp = 0, i, ref, ref1, j, sw;

        o = walkUp(window.event.currentTarget);
        if (o.table === null) {
            return;
        }
        col = o.col;
        tBody = o.table.tBodies[0];
        nr = tBody.rows.length;

        if (typeof grepValue !== 'function' || grepValue === null) {
            grepValue = getValue; // use default                     
        }
        if (typeof compare !== 'function' || compare === null) {
            compare = compareValues; // use default                  
        }
        rows = tBody.rows;
        for (i = 0; i < nr; i++) {
            ref = grepValue(rows[i].cells[col]);
            for (j = i + 1, sw = -1; j < nr; j++) {
                ref1 = grepValue(rows[j].cells[col]);
                cp = compare(ref1, ref);
                if ((cp === 1 && dir === -1) || (cp === -1 && dir === 1)) {
                    ref = ref1;
                    sw = j;
                }
            }
            if (sw > 0) {
                trFrom = tBody.rows[sw];
                tBody.removeChild(trFrom);
                trTo = tBody.rows[i];
                tBody.insertBefore(trFrom, trTo);
            }
        }
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
        sortCore: sortCore, //(dir)
        setGrepValue: setGrepValue, //(funcName)
        setCompareValues: setCompareValues //(funcName)
    };
}