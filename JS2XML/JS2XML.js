function JS2XML(JSObj)
{
    modifiedJSObj = {XmlRoot:JSObj};
    v = JS2XMLRec(modifiedJSObj);
    return v;
}

function JS2XMLRec(JSObj)
{
    if(typeof(JSObj) == "object")
    {
        if(Array.isArray(JSObj))
        {
            var retStr = "";
            for(var i = 0;i<JSObj.length;i++)
            {
                retStr += "<Item>" + JS2XMLRec(JSObj[i]) + "</Item>";
            }
            return retStr;
        }
        else
        {
            var keyArr = Object.keys(JSObj);
            retStr = "";
            for(var i = 0;i<keyArr.length;i++)
            {
                retStr += "<" + keyArr[i] + ">" + JS2XMLRec(JSObj[keyArr[i]]) + "</" + keyArr[i] + ">";
            }
            return retStr;
        }
    }
    else
    {
        return JSObj.toString();
    }
}