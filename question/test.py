import copy
content  = 'select * from order by AbC where bv<.*|'

#This function is used for filter the sql check symbol.
def processSQLSymbol(content):
    content  = content.lower()
    symbolList = ['|','*','!','=','>','<','from','select','where']

    oldList = [content,]
    
    for symbol in symbolList:
        newList = []
        for item in oldList:
            tempList = item.split(symbol)
            newList.extend(tempList)
        oldList = copy.deepcopy(newList)

    #Filter all the none value.
    tempList = copy.deepcopy(newList)
    newList = []
    for item in tempList:
        if item in [' ',''] :
            pass
        else:
            newList.append(item.strip())
    return newList

print processSQLSymbol(content)

# oldList = copy.deepcopy(newList)
# newList = []
# for item in oldList:
#     tempList = item.split('*')
#     newList.extend(tempList)
# print newList

# oldList = copy.deepcopy(newList)
# newList = []
# for item in oldList:
#     tempList = item.split('*')
#     newList.extend(tempList)
# print newList