import nbformat

filename = './combinatorics.ipynb'
with open(filename, 'r', encoding='utf-8') as file:
    nb = nbformat.read(file, as_version=4)
    nbformat.validate(nb)

print(nb)