from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
import copy
import time 

driver = webdriver.Chrome ('/mnt/c/Users/Daan/Dropbox/Scriptie/chromedriver_linux64/chromedriver.exe')
driver.get('https://netmarketshare.com/querytester?form=%7B%22format%22%3A%22table%22%2C%22query%22%3A%22%7B%5Cn%20%20%20%20%5C%22timeframe%5C%22%3A%20%5C%22lastMonth%5C%22%2C%5Cn%20%20%20%20%5C%22group%5C%22%3A%20%5C%22browser%5C%22%2C%5Cn%20%20%20%20%5C%22sort%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22share%5C%22%3A%20-1%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%5C%22filter%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22deviceType%5C%22%3A%20%5C%22Desktop%2Flaptop%5C%22%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%5C%22attributes%5C%22%3A%20%5C%22share%5C%22%5Cn%7D%22%7D&query=%7B%0A%20%20%20%20%22timeframe%22%3A%20%22lastMonth%22%2C%0A%20%20%20%20%22group%22%3A%20%22browser%22%2C%0A%20%20%20%20%22sort%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22share%22%3A%20-1%0A%20%20%20%20%7D%2C%0A%20%20%20%20%22filter%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22deviceType%22%3A%20%22Desktop%2Flaptop%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20%22attributes%22%3A%20%22share%22%0A%7D')
querybox = driver.find_element_by_xpath('//*[@id="query"]')
requestbutton = driver.find_element_by_xpath('//*[@id="content"]/div[2]/div/form/div[3]/button')
querybox.clear()
browserShare = [[],[],[],[],[]]
varShare=[]
#get the browser share data from the website
for i in range (1,6):
	for i2 in range (1,3):
		browserValue = driver.find_element_by_xpath(f"//*[@id=\"results-table-table\"]/tbody/tr[{i}]/td[{i2}]")
		browserShare[i-1].append(browserValue.text)	
#query for the os share that correspond to the browsers gathered
for x in range (len(browserShare)):
	query =f"{{ \"timeframe\": \"lastMonth\", \"group\": \"platform\", \"sort\":{{ \"share\": -1}}, \"filter\": {{\"deviceType\": \"Desktop/laptop\", \"browser\": \"{browserShare[x][0]}\" }}, \"attributes\": \"share\"}}"
	querybox.clear()
	querybox.send_keys(query)
	requestbutton.click()
	time.sleep(1)
	for i in range (1,4) :
		for i2 in range (1,3):
			osValue = driver.find_element_by_xpath(f"//*[@id=\"results-table-table\"]/tbody/tr[{i}]/td[{i2}]")
			varShare.append(osValue.text)             
		browserShare[x].append(copy.deepcopy(varShare))
		varShare.clear()	
#go through the OS's collected and query for all versions used by more than 1 percent of the people
		query =f"{{\"timeframe\": \"lastMonth\",\"group\": \"platformVersion\",\"sort\": {{\"share\": -1}},\"filter\": {{\"deviceType\": \"Desktop/laptop\",\"browser\": \"{browserShare[x][0]}\",\"platform\":\"{browserShare[x][i+2][0]}\"}},\"attributes\": \"share\"}}"
		while cond  : 
			i2 = 1
			for i3 in range (1,3):
				versionValue = driver.find_element_by_xpath(f"//*[@id=\"results-table-table\"]/tbody/tr[{i2}/td[{i3}]")
				varShare.append(versionValue.text)
			browserShare[x][i2][
			
			
	

print(browserShare)
