import fitz

class PDFReader:
    def __init__(self, pdf_path):
        self.doc = fitz.open(pdf_path)

    def get_text(self):
        for page in self.doc:
            text = page.get_text()
            print(text)
