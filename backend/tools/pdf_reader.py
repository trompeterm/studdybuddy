import fitz

doc = fitz.open("../sample notes.pdf")
for page in doc:
    text = page.get_text()
    print(text)
