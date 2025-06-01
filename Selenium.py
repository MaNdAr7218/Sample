from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
import time

options = Options()
options.binary_location = '/usr/bin/chromium-browser'  # or '/usr/bin/google-chrome'
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

service = Service('/usr/local/bin/chromedriver')  # adjust path if needed
driver = webdriver.Chrome(service=service, options=options)

try:
    driver.get("http://65.0.214.68")  # Your app IP

    time.sleep(2)  # Wait for page to load

    headline = driver.find_element(By.XPATH, "//*[contains(text(),'Transform') and contains(text(),'enchanting stories')]")
    assert headline.is_displayed()
    print("✅ Headline found.")

    get_started_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Get Started')]")
    if get_started_button.is_displayed():
        print("✅ Get Started button is visible.")
        get_started_button.click()
        print("➡️ Clicked Get Started.")
    else:
        print("⚠️ Get Started button not found.")

except Exception as e:
    print(f"❌ Test failed: {e}")
    raise

finally:
    driver.quit()
