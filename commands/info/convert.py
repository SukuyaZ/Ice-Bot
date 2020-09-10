import docx2txt

# replace following line with location of your .docx file
MY_TEXT = docx2txt.process("commandstoport.docx")


with open("commandstoport.txt", "w") as text_file:
    print(MY_TEXT, file=text_file)