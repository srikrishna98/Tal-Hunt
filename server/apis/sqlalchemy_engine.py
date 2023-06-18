import pyodbc
from sqlalchemy import create_engine
import urllib


drivers = [item for item in pyodbc.drivers()]
print(drivers)
driver = drivers[-1]
print("driver:{}".format(driver))
server = 'tcp:hackathonucb.database.windows.net,1433'
database = 'test'
uid = 'server'
pwd = 'hackathon@2023'
con_string = f'DRIVER={driver};SERVER={server};DATABASE={database};UID={uid};PWD={pwd};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;'
print(con_string)
cnxn = pyodbc.connect(con_string)
cursor = cnxn.cursor()
