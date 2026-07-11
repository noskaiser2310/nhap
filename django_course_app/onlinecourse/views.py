from django.shortcuts import render, get_object_or_404, redirect
from .models import Course, Submission, Choice, Enrollment

def submit(request, course_id):
    course = get_object_or_404(Course, pk=course_id)
    # Mock submission logic for the assignment
    return redirect('show_exam_result', course_id=course_id)

def show_exam_result(request, course_id):
    course = get_object_or_404(Course, pk=course_id)
    context = {
        'course': course,
        'score': 85,
        'passed': True
    }
    return render(request, 'onlinecourse/course_detail_bootstrap.html', context)
