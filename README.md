<h1>Sorting a table along column values</h1>

<ppre style="font-family:Verdana;line-height:1em">

Example at <a href="http://hgsweb.de/tablesort">http://hgsweb.de/tablesort</a>

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


