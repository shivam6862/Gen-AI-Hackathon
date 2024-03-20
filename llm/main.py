
from storage_creation import DocStore

if __name__ == "__main__":
	inp = input("Enter your input")
	A = DocStore()
	print(inp, end = "/n/n")
	#A.create_index()
	res = A.search_index(inp)
	print(res)
