import sys
import json

def getText(t):
    return f"'recieved':'{t}'"


if __name__ == "__main__":
    server_msg = sys.argv[1]
    return_msg  = getText(server_msg)
    print(json.dumps(return_msg))