import PyPDF2
import re
import json
import unicodedata
import docx
import glob

# ******************** RegEx functions to extract info from text ********************
def getEngName(text):
    pattern = r'English: ([^,|.]+)'
    match = re.search(pattern, text)
    if match:
        return(match.group(1).replace("\n", ""))
        
def getScientificName(text):
    return ' '.join(text.split()[:2])
    
def getUgName(text):
    pattern = r'Luganda: ([^,|.]+)'
    match = re.search(pattern, text)
    if match:
        return(match.group(1))
        
def getPropagation(text):
    pattern = r'Propagation: ([^.]+)'
    match = re.search(pattern, text)
    if match:
        return(match.group(1))
        
def getUses(text):
    pattern = r'Uses: ([^.]+)'
    match = re.search(pattern, text)
    if match:
        # Remove bracketed phrases
        match = re.sub("[\(\[].*?[\)\]]", "", match.group(1))
        p = re.compile(r',+')
        # match is now a list
        match = p.split(match)        
        match = [use.lstrip().rstrip().capitalize() for use in match]
        return match
        
def getDescription(text):
    pattern = r'Description: (.*?) BARK:'
    match = re.search(pattern, text)
    if match:
        return(match.group(1))
    
        
def barkInfo(text):
    # [^.] this matches any character that's not a period
    # + to take until a period
    # encapsulated with () to capture expression
    pattern = r'BARK: (.*?) LEAVES:'
    match = re.search(pattern, text)
    if match:
        return(match.group(1))
        
def leavesInfo(text):
    pattern = r'LEAVES: (.*?) FLOWERS:'
    match = re.search(pattern, text)
    if match:
        return(match.group(1))
        
def flowerInfo(text):
    pattern = r'FLOWERS: (.*?) FRUIT:'
    match = re.search(pattern, text)
    if match:
        return(match.group(1))
        
def fruitInfo(text):
    pattern = r'FRUIT: ([^\n]+)'
    match = re.search(pattern, text)
    if match:
        return(match.group(1))
    
        
def seedsInfo(text):
    pattern = r'Seed: ([^\n]+)'
    match = re.search(pattern, text)
    if match:
        return(match.group(1))
        
def getEcology(text):
    pattern = r'Ecology: ([^\n]+)'
    match = re.search(pattern, text)
    if match:
        return(match.group(1).lstrip())
        
def getRemarks(text):
    pattern = r'Remarks: ([^\n]+)'
    match = re.search(pattern, text)
    if match:
        return(match.group(1).lstrip())


# ******************** Convert PDF page to string ********************
'''
filename = "b09383.pdf"
pdfFileObj = open(filename, 'rb')
pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
num_pages = pdfReader.numPages
text = ""
# getPage(num) extracts page number 'num+1'
pageObj = pdfReader.getPage(308)
text += pageObj.extractText()
'''

# ******************** Convert DOCX to string Fx ********************
def readtxt(file):
    doc = docx.Document(file)
    fulltext = []
    for para in doc.paragraphs:
        fulltext.append(para.text)
    return '\n'.join(fulltext)

# ******************** BUILDING JSON Fxs ********************


def partsDetails(text):
    parts = {}
    parts['Bark'] = barkInfo(text)
    parts['Flower'] = flowerInfo(text)
    parts['Leaves'] = leavesInfo(text)
    parts['Fruit'] = fruitInfo(text)
    parts['Seeds'] = seedsInfo(text)
    return parts
    
def getNames(text):
    names = {}
    names['English_Name'] = getEngName(text)
    names['Ugandan_Name'] = getUgName(text)
    names['Scientific_Name'] = getScientificName(text)
    return names    

def buildData(text):
    data = {}
    names = getNames(text)
    parts = partsDetails(text)
    data['Names'] = names
    data['Parts'] = parts
    data['Uses'] = getUses(text)
    data['Ecology'] = getEcology(text)
    data['Propagation'] = getPropagation(text)
    data['Remarks'] = getRemarks(text)
    data['Description'] = getDescription(text)
    return data
    

# ******************** BUILDING ALL_DATA JSON ********************
filesList = ['African fan palm.docx', 'African oil palm.docx', 'Alexandra palm.docx', 'Black plum.docx', 'Bombax.docx', 'Bottlebrush.docx', 'Breadfruit.docx', 'Cabbage palm.docx', 'Caja fruit.docx', 'Calabash nutmeg.docx', 'Candle bush.docx', 'Candle-nut.docx', 'Cassia.docx', 'Croton.docx', 'Drum tree.docx', 'East African green wood.docx', 'English yellow mulberry.docx', 'False muvule (kirudu).docx', 'Granite mangosteen.docx', 'Guava.docx', 'Iroko.docx', 'Jackfruit.docx', 'Jumping Seed tree.docx', 'Kapok.docx', 'Lemon-scented gum.docx', 'Loquat.docx', 'Mango.docx', 'Mpewere.docx', 'Mugavu.docx', 'Mukookowe.docx', 'Mukuzanyana.docx', 'Mulongo.docx', 'Musizi.docx', 'Mutuba.docx', 'Muwafu.docx', 'Muziru.docx', 'Muvule.docx', 'Norfolk Island pine.docx', 'Paper mulberry.docx', 'Parasol.docx', 'Pheasant-berry.docx', 'Pitanga cherry.docx', 'Podo.docx', 'Queensland umbrella.docx', 'Raffia palm.docx', 'Red mahogany.docx', 'Red nongo.docx', 'Sausage tree.docx', 'Soursop.docx', 'Star fruit.docx', 'Terminalia.docx', 'Tipu.docx', 'Toddy palm.docx']
allData = {}
for file in filesList:
    text = readtxt(file)
    keyName = file.split('.')[0].lower()
    allData[keyName] = buildData(text)
with open('tree-data.json', 'w') as json_file:
    json.dump(allData, json_file, sort_keys=True, indent=3)



    
    
    



    
    


    