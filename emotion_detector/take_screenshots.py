import asyncio
from playwright.async_api import async_playwright
import threading
from server import app
import time
import requests

def run_server():
    app.run(host="0.0.0.0", port=5000, use_reloader=False)

async def main():
    server_thread = threading.Thread(target=run_server)
    server_thread.daemon = True
    server_thread.start()
    
    # Wait for server to start
    time.sleep(3)
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        # Scenario 1: Normal input
        await page.goto('http://localhost:5000/')
        await page.fill('#textToAnalyze', 'I love this new technology')
        await page.click('button')
        
        # Wait for system response
        await page.wait_for_selector('#system_response')
        await page.wait_for_function('document.getElementById("system_response").innerText.length > 0')
        time.sleep(1) # Extra wait for stability
        await page.screenshot(path='6b_deployment_test.png')
        
        # Scenario 2: Error handling (Blank input)
        await page.fill('#textToAnalyze', '')
        await page.click('button')
        
        # Wait for error message
        await page.wait_for_function('document.getElementById("system_response").innerText.includes("Invalid text")')
        time.sleep(1)
        await page.screenshot(path='7c_error_handling_interface.png')
        
        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
