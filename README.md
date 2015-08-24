<h1>Sorting a table along column values</h1>

Example at <a href="http://hgsweb.de/tablesort">http://hgsweb.de/tablesort</a>

<h2> Logic </h2>

The assumption is that the sort is triggered via an <b>onclick</b>-event from 
whithin a header cell (TH).

Once the event is received in the <b>sortCore</b> function, we work our way up the
chain of parent nodes to find the the cellIndex of the TH-element and the table 
this TH-element belongs to.

Given this, we can access all the rows in the table body and the column cell we 
have to sort along.

The default method to access the value of the cell for comparison, is done by 
the function represented by the value of closure variable <b>getValue</b>.  
The default method for comparing values, is done by the fucntion represented 
by the value of closure variable <b>compareValues</b>. 
 
Both methods can be overwriten for all sort actions using the exposed functions 
<b>setGrepValue</b>, <b>setCompareValues</b>  or individualy for every column by
passing in the method as a function from outside, defined by the user.

This allows the user to write her own functions depending on the content and 
meaning of the cell values.

See example for the last column of the table, where sorting is done along the 
<b>backgroudColor</b> passing in the function <b>getColor</b> 


<h2>Usage</h2>

<b>JavaScript</b>

Get a pointer to sort functionality, specify the table id .

var st=sortTable(id);

<b>HTML</b>

attache up/down sort functionality to elements within a TH element like 
this:   
<ul>
<li>onclick="st.sortCor(1);"  for sorting ascending or
<li>onclick="st.sortCor(-1);" for sorting descendig. 
</ul>

If you want to temporarily overwrite the default function for accessing the cell value
write  a function like 
<code>
    function getValue(tableDataCell){
        <your code here>
        return <value>;
    }
</code>

Pass this function to sortCore like: onclick="st.sortCor(-1,getValue);"

If you want to temporarily overwrite the default function for comparing  cell values
write  a function like 
<code>
    function compareValue(currentCell,refrenceCell){
        <your code here>
        return <value>;
    }
</code>

Pass this function to sortCore like: onclick="st.sortCor(-1,null,compareValue);"

Overwrite the default functionality for accessing cell values and comparison permantly

say:
<ul>  
<li>st.setGrepValue(getValue);
<li>st.setCompareValues(comapareValue);
</ul>
