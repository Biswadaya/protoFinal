from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import landscape, A4
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email import encoders

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

def generate_certificate(name, event_name, output_path):
    c = canvas.Canvas(output_path, pagesize=landscape(A4))
    width, height = landscape(A4)

    c.setFont("Helvetica-Bold", 36)
    c.drawCentredString(width / 2, height - 100, "Certificate of Participation")

    c.setFont("Helvetica", 24)
    c.drawCentredString(width / 2, height - 180, f"Presented to {name}")

    c.setFont("Helvetica", 18)
    c.drawCentredString(width / 2, height - 250, f"For participating in {event_name}")

    c.setFont("Helvetica", 14)
    c.drawCentredString(width / 2, 100, "This certificate is generated automatically.")

    c.save()

def send_certificate_to_email(recipient_email, subject, body, attachment_path):
    sender_email = "krishhura72@gmail.com"
    sender_password = "ckan labz idtb jyvc"   # NOTE: use app password, NOT your actual Gmail password

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = subject

    msg.attach(MIMEText(body, 'plain'))

    with open(attachment_path, "rb") as attachment:
        part = MIMEBase('application', 'octet-stream')
        part.set_payload(attachment.read())
        encoders.encode_base64(part)
        part.add_header('Content-Disposition', f'attachment; filename={os.path.basename(attachment_path)}')
        msg.attach(part)

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(sender_email, sender_password)
    server.send_message(msg)
    server.quit()

@app.route('/generate_certificate', methods=['POST'])
def generate_certificate_api():
    data = request.get_json()
    name = data['name']
    event_name = data['event_name']

    output_path = f"certificates/{name.replace(' ', '_')}_certificate.pdf"
    os.makedirs('certificates', exist_ok=True)

    generate_certificate(name, event_name, output_path)

    return send_file(output_path, as_attachment=True)

@app.route('/send_certificate', methods=['POST'])
def send_certificate_api():
    data = request.get_json()
    name = data['name']
    event_name = data['event_name']
    email = data['email']

    output_path = f"certificates/{name.replace(' ', '_')}_certificate.pdf"
    os.makedirs('certificates', exist_ok=True)

    generate_certificate(name, event_name, output_path)

    subject = "Your Participation Certificate"
    body = f"Hi {name},\n\nThank you for participating in {event_name}.\nPlease find your certificate attached.\n\nBest Regards,\nTeam"

    send_certificate_to_email(email, subject, body, output_path)

    return jsonify({"message": "Certificate generated and sent to email successfully."})

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=5002, debug=True)