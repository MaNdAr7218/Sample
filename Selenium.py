from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument("--headless")

driver = webdriver.Chrome(options=options)

driver.get("http://65.0.214.68")

# Example test: Check if the page title contains "Story"
assert "Story" in driver.title or "Generate" in driver.page_source

driver.quit()
