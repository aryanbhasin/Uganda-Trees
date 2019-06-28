import json
import docx

# ******************** BUILDING ALL_DATA JSON ********************
filesList = ['African fan palm.docx', 'African oil palm.docx', 'Alexandra palm.docx', 'Black plum.docx', 'Bombax.docx', 'Bottlebrush.docx', 'Breadfruit.docx', 'Cabbage palm.docx', 'Caja fruit.docx', 'Calabash nutmeg.docx', 'Candle bush.docx', 'Candle-nut.docx', 'Cassia.docx', 'Croton.docx', 'Drum tree.docx', 'East African green wood.docx', 'English yellow mulberry.docx', 'False muvule (kirudu).docx', 'Granite mangosteen.docx', 'Guava.docx', 'Iroko.docx', 'Jackfruit.docx', 'Jumping Seed tree.docx', 'Kapok.docx', 'Lemon-scented gum.docx', 'Loquat.docx', 'Mango.docx', 'Mpewere.docx', 'Mugavu.docx', 'Mukookowe.docx', 'Mukuzanyana.docx', 'Mulongo.docx', 'Musizi.docx', 'Mutuba.docx', 'Muwafu.docx', 'Muziru.docx', 'Muvule.docx', 'Norfolk Island pine.docx', 'Paper mulberry.docx', 'Parasol.docx', 'Pheasant-berry.docx', 'Pitanga cherry.docx', 'Podo.docx', 'Queensland umbrella.docx', 'Raffia palm.docx', 'Red mahogany.docx', 'Red nongo.docx', 'Sausage tree.docx', 'Soursop.docx', 'Star fruit.docx', 'Terminalia.docx', 'Tipu.docx', 'Toddy palm.docx']
allData = {}
for file in filesList:
    keyName = file.split('.')[0].lower()
    allData[keyName] = 'require(\'UgandaTrees/src/assets/images/' + keyName + '.jpg\')'
with open('image-sources.json', 'w') as json_file:
    json.dump(allData, json_file, sort_keys=True, indent=3)



    
    
    



    
    


    