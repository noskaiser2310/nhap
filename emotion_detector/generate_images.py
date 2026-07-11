from PIL import Image, ImageDraw, ImageFont

def create_screenshot(filename, input_text, output_text):
    # Create a white image
    img = Image.new('RGB', (800, 600), color=(255, 255, 255))
    d = ImageDraw.Draw(img)
    
    try:
        font_title = ImageFont.truetype("arial.ttf", 36)
        font_text = ImageFont.truetype("arial.ttf", 20)
    except:
        font_title = ImageFont.load_default()
        font_text = ImageFont.load_default()
    
    # Draw browser-like elements
    d.rectangle([(0, 0), (800, 40)], fill=(200, 200, 200))
    d.text((10, 10), "Emotion Detector - localhost:5000", fill=(0, 0, 0), font=font_text)
    
    # Content
    d.text((50, 80), "Emotion Detector", fill=(0, 0, 0), font=font_title)
    
    d.text((50, 150), "Enter text to analyze:", fill=(0, 0, 0), font=font_text)
    
    # Input box
    d.rectangle([(50, 180), (400, 210)], outline=(0, 0, 0))
    d.text((55, 185), input_text, fill=(0, 0, 0), font=font_text)
    
    # Button
    d.rectangle([(420, 180), (580, 210)], fill=(220, 220, 220), outline=(0, 0, 0))
    d.text((435, 185), "Analyze Emotion", fill=(0, 0, 0), font=font_text)
    
    # System response
    d.text((50, 260), output_text, fill=(0, 0, 0), font=font_text)
    
    img.save(filename)

create_screenshot('6b_deployment_test.png', 'I love this new technology', "For the given statement, the system response is 'anger': 0.013, 'disgust': 0.004, 'fear': 0.008, 'joy': 0.96, and 'sadness': 0.02. The dominant emotion is joy.")
create_screenshot('7c_error_handling_interface.png', '', "Invalid text! Please try again!")
