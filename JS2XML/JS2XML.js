function JS2XML(JSObj)
{
    var modifiedJSObj = {XmlRoot:JSObj};
    return JS2XMLRec(modifiedJSObj);
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

function XML2JS(xml)
{
  var modifiedJSObj = XML2JSRec(xml);
  return modifiedJSObj.XMLRoot;
}

function XML2JSRec(xml){
  var hashObj = {};
  var arrayObj = [];
  var xml_re = /\<(.[^/^\<]*)\>(.*)\<\/(.*)\>/;
  var matches = xml.match(xml_re);
  if(matches===null)
  {
    return xml;
  }
  if(matches[1] !== matches[3])
  {
    console.log("XML tags are not well formed");
  }
  var retObj = XML2JSRec(matches[2]);
  hashObj[matches[1]] = retObj;
  return hashObj;
}