from flask import Flask, request, jsonify, render_template
from flask_cors import CORS  
import random
import smtplib
import threading

app = Flask(__name__)
CORS(app)
otp_storage = {}

@app.route('/send_otp', methods=['POST'])
def send_otp():
    if request.method == 'POST':
        email = request.form.get('email')
        
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login('teamemployementportal@gmail.com', 'ujjbqpiwrhjqlbjo')

            subject = 'OTP for EMPLOYMENT PORTAL'
            otp = ''.join([str(random.randint(0, 9)) for _ in range(4)])
            body = f'Hello,\nYour OTP is {otp}.\n\nRegards,\nEMPLOYMENT PORTAL Team'
            msg = f'Subject: {subject}\n\n {body}'
            server.sendmail('teamemployementportal@gmail.com', email, msg)

        otp_storage[email] = otp

        threading.Timer(120, clear_otp, args=(email,)).start()

        return 'OTP sent successfully'
    else:
        return 'Method Not Allowed', 405

def clear_otp(email):
    del otp_storage[email]

@app.route('/verify_otp', methods=['POST'])
def verify_otp():
    if request.method == 'POST':
        entered_otp = request.form.get('otp')
        email = request.form.get('email')

        stored_otp = otp_storage.get(email)

        if stored_otp and entered_otp == stored_otp:
            del otp_storage[email]
            return jsonify({'success': True})
        else:
            return jsonify({'success': False})
    else:
        return 'Method Not Allowed', 405

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/')
def otp_page():
    return render_template('register.html')

if __name__ == "__main__":
    app.run(debug=True)
