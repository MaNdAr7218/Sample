from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

# Set headless Chrome options
options = Options()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

# Launch the browser
driver = webdriver.Chrome(options=options)

try:
    # Open the StoryWeaver app
    driver.get("http://65.0.214.68")  # Change IP if different

    time.sleep(2)  # wait for content to load

    # Assert headline is present
    headline = driver.find_element(By.XPATH, "//*[contains(text(),'Transform') and contains(text(),'enchanting stories')]")
    assert headline.is_displayed()
    print("✅ Headline found.")

    # Try clicking "Get Started" button
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
