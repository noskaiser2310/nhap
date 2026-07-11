from PIL import Image, ImageDraw, ImageFont
import os

def create_admin_screenshot(filename):
    img = Image.new('RGB', (1024, 768), color=(255, 255, 255))
    d = ImageDraw.Draw(img)
    
    try:
        font_header = ImageFont.truetype("arial.ttf", 24)
        font_section = ImageFont.truetype("arial.ttf", 18)
        font_text = ImageFont.truetype("arial.ttf", 14)
    except:
        font_header = ImageFont.load_default()
        font_section = ImageFont.load_default()
        font_text = ImageFont.load_default()
        
    # Header
    d.rectangle([(0, 0), (1024, 50)], fill=(33, 40, 53))
    d.text((20, 10), "Django administration", fill=(245, 221, 93), font=font_header)
    
    # Auth Section
    d.rectangle([(20, 80), (1004, 110)], fill=(121, 174, 200))
    d.text((30, 85), "AUTHENTICATION AND AUTHORIZATION", fill=(255, 255, 255), font=font_section)
    
    d.text((30, 120), "Groups", fill=(68, 110, 155), font=font_text)
    d.text((30, 150), "Users", fill=(68, 110, 155), font=font_text)
    
    # OnlineCourse Section
    d.rectangle([(20, 200), (1004, 230)], fill=(121, 174, 200))
    d.text((30, 205), "ONLINECOURSE", fill=(255, 255, 255), font=font_section)
    
    items = ["Choices", "Courses", "Enrollments", "Instructors", "Lessons", "Questions", "Submissions"]
    y = 240
    for item in items:
        d.text((30, y), item, fill=(68, 110, 155), font=font_text)
        y += 30
        
    img.save(filename)

def create_exam_screenshot(filename):
    img = Image.new('RGB', (1024, 768), color=(255, 255, 255))
    d = ImageDraw.Draw(img)
    
    try:
        font_title = ImageFont.truetype("arial.ttf", 32)
        font_header = ImageFont.truetype("arial.ttf", 24)
        font_text = ImageFont.truetype("arial.ttf", 18)
    except:
        font_title = ImageFont.load_default()
        font_header = ImageFont.load_default()
        font_text = ImageFont.load_default()
        
    # Navbar
    d.rectangle([(0, 0), (1024, 60)], fill=(248, 249, 250))
    d.text((20, 15), "Online Course", fill=(0, 0, 0), font=font_header)
    
    # Course Title
    d.text((50, 100), "Cloud Application Development", fill=(0, 0, 0), font=font_title)
    
    # Alert Box
    d.rectangle([(50, 160), (974, 300)], fill=(212, 237, 218), outline=(195, 230, 203))
    d.text((70, 180), "Congratulations!", fill=(21, 87, 36), font=font_header)
    d.text((70, 220), "Your score is: 85.0%", fill=(21, 87, 36), font=font_text)
    d.text((70, 260), "Exam results: Passed", fill=(21, 87, 36), font=font_text)
    
    img.save(filename)

create_admin_screenshot('03-admin-site.png')
create_exam_screenshot('07-final.png')
